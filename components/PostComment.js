import React from "react";
import Moment from "react-moment";

function PostComment({
  commentText,
  avatar,
  fullName,
  userName,
  timestamp,
  commentId,
  comments,
  i,
}) {
  return (
    <div className="relative flex space-x-2  /bg-red-400" key={i}>
      {/* ONLY render a blue line downwards if someone is answering. */}
      {comments.length !== i + 1 ? (
        <hr
          /*SOME TEMP css for dealing with the blue line(different length for different postComment.length, plus screen-size..)...use cleaner(?)layout next time */
          className={`absolute left-5 top-8 border-r-2 border-blueish/50    h-14    
        ${commentText.length > 20 && commentText.length < 40 && "h-18 xs:h-14"}
        ${
          commentText.length >= 40 &&
          commentText.length < 75 &&
          "xs:h-18 h-20 /h-24"
        } 
        ${commentText.length >= 75 && " xs:h-18 /h-36 h-28 "}   `}
        />
      ) : (
        /* ELSE: last comment should not have a blueish line  */
        <hr className=" " />
      )}
      <img
        className="mt-1 h-7 w-7 rounded-full object-cover "
        src={avatar}
        alt="commentProfileImg"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between /space-x-1 ">
          <div className="flex items-center">
            <p className="mr-1 font-semibold xs:text-base text-sm">
              {fullName}
            </p>
            <p className="text-gray-400 text-sm   hidden xs:inline">
              @{userName}
            </p>
          </div>
          <Moment fromNow className="text-xs text-gray-300 hidden lg:inline">
            {timestamp?.toDate()}
          </Moment>
        </div>
        <p className="text-sm">{commentText}</p>
      </div>
    </div>
  );
}

export default PostComment;
