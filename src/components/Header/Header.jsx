import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux/es/exports';
import './Header.scss';
import user from '../../images/ok.jpg'
import { fetchAsyncMovies, fetchAsyncShows, getLastSearch, setLastSearch } from '../../features/movies/MovieSlice';
const Header = () => {
  const dispatch = useDispatch();
  let lastSearch = useSelector(getLastSearch)
  const [term, setTerm] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    if(term === "") term=lastSearch;
    if(term.length >0 && term.length < 4) return alert("Name must be higher than 4");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    dispatch(setLastSearch(term))
  }
  return (
    <div className='header'>
     
      <div className="logo"> <Link to='/'>Movie App</Link></div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input type="text" value={term} placeholder="Search Movies or Shows" onChange={(e)=>setTerm(e.target.value)}  />
          <button type="submit">/</button>
        </form>
      </div>
      <div className="user-image">
        <img src={ user} alt="" />
      </div>


    </div>
  )
}

export default Header
