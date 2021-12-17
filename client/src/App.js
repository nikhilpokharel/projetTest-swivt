/** @format */
import Homepage from "./components/home";
import SearchBox from "./components/search";
import SearchResult from "./components/searchResult";
import Details from "./components/details";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className='container'>
      <Link className='btn-link text-center d-block' to='/'>
        Back to home
      </Link>
      <SearchBox />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/search/:id' element={<SearchResult />} />
        <Route path='/repo/details/:id' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
