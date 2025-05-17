import React, { useEffect, useState } from "react";
import "./Banner.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { imageUrl } from "../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovie,
  fetchMovieVideo,
  clearMovieVideo,
} from "../../redux/slices/movieSlice";

Modal.setAppElement("#root");

function Banner() {
  const dispatch = useDispatch();
  const bannerMovie = useSelector((state) => state.movies.bannerMovie);
  const movieVideo = useSelector((state) => state.movies.movieVideo);
  const loading = useSelector((state)=>state.movies.loading);
  const error = useSelector((state)=>state.movies.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fallback, setFallback] = useState(false);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    dispatch(fetchTrendingMovie());
  }, [dispatch]);
  const handleMovie = (id) => {
    dispatch(fetchMovieVideo(id));
    setIsModalOpen(true);
    setFallback(false);
  };
   useEffect(() => {
    if (isModalOpen && !loading) {
      if (!movieVideo && error) {
        setFallback(true); 
      }
    }
  }, [movieVideo, isModalOpen,loading,error]);
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearMovieVideo());
    setFallback(false);
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${
          bannerMovie ? imageUrl + bannerMovie.backdrop_path : ""
        })`,
      }}
    >
      <div className="content">
        <h1 className="title">
          {bannerMovie ? bannerMovie.title || bannerMovie.name : ""}
        </h1>
        <div className="banner_buttons">
          {
            <button
              className="button"
              onClick={() => handleMovie(bannerMovie.id)}
            >
              Play
            </button>
          }
          <button className="button">My list</button>
        </div>
        <h1 className="description">
          {bannerMovie ? bannerMovie.overview : ""}
        </h1>
      </div>
      <div className="fade_bottom"></div>
       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Trailer"
        className="video-modal"
        overlayClassName="video-modal-overlay"
      >
        <button className="close-button" onClick={closeModal}>
          X
        </button>

        {fallback ? (
          <YouTube videoId="GV3HUDMQ-F8" opts={opts} />
        ) : movieVideo ? (
          <YouTube videoId={movieVideo.key} opts={opts} />
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
}

export default Banner;
