import React, { useEffect } from 'react';
import {Col, Row} from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/Comments';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { getRelatedVideos, getVideoById } from '../../redux/actions/videos.action';
import './WatchScreen.scss';

function WatchScreen() {

    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(() => {
        dispatch(getVideoById(id))

        dispatch(getRelatedVideos(id))
    },[id, dispatch])

    const {videos, loading: relatedVideosLoading} = useSelector(state=>state.relatedVideos);

    const {video, loading} = useSelector(state=>state.selectedVideo)
    return (
        <Row>
            <Col xsOffset={7}>
                <div className="watchScreen_player">
                    <iframe src={`https://www.youtube.com/embed/${id}`} frameBorder="0" title={video?.snippet?.title} allowFullScreen width="100%" height="100%"></iframe>
                </div>
                {
                    !loading ? <VideoMetaData video={video} videoId={id} />: <h6>Loading...</h6>
                }
                <Comments videoId={id} totalComments={video?.statistics?.commentCount} />
            </Col>
            <Col xs={5}>
                {
                    !loading ? videos?.filter(video=>video.snippet).map((video)=>(<VideoHorizontal video={video} key={video.id.videoId} />)):
                    <SkeletonTheme color="#d1c8c8" highlightColor="#d1c8c8">
                        <Skeleton width="100%" height="130px" count={15} />
                    </SkeletonTheme>
                }
            </Col>
        </Row>   
    )
}

export default WatchScreen
