import React, {useEffect, useState} from "react"
import Movie from "./components/Movie"


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      console.log(data);
      setMovies(data.results);
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      getMovies(SEARCH_API + searchTerm);
    }

    setSearchTerm('');
  }
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <div>
      <header>
        <h1>Movie Review Hub API (React)</h1>
        <form onSubmit={handleSubmit}>
        <input className="search" type="text" placeholder="Search..."
        value={searchTerm}
        onChange={handleChange} />
          
        </form>
      </header>
    <div className="container">
      {movies.length > 0 && movies.map(movie => (
        <Movie key={movie.id} {...movie}/>
      ))}
    </div>
    </div>

  );
}

export default App;

