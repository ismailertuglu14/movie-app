import React, { useEffect } from 'react'
import MovieListing from '../MoveListing/MoveListing'
//redux 
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchAsyncMovies,fetchAsyncShows,  getLastSearchList } from '../../features/movies/MovieSlice'
const Home = () => {
  
  const dispatch = useDispatch();
  const lastSearch = useSelector(getLastSearchList);
  console.log("last seach is : ",lastSearch);
  useEffect(()=>{
    
    dispatch(fetchAsyncMovies(lastSearch));
    dispatch(fetchAsyncShows(lastSearch));
  },[dispatch])
  return (
    <div>
      <div className='banner-img'>
        <MovieListing/>
      </div>
    </div>
  )
}

export default Home
