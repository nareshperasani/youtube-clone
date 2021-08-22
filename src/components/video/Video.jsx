import React, {useState, useEffect} from 'react';
import "./Video.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import request from '../../api';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

function Video({video}) {

    const {id, snippet:{channelId, channelTitle, title, publishedAt, thumbnails:{medium},},contentDetails,} = video;

    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);

    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format('mm:ss');

    const _videoId = id?.videoId || contentDetails?.videoId || id;

    const history = useHistory();

    useEffect(() => {

        const get_video_details = async() => {
            const {data:{items},} = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id:_videoId,
                },
            })
            setDuration(items[0].contentDetails.duration);
            setViews(items[0].statistics.viewCount)
        }
        get_video_details();
    },[_videoId]);

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

    const handleVideoClick = ()=> {
        history.push(`/watch/${_videoId}`)
    }
    return (
        <div className="video" onClick={handleVideoClick}>
           <div className="video_top">
           <LazyLoadImage
            src={medium.url}
            effect="blur" />
        <span className="video_top_duration">{_duration}</span>
           </div>
           <div className="video">
           <LazyLoadImage
            src={channelIcon?.url}
            effect="blur" />
           {/* <img src={channelIcon?.url} alt="" /> */}
           <div className="video_title">
           {title}
           </div>
           </div>
           <div className="video_channel">
               <p>{channelTitle}</p>
           </div>
           <div className="video_details">
               <span>
                   {numeral(views).format("0.a")} views
               </span>
               <span>•</span>
               <span>{moment(publishedAt).fromNow()}</span>
           </div>
        </div>
    )
}

export default Video
