import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDRkZWEwNzAyNTc0YTBkNDY3NTRjYTY1MWYxOTEwMCIsIm5iZiI6MTc1MTc5MzA5My4xMjIsInN1YiI6IjY4NmEzZGM1ZmM3ZDg1NmJiNmE5NTk5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i2r0H3pUE_l8GnxkNXlpt5ypdEr1S2X5nJ0Epve2yIE",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        onClick={() => {
          navigate(-2);
        }}
        src={back_arrow_icon}
        alt="back_arrow_icon"
      />
      <iframe
        width="90%"
        height="90%"
        src={`https:www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p> {apiData.published_at.slice(0, 10)} </p>
        <p> {apiData.name} </p>
        <p> {apiData.type} </p>
      </div>
    </div>
  );
};

export default Player;
