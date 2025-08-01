import {
  TwitterTimelineEmbed,
  //TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

function Widgets() {
  return (
    <div className={`hidden pr-5 mdLgTest:flex flex-col`}>
      <h2 className="mt-3 ml-5 text-2xl font-bold">Latest</h2>
      <div
        aria-label="widgets__container"
        className=" mt-4 ml-5 p-5 bg-grayish rounded-widgetsBorder sticky top-0  min-w-widgetsMinWidth  "
      >
        <h3 className="text-lg font-bold pb-1.5 pl-1 ">News</h3>

        {/* documentation for increasing width on TwitterTimelineEmbed?? */}

        {/* Documentation: https://saurabhnemade.github.io/react-twitter-embed/?path=/story/twitter-timeline-embed--timeline-profile-with-screen-name */}

        {/* <TwitterTimelineEmbed
          sourceType="profile"
          screenName="warzone2hub"
          //screenName="charlieINTEL"
          options={{
            height: 530,
            width: 230,
          }}
          noHeader
        /> */}
        <TwitterTweetEmbed
          placeholder="loading.."
          tweetId={"1356641505889378305"}
        />
      </div>
    </div>
  );
}

export default Widgets;
