import React from "react";
import RowPost from "../../Components/RowPost/RowPost";
import NavBar from "../../Components/NavBar/NavBar";
import Banner from "../../Components/Banner/Banner";
function Home() {
  return (
    <div>
      <NavBar />
      <Banner />
      <RowPost title="Trending Now" type="trending" isFirstRow />
      <RowPost title="Action Movies" type="action" />
      <RowPost title="Comedy Movies" type="comedy" />
      <RowPost title="Horror Movies" type="horror" />
      <RowPost title="Documentaries" type="documentaries" />
      <RowPost title="Originals" type="originals" />
      <RowPost title="Romance Movies" type="romance" />
    </div>
  );
}

export default Home;
