import { useState, useEffect, useCallback } from 'react';
import LazyLoad from 'react-lazyload';
import Home from "../../components/Home/Home.jsx";
import './Dashboard.css';
import Footer from '../../components/Footer/Footer.jsx';
import { action, thriller, horror, drama } from "../../assets/assets/assets.js";


// Debounce function to limit how often a function can be called
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const allMovies = [...action, ...thriller, ...horror, ...drama];

  useEffect(() => {
    const results = allMovies.filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredMovies(results);
  }, [searchTerm, selectedCategory]); // Removed allMovies from dependencies

  const handleSearch = useCallback(debounce((term) => {
    setSearchTerm(term);
  }, 300), []); // Using useCallback to memoize the debounce function

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <>
      <Home onThemeToggle={toggleTheme} isActive={isDarkTheme} />
      
      <div className={`main-container ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className="homepage-title">
          <h3>Top Movies Recommendation</h3>
          <p className='suggestion'>Top Movies Suggestion</p>
          <input
            type="text"
            className="search-movies"
            placeholder="Search for movies..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        <main>
          <div className="image-container">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="movie-card">
                <LazyLoad height={200} offset={100}>
                  <img src={movie.img} alt={movie.name} />
                </LazyLoad>
                <p className='title'>{movie.name}</p>
                <p className='hero'>{movie.hero}</p>
                <p className='year'>{movie.year}</p>
                <p className='info'>More Info</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
