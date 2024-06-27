import {movies} from "../../movieData"
import { MovieCard } from "../MovieCard/MovieCard"
import styles from "./home.module.css"
function Home() {
  console.log(movies)
    return (
      <div className={styles.main}>
        {movies.map((movie) => (
          <MovieCard movie={movie}/>
        ))}
      </div>
    )
  }
  
  export {Home}