import React, { useEffect, useState } from "react";
import { imageUrl } from "../../constants/Constants";
import YouTube from "react-youtube";
import Modal from "react-modal";
import "./RowPost.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovies,
  fetchActionMovies,
  fetchComedyMovies,
  fetchDocumentariesMovies,
  fetchHorrorMovies,
  fetchOriginalsMovies,
  fetchRomanceMovies,
  fetchMovieVideo,
  clearMovieVideo,
} from "../../redux/slices/movieSlice";

Modal.setAppElement("#root");

function RowPost({ title, type, isFirstRow }) {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.movies.loading);
  const error = useSelector((state)=>state.movies.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fallback, setFallback] = useState(false);

  const movieList = useSelector((state) => {
    switch (type) {
      case "trending":
        return state.movies.trending;
      case "action":
        return state.movies.action;
      case "comedy":
        return state.movies.comedy;
      case "horror":
        return state.movies.horror;
      case "documentaries":
        return state.movies.documentaries;
      case "originals":
        return state.movies.originals;
      case "romance":
        return state.movies.romance;
      default:
        return [];
    }
  });

  const movieVideo = useSelector((state) => state.movies.movieVideo);

  useEffect(() => {
    switch (type) {
      case "trending":
        dispatch(fetchTrendingMovies());
        break;
      case "action":
        dispatch(fetchActionMovies());
        break;
      case "comedy":
        dispatch(fetchComedyMovies());
        break;
      case "horror":
        dispatch(fetchHorrorMovies());
        break;
      case "documentaries":
        dispatch(fetchDocumentariesMovies());
        break;
      case "originals":
        dispatch(fetchOriginalsMovies());
        break;
      case "romance":
        dispatch(fetchRomanceMovies());
        break;
      default:
        break;
    }
  }, [dispatch, type]);

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
    }, [movieVideo,isModalOpen,loading,error]);

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearMovieVideo());
    setFallback(false);
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={`row ${isFirstRow ? "first-row-overlay" : ""}`}>
      <h3>{title}</h3>
      <div className="posters">
        {movieList &&
          movieList.map((movies) => (
            <div key={movies.id} className="poster-container">
              <img
                onClick={() => handleMovie(movies.id)}
                className="poster"
                src={
                  movies.backdrop_path
                    ? imageUrl + movies.backdrop_path
                    : "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940"
                }
                alt="Poster"
              />
              <div className="poster-title">
                {movies.title || movies.name || movies.original_title}
              </div>
            </div>
          ))}
      </div>

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

export default RowPost;
