import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { API_KEY, TMBD_BASE_URL } from "../utils/constants";

/*createAsyncThunk will generate three Redux action creators 
using createAction : pending , fulfilled , and rejected . 
Each lifecycle action creator will be attached to the returned 
thunk action creator so that your reducer logic can reference the 
action types and respond to the actions when dispatched */
//axios=> used to It allows you to fetch data and make HTTP requests. 

//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, 
//typically defined together in a single file. The name comes from splitting up the root Redux state 
//object into multiple "slices" of state.

//A normal Redux application has a JS object at the top of its state tree. 
//We refer to one key/value section of that object as a “slice”.

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};


//fetch {genres} from api call using async and axios
export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a19376533b9b5fa9f69db2d48edf2b46"
        // `${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    // console.log(data);
    // console.log(genres);
    return genres; //now genres are fetched and stored in our genres[] array inside initialStates 
})

//iterate on rowData stored in moviesArray==>and pick only required content from it 
//and store in new movies[] array
const createArrayFromRowData = (array, moviesArray, genres) => {
    // console.log(array);
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name); //here according to genres find the id and from id find the name of movie and push name into array
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
                description: movie ? movie.overview : "", //********** */
            });
        }
    });
}

//to store all movies in array
const getRowData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const { data: { results } } = await axios.get(
            `${api}${paging ? `&page=${i}` : ""}`,
        );
        createArrayFromRowData(results, moviesArray, genres)
    }
    return moviesArray;
    // console.log({moviesArray});
};

//fetching all trending by week movies according 
export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
    const { netflix: { genres }, } = thunkApi.getState();
    return getRowData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
    // console.log(data);
})

//function to fetch data  by genres
export const fetchDataByGenre = createAsyncThunk("netflix/moviesByGenres", async ({ genre, type }, thunkApi) => {
    // console.log("in fetch data",genre,type);
    const { netflix: { genres }, } = thunkApi.getState();
    const data = getRowData(
        // `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, 
        `https://api.themoviedb.org/3/discover/${type}?api_key=a19376533b9b5fa9f69db2d48edf2b46&with_genres=${genre}`,
        genres
        ); //dont pass tru as pagination not required
    // console.log(data);
    return data;
})

//for backend api call using axios ==> to get liked movies from db
export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async (email) => {
    const {data: {movies},} = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
});

//for backend api call using axios ==> to get liked movies from db after delete
export const removeFromLikedMovies = createAsyncThunk("netflix/deleteLiked", async ({movieId, email}) => {
    const {data: {movies},} = await axios.put(`http://localhost:5000/api/user/delete`,{ email, movieId});
    return movies;
});

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload; //now got the movies from rowData and stored into redux store
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload; //now got the movies from rowData and stored into redux store
        });
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload; //now got the movies from rowData and stored into redux store
        });
        builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload; //now got the movies from rowData and stored into redux store
        });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});


export const { setGenres, setMovies } = NetflixSlice.actions;