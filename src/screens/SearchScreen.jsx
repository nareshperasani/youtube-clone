import React from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoHorizontal from '../components/videoHorizontal/VideoHorizontal';
import { getVideoBySearch } from '../redux/actions/videos.action';

function SearchScreen() {

    const {query} = useParams();
    console.log(query);

    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(getVideoBySearch(query))
    },[query, dispatch])

    const {videos, loading} = useSelector(state=>state.searchVideos);
    return (
        <Container>
            {!loading ? (
                videos?.map(video=><VideoHorizontal video={video} key={video.id.videoId} searchScreen />)
            ): <h1>loading......</h1>
        }
        </Container>
    )
}

export default SearchScreen;
