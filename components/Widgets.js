import {
  TwitterTimelineEmbed,
  //TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

function Widgets() {
  return (
    <div className={`hidden mdLgTest:inline-flex flex-col pr-5`}>
      <h2 className="mt-3 ml-5 text-2xl font-bold">Senaste</h2>
      <div
        aria-label="widgets__container"
        className=" mt-4 ml-5 p-5 bg-grayish rounded-widgetsBorder sticky top-0"
      >
        <h3 className="text-lg font-bold mb-3">Har du kört?</h3>

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="BattleRoyaleCoD"
          options={{ height: 400 }}
        />
        <TwitterTweetEmbed tweetId={"1356641505889378305"} />
      </div>
    </div>
  );
}

export default Widgets;
