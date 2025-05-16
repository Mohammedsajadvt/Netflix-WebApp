import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import {
  originals,
  action,
  comedy,
  trending,
  romance,
  documentaries,
} from "./urls";
function App() {
  return (
    <div>
      <NavBar />
      <Banner />
      <RowPost url={originals} title="Netflix Originals" />
      <RowPost url={action} title="Action" />
      <RowPost url={comedy} title="Comedy Movies" />
      <RowPost url={trending} title="Trending" />
      <RowPost url={romance} title="Romace Movies" />
      <RowPost url={documentaries} title="Documentaries" />
    </div>
  );
}

export default App;
