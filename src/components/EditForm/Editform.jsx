import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions, editDetailAsync, watchlistSelector } from "../../redux/reducers/watchlistReducer";
import styles from "./editForm.module.css";

function EditForm(){

   const {  title,
    description,
    year,
    genre,
    imageUrl,
    ID} = useSelector(watchlistSelector);
   const dispatch = useDispatch();
   const navigate = useNavigate();

    const submitForm = async(e) =>{
        e.preventDefault();
        dispatch(editDetailAsync({title, description, year, genre, imageUrl, ID}));
        dispatch(actions.setTitle(""));
        dispatch(actions.setDescription(""));
        dispatch(actions.setYear(""));
        dispatch(actions.setGenre(""));
        dispatch(actions.setUrl(""));
        dispatch(actions.setId(""))
        navigate("/watchlist");
    }

   return (
    <div className={styles.Out}>
        <div className={styles.formOut}>
            <form onSubmit={submitForm}>
            <h2>Edit Movie Details</h2>
            <input placeholder="Title" value={title} onChange={(e)=>dispatch(actions.setTitle(e.target.value))}/><br />
            <input placeholder="Description" value={description} onChange={(e)=>dispatch(actions.setDescription(e.target.value))}/><br />
            <input placeholder="Release year" value={year} onChange={(e)=>dispatch(actions.setYear(e.target.value))}/><br />
            <input placeholder="Genre" value={genre} onChange={(e)=>dispatch(actions.setGenre(e.target.value))}/><br />
            <input placeholder="Image Url" value={imageUrl} onChange={(e)=>dispatch(actions.setUrl(e.target.value))}/><br />
            
            <button className={styles.submitButton} type="submit">Submit</button>
            
            </form>       
        </div>
    </div>

   )
}

export { EditForm };
