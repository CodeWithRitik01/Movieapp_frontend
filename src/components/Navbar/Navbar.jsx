import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { actions, watchlistSelector } from "../../redux/reducers/watchlistReducer";
import styles from "./navbar.module.css";
function Navbar() {
  const dispatch = useDispatch();
  const {toggleAdd, toggleWatchlist} = useSelector(watchlistSelector);

  const setToggles =()=>{
    if(toggleAdd === true){
      dispatch(actions.toggleAddButton(false));
    }
    if(toggleWatchlist === true){
      dispatch(actions.setToggleWatchList(false));
    }
  }
    return (
      <div>
        <div className={styles.navtop}>

          <div className={styles.LogoName}>
            <NavLink>
              <div className={styles.LogoName} onClick={()=>setToggles()}>
              <img alt='Not Found' className={styles.iconImg} src="https://cdn-icons-png.flaticon.com/128/2699/2699194.png" />
              <h1>MovieApp</h1>
              </div>
            </NavLink>
          </div>

          {toggleWatchlist===false ?
          <NavLink to="watchlist">
              <button  className={styles.watchList} onClick={()=>dispatch(actions.setToggleWatchList(true))}>Watchlist</button>
          </NavLink>
          :
              <NavLink>
                <img alt='Not Found' className={styles.backButton} onClick={()=>dispatch(actions.setToggleWatchList(false))} src="https://cdn-icons-png.flaticon.com/128/318/318477.png"/>
              </NavLink>
          }

           {toggleAdd===false ?
              <NavLink to="addmovie">
              <button 
                  className={styles.addMovieButton}
                  onClick={()=>dispatch(actions.toggleAddButton(true))}
              >Add Movie</button>
              </NavLink>
          :
              <NavLink>
                <img alt='Not Found' className={styles.backButton} onClick={()=>dispatch(actions.toggleAddButton(false))} src="https://cdn-icons-png.flaticon.com/128/318/318477.png"/>
              </NavLink>
          }


        </div>
        <Outlet />
      </div>

    )
  }
  
  export { Navbar };
