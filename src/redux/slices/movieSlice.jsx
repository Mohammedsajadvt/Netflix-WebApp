import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";
import { API_KEY } from "../../constants/Constants";
import { endpoints } from "../../constants/urls";

export const fetchTrendingMovie = createAsyncThunk(
  "movies/fetchTrendingMovie",
  async () => {
    const response = await axios.get(endpoints.trending);
    const movies = response.data.results;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }
);

export const fetchMovieVideo = createAsyncThunk(
  "movies/fetchMovieVideo",
  async (movieId) => {
    const response = await axios.get(endpoints.video(movieId));
    return response.data.results[0];
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async () => {
    const response = await axios.get(endpoints.trending);
    const movies = response.data.results;
    return movies;
  }
);

export const fetchActionMovies = createAsyncThunk(
  "movies/fetchActionMovies",
  async () => {
    const response = await axios.get(endpoints.action);
    const movies = response.data.results;
    return movies;
  }
);

export const fetchComedyMovies = createAsyncThunk(
  "movies/fetchComedyMovies",
  async () => {
    const response = await axios.get(endpoints.comedy);
    const movies = response.data.results;
    return movies;
  }
);

export const fetchDocumentariesMovies = createAsyncThunk(
  "movies/fetchDocumentariesMovies",
  async () => {
    const response = await axios.get(endpoints.documentaries);
    const movies = response.data.results;
    return movies;
  }
);

export const fetchHorrorMovies = createAsyncThunk(
  "movies/fetchHorrorMovies",
  async () => {
    const response = await axios.get(endpoints.horror);
    const movies = response.data.results;
    return movies;
  }
);

export const fetchOriginalsMovies = createAsyncThunk(
  "movies/fetchOriginalsMovies",
  async () => {
    const response = await axios.get(endpoints.originals);
    const movies = response.data.results;
    return movies;
  }
);

export const fetchRomanceMovies = createAsyncThunk(
  "movies/fetchRomanceMovies",
  async () => {
    const response = await axios.get(endpoints.romance);
    const movies = response.data.results;
    return movies;
  }
);

const initialState = {
  bannerMovie: null,
  movieVideo: null,
  trending: [],
  action: [],
  comedy: [],
  documentaries: [],
  horror: [],
  originals: [],
  romance: [],
  loading: false,
  error: null,
}

const  movieSlice = createSlice({
name:"movies",
initialState,
reducers:{
     clearMovieVideo:(state)=>{
        state.movieVideo = null;
     }
},
extraReducers:(builder)=>{
    builder.addCase(fetchTrendingMovie.fulfilled,(state,action)=>{
        state.bannerMovie = action.payload;
    })
    .addCase(fetchTrendingMovies.fulfilled,(state,action)=>{
        state.trending = action.payload;
    })
     .addCase(fetchMovieVideo.fulfilled, (state, action) => {
        state.movieVideo = action.payload;
      })
       .addCase(fetchActionMovies.fulfilled, (state, action) => {
        state.action = action.payload;
      })
      .addCase(fetchComedyMovies.fulfilled, (state, action) => {
        state.comedy = action.payload;
      })
      .addCase(fetchDocumentariesMovies.fulfilled, (state, action) => {
        state.documentaries = action.payload;
      })
      .addCase(fetchHorrorMovies.fulfilled, (state, action) => {
        state.horror = action.payload;
      })
      .addCase(fetchOriginalsMovies.fulfilled, (state, action) => {
        state.originals = action.payload;
      })
      .addCase(fetchRomanceMovies.fulfilled, (state, action) => {
        state.romance = action.payload;
      })
      .addMatcher((action)=>action.type.endsWith("/pending"),
    (state)=>{
        state.loading = true;
        state.error = null;
    }
    )
    .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
    
}
});


export const { clearMovieVideo } = movieSlice.actions;
export default movieSlice.reducer;