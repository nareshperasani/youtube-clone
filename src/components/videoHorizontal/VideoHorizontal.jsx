import React, { useEffect, useState } from "react";
import "./VideoHorizontal.scss";
import numeral from "numeral";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api";
import { useHistory } from "react-router-dom";

function VideoHorizontal({video}) {

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);


  const {id, snippet:{
    channelId, channelTitle, description, title, publishedAt, thumbnails:{medium}
  }} = video

  useEffect(() => {

    const get_video_details = async() => {
        const {data:{items},} = await request('/videos', {
            params: {
                part: 'contentDetails,statistics',
                id:id.videoId,
            },
        })
        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount)
    }
    get_video_details();
},[id]);

useEffect(() => {

    const get_channel_icon = async() => {
        const {data:{items}} = await request('/channels', {
            params: {
                part: 'snippet',
                id:channelId,
            },
        })
        setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_icon();
},[channelId])

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useHistory();

  const handleClick = () => {
    history.push(`/watch/${id.videoId}`)
  }

  return (
    <Row className="VideoHorizontal m-1 py-2 align-items-center" onClick={handleClick}>
      <Col xs={6} md={6} className="VideoHorizontal_left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="VideoHorizontal_thumbnail"
          wrapperClassName="VideoHorizontal_thumbnail_wrapper"
        />
        <span className="VideoHorizontal_duration">{_duration}</span>
      </Col>
      <Col xs={6} md={6} className="VideoHorizontal_right p-0">
        <p className="VideoHorizontal_title mb-1">
          {title}
        </p>
        <div className="VideoHorizontal_channel d-flex align-items-center my-1">
        {/* <LazyLoadImage
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          effect="blur"
        /> */}
        <p>{channelTitle}</p>
        </div>
        <div className="VideoHorizontal_details">
          {numeral(views).format("0.a")} views • {moment(publishedAt).fromNow()}
        </div>
      </Col>
    </Row>
  );
}

export default VideoHorizontal;
