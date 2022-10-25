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
    <>
      <div className="flex space-x-2" key={i}>
        <div className="flex flex-col items-center   ">
          <img
            className=" h-7 w-7 rounded-full object-cover    "
            src={avatar}
            alt="commentProfileImg"
          />

          <hr
            className={`${
              i + 1 == comments.length && "hidden"
            }    h-full w-0.5 bg-blueish/50 `}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between /space-x-1 ">
            <div className="flex items-center">
              <p className="mr-1 font-semibold xs:text-base text-sm">
                {fullName}
              </p>
              <p className="text-gray-400 text-sm hidden xs:inline">
                @{userName}
              </p>
            </div>
            <Moment fromNow className="text-xs text-gray-300 hidden lg:inline">
              {timestamp?.toDate()}
            </Moment>
          </div>
          <p className="text-sm       ">{commentText}</p>
        </div>
      </div>

      <hr
        className={` ${
          i + 1 == comments.length && "hidden"
        }   h-4.5  w-0.5 border-t border-red-300/ border-blueish/10  bg-blueish/50 ml-3.25`}
      />
    </>
  );
}

export default PostComment;
