import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../constants/Constants";
import YouTube from "react-youtube";
import Modal from "react-modal";
import "./RowPost.css";

Modal.setAppElement("#root");

function RowPost(props) {
  const [movie, setMovie] = useState([]);
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
      .get(props.url)
      .then((response) => {
        console.log(response.data.results);
        setMovie(response.data.results);
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
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movie.map((movies) => (
          <img
            onClick={() => handleMovie(movies.id)}
            key={movies.id}
            className= "poster"
            src={imageUrl + movies.poster_path} 
            alt="Poster"
          />
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
        {urlId && <YouTube videoId={urlId.key} opts={opts} />}
      </Modal>{" "}
    </div>
  );
}

export default RowPost;
