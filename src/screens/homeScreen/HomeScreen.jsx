import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import "./HomeScreen.scss";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideoByCategory,
} from "../../redux/actions/videos.action";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../../components/skeletons/SkeletonVideo";

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );
  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopularVideos());
    else {
      dispatch(getVideoByCategory(activeCategory));
    }
  };
  return (
    <>
      <CategoriesBar />
      <Container className="homeScreen">
        <hr />
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          Loader={<div className="spinner-border text-danger"></div>}
          className="row"
        >
          {!loading
            ? videos.map((video) => (
                <Col lg={3} md={4}>
                  <Video video={video} key={video.id} />
                </Col>
              ))
            : [...Array(20)].map(() => (
                <Col lg={3} md={4}>
                  <SkeletonVideo/>
                </Col>
              ))}
        </InfiniteScroll>
      </Container>
    </>
  );
}

export default HomeScreen;
