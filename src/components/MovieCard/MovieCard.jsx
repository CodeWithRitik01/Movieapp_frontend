import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './movieCard.module.css';
function MovieCard({movie}) {

  const handleClick =async(currentMovie) =>{
    const toastId = toast.loading("Adding ...")
    


    const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };

      

      const formData = new FormData();
      formData.append("title", currentMovie.title)
      formData.append("description", currentMovie.description)
      formData.append("release_year", currentMovie.release_year)
      formData.append("genre", currentMovie.Genre)
      formData.append("imgUrl", currentMovie.poster)


      try{
        const {data} = await axios.post(
            `http://localhost:4000/api/v1/watchlist/addmovie`,
            formData,
            config
        )

        toast.success(data.message, {
            id: toastId,
          });
      }catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
  }
  return (
       
            <div className={styles.Card}>
                <img alt='Not Found' className={styles.cardImg} src={movie.poster}/>
                <h2>{movie.title}</h2>
                <div className={styles.details}>
                  <div>
                    <img alt='Not Found' className={styles.starImg} src='https://cdn-icons-png.flaticon.com/128/1828/1828884.png'/>
                    <span>{movie.rating}</span>
                  </div>
                  
                  <span>{movie.Genre}</span>
                  <img onClick={()=> handleClick(movie)} className={styles.saveButton} src='https://cdn-icons-png.flaticon.com/128/5662/5662990.png'/>

           
                </div>
            </div>
        
    )
  }
  
  export { MovieCard };

