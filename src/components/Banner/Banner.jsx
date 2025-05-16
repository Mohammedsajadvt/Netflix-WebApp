import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { API_KEY, imageUrl } from "../../constants/Constants";

Modal.setAppElement("#root");
function Banner() {
  const [movie, setMovie] = useState();
const [urlId, setUrlId] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
 const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const movies = response.data.results;
        if (movies && movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          setMovie(movies[randomIndex]);
        }
      })
      .catch((error) => {
         alert("Error fetching data:", error);
      });
  }, []);
    const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
                  setIsModalOpen(true);
        } else {
          alert('No video available');
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
   const closeModal = () => {
    setIsModalOpen(false);
    setUrlId('');
  };
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title || movie.name : ""}</h1>
        <div className="banner_buttons">
          {
            <button className="button" onClick={()=>handleMovie(movie.id)}>Play</button>
          }
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
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
        {urlId && <YouTube videoId={urlId.key} opts={opts} />}
      </Modal>{" "}
    </div>
  );
}

export default Banner;
