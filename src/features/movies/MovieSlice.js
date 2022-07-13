import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import MovieApi from '../../common/apis/MovieApi'
import {API_KEY} from '../../common/apis/MovieApiKey'


export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',async(term)=>{
    const response = await MovieApi.get(`?apiKey=${API_KEY}&s=${term}&type=movie`)
    return response.data;

})
export const fetchAsyncShows= createAsyncThunk('movies/fetchAsyncShows',async(term)=>{
    const response = await MovieApi.get(`?apiKey=${API_KEY}&s=${term}&type=series`)
    return response.data;

})

export const fetchAsyncMovieShowDetail= createAsyncThunk('movies/fetchAsyncMovieShowDetail',async(id)=>{
    const response = await MovieApi.get(`?apiKey=${API_KEY}&i=${id}&Plot=full`)
    return response.data;

})
export const setLastSearch = createAsyncThunk('movies/setLastSearch',async(term)=>{
    const lastSearch = term;
    return lastSearch;

})
const lastSearch="Harry";
const initialState = {
    movies:{},
    shows:{},
    selectedMovieOrShow:{},
    lastSearch:"Harry Potter"
}

const movieSlice = createSlice({
    name:'movies',
    initialState,
    reducers:{
        removeSelectedMovieOrShow:(state)=>{
            state.selectedMovieOrShow = {};
        },
        getLastSearch:(state,{payload})=>{
            state.lastSearch = payload
        }

    },
    extraReducers:{
        [fetchAsyncMovies.pending]: ()=>{
            console.log('Pending');
        },
        [fetchAsyncMovies.fulfilled]: (state,{payload})=>{
            console.log('Movies Fetched Succesfully');
            return {...state,movies: payload}
        },
         [fetchAsyncMovies.rejected]: ()=>{
            console.log('Rejected!');
        },
        //series fullfilled
        [fetchAsyncShows.fulfilled]: (state,{payload})=>{
            console.log('Shows Fetched Succesfully');
            return {...state,shows: payload}
        }, 
        [fetchAsyncMovieShowDetail.fulfilled]: (state,{payload})=>{
            console.log('selectedMovieOrShow Fetched Succesfully');
            return {...state,selectedMovieOrShow: payload}
        },
        [setLastSearch.fulfilled]: (state,{payload})=>{
            console.log('Last Search didn\'t changed');
            return {...state,lastSearch: payload}
        },
    }
})

export const {removeSelectedMovieOrShow,getLastSearch} = movieSlice.actions;
export const getAllMovies = (state)=>state.movies.movies;
export const getAllShows = (state)=>state.movies.shows;
export const getSelectedMovieOrShow = (state)=>state.movies.selectedMovieOrShow;
export const getLastSearchList = (state)=>state.movies.lastSearch;
export default movieSlice.reducer;