import logo from './logo.svg';
import './App.css';
import { GiphySearch } from './Components/GiphySearch';
import {Loading} from "./Components/Loading"

function App() {
  return (
    <div className="App">
      <GiphySearch></GiphySearch>
      {/* <Loading></Loading> */}
    </div>
  );
}


export default App;
