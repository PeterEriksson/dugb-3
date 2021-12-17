import {
  TwitterTimelineEmbed,
  //TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

function Widgets() {
  return (
    <div
      className={`hidden //mdLgTest:inline-flex flex-col pr-5 //mr-3.5  mdLgTest:flex //w-full`}
    >
      <h2 className="mt-3 ml-5 text-2xl font-bold">Senaste</h2>
      <div
        aria-label="widgets__container"
        className=" mt-4 ml-5 p-5 bg-grayish rounded-widgetsBorder sticky top-0    "
      >
        <h3 className="text-lg font-bold //mb-3 ">Har du kört?</h3>
        <p
          className="opacity-0 cursor-default  lg:px-24 px-widgetsPaddingWidthTemp text-xs font-extralight"
          aria-label="TEMP SOLUTION to increase widgets width (documentation for increasing width on TwitterTimelineEmbed??)"
        >
          hejhej
        </p>
        {/* Documentation: https://saurabhnemade.github.io/react-twitter-embed/?path=/story/twitter-timeline-embed--timeline-profile-with-screen-name */}
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="BattleRoyaleCoD"
          options={{
            /* height:400, */
            height: 500,
            /* width: 230, */
          }}
          /* borderColor="#e6ecf0" */
          /* (bottom line is meant, not surrounding border) */
          noHeader
          /* noFooter */
        />

        {/* <TwitterTweetEmbed tweetId={"1356641505889378305"} /> */}
      </div>
    </div>
  );
}

export default Widgets;
