import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { actions, deleteMovieAsync, getInitialStateAsync, rateMovieAsync, watchlistSelector } from '../../redux/reducers/watchlistReducer';
import styles from "./watchlist.module.css";
function WatchList() {
  const {watchlist} = useSelector(watchlistSelector);
  const dispatch = useDispatch();   
  const navigate = useNavigate();
  const [showRate, setShowRate] = useState(false);
  const [id, setId] = useState("");
  const [rating, setRating] = useState("");


  useEffect(() =>{
    dispatch(getInitialStateAsync());
  },[])

  const handleClick=(id) =>{
    const userConfirmed = window.confirm("Are you sure you want to delete this move from watchlist?");
    if(userConfirmed){
      dispatch(deleteMovieAsync(id));

    }
  }

  const handleEdit =(movie) =>{
     dispatch(actions.setTitle(movie.title));
     dispatch(actions.setDescription(movie.description));
     dispatch(actions.setYear(movie.release_year));
     dispatch(actions.setGenre(movie.genre));
     dispatch(actions.setUrl(movie.imgUrl));
     dispatch(actions.setId(movie._id))
     navigate("/edit");

  }

  const handleRateButton =(movieId) =>{
     setShowRate(!showRate);
     setId(movieId)
  }


  const handleRateSubmit = (e) =>{
    e.preventDefault();
    dispatch(rateMovieAsync({id, rating}));
    setId("");
    setRating("");
  }
  return (
      <div className={styles.main}>
        {watchlist.length === 0 ?
        <h1>Watchlist is empty</h1>
        :
        <h1>Watchlist</h1>
        }

        {showRate ?
                <div className={styles.rateMovie}>
                <form onSubmit={handleRateSubmit}>
                <h3>Rate b/w 1 to 5</h3>
                <input placeholder="rate movie" value={rating} onChange={(e)=>setRating(e.target.value)}/>
                <button type="submit">Submit</button>
                </form>
              
              </div>
      :
       null}


        
        {watchlist.map((movie) => (
                      <div className={styles.Card}>
                        <div className={styles.nameLogo}>
                          <img alt='Not Found' className={styles.cardImg} src={movie.imgUrl}/>
                          <div className={styles.titleDesc}>
                            <h1>{movie.title}</h1>
                            <p>{movie.description}</p>
                          </div>
                          <img alt='Not Found' className={styles.editButton} onClick={()=>handleEdit(movie)} src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"/>

                        </div>
                      
                      <div className={styles.details}>
                        <div>
                          <span>Released in : {movie.release_year}</span>
                        </div>
                        
                        <span>{movie.genre}</span>
                        <button onClick={()=>handleRateButton(movie._id)}>rate movie</button>
                        <img alt='Not Found' onClick={()=>handleClick(movie._id)} className={styles.saveButton} src='https://cdn-icons-png.flaticon.com/128/102/102279.png'/>

                     </div>


                  </div>

                 
        ))}
      </div>
    )
  }
  
  export { WatchList };
