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
      {/* Only render a blue line downwards if someone is answering. i.e the last comment should not have a line */}
      {comments.length !== i + 1 ? (
        <hr
          className={`absolute left-5   top-8 ${
            commentText.length > 75 ? " h-18" : "h-14"
          }  border-r-2 border-blueish/50 `}
        />
      ) : (
        <hr className="  /opacity-0" />
      )}
      {/* <hr className="absolute left-5 top-10 h-8 border-x border-blueish" /> */}
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
            <p className="text-gray-400 text-sm">@{userName}</p>
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
