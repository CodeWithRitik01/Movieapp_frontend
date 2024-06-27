import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const INITIALSTATE = {
   watchlist:[],
   toggleAdd:false,
   toggleWatchlist:false,
   title:"",
   description:"",
   year:"",
   genre:"",
   imageUrl:"",
   ID:"",
}

//asyncThunk for getting all watchlist on every rendering
export const getInitialStateAsync = createAsyncThunk("api/movie",
    () => {
        const data = axios.get(`${server}/api/v1/watchlist/get`)
        return data;
    }
)

//asyncThunk for editing details of movie
export const editDetailAsync = createAsyncThunk("api/editmovie",async (payload) =>{
   const {title, description, year, genre, imageUrl, ID} = payload;
   const response = await fetch(`${server}/api/v1/watchlist/edit/${ID}`, {
       method:'PUT',
       body:JSON.stringify({
        title, 
        description, 
        release_year:year, 
        genre, 
        imgUrl:imageUrl
       }),
       headers:{
        'content-type':'application/json'
       }
   })
   return response.json();
}
)


//asyncthunk to rate the movie
export const rateMovieAsync = createAsyncThunk("api/rateMovie",async (payload) =>{
    const {id, rating} = payload;
    const response = await fetch(`${server}/api/v1/watchlist/rate/${id}`, {
        method:'PUT',
        body:JSON.stringify({
           rating
        }),
        headers:{
         'content-type':'application/json'
        }
    })
    return response.json();
 }
 )


//async thunk to delete the movie from watchlist
export const deleteMovieAsync = createAsyncThunk("movie/delete", async(payload) => {
     const response = await fetch(`${server}/api/v1/watchlist/${payload}`,{
        method:"DELETE",
     })
     return payload;
})

const watchlistSlice = createSlice({
    name:"movieapp",
    initialState:INITIALSTATE,
    reducers:{
        toggleAddButton:(state, action) =>{
            state.toggleAdd = action.payload;
        },
        setToggleWatchList:(state, action) =>{
            state.toggleWatchlist = action.payload;
        },
        setTitle:(state, action) =>{
            state.title = action.payload;
        },
        setDescription:(state, action) =>{
            state.description = action.payload;
        },        
        setGenre:(state, action) =>{
            state.genre = action.payload;
        },        
        setYear:(state, action) =>{
            state.year = action.payload;
        },
        setUrl:(state, action) =>{
            state.imageUrl = action.payload;
        },
        setId:(state, action) =>{
            state.ID = action.payload;
        },
    },

    extraReducers:(builder)=>{
        builder.addCase(getInitialStateAsync.fulfilled,(state, action)=>{
            state.watchlist = [...action.payload.data,]
        })

        builder.addCase(deleteMovieAsync.fulfilled,(state, action) =>{
            state.watchlist = state.watchlist.filter((mov, key) =>
              mov._id !== action.payload
            )

        })

        builder.addCase(editDetailAsync.fulfilled, (state, action) =>{
            const {title, description, year, genre, imageUrl, ID} = action.payload;
            state.watchlist = state.watchlist.map((movie) => (
                movie._id ===ID ? {
                    title, 
                    description, 
                    release_year:year, 
                    genre, 
                    imgUrl:imageUrl
                }: movie
            ))
        })

        builder.addCase(rateMovieAsync.fulfilled, (state, action) =>{
            const {rating, ID} = action.payload;
            state.watchlist = state.watchlist.map((movie) => (
                movie._id ===ID ? {
                  ...movie,
                  rating
                }: movie
            ))
        })
    }
})



export const watchlistReducer = watchlistSlice.reducer;
export const actions = watchlistSlice.actions;

export const watchlistSelector = (state)=>state.watchlistReducer;