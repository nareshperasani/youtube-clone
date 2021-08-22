import { ThumbDownAlt, ThumbUpAlt } from "@material-ui/icons";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import "./VideoMetaData.scss";

function VideoMetaData({ video: { snippet, statistics }, videoId }) {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;
  const dispatch = useDispatch();

  const {
    snippet: channelSnippet,
    statistics: channelStatistics,
   } =
    useSelector((state) => state.channelDetails.channel);

    const subscriptionStatus =  useSelector(state=> state.channelDetails.subscriptionStatus)

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);
  return (
    <div className="VideoMetaData">
      <div className="VideoMetaData_top">
        <h5 className="VideoMetaData_title">{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span className="VideoMetaData_views">
            {numeral(viewCount).format("0.a")} views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className="mr-3 icon">
              <ThumbUpAlt size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <ThumbDownAlt size={26} />
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
        <div className="VideoMetaData_channel d-flex justify-content-between align-items-center my-2 py-3">
          <div className="d-flex">
            <img
              className="rounded-circle mr-3"
              src={channelSnippet?.thumbnails?.default?.url}
              alt=""
            />
            <div className="d-flex channel-name flex-column">
              <span className="span-title">{channelTitle}</span>
              <span className="span-color">
                {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
                <span className="span-text">subscribers</span>
              </span>
            </div>
          </div>
          <button className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus?'Subscribed': 'Subscribe'}</button>
        </div>
        <div className="VideoMetaData_description">
          <ShowMoreText
            lines={3}
            more="SHOW MORE"
            less="SHOW LESS"
            anchorClass="showMoreText"
            expanded={false}
          >
            {description}
          </ShowMoreText>
        </div>
      </div>
    </div>
  );
}

export default VideoMetaData;
