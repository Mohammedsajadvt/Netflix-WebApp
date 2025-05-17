import NavBar from "./components/NavBar/NavBar";
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";
import "./App.css";
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
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title="Netflix Originals"  isFirstRow={true}/>
      <RowPost url={action} title="Action" />
      <RowPost url={comedy} title="Comedy Movies" />
      <RowPost url={trending} title="Trending" />
      <RowPost url={romance} title="Romace Movies" />
      <RowPost url={documentaries} title="Documentaries" />
    </div>
  );
}

export default App;
