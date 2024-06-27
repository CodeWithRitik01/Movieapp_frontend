import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./addForm.module.css";

function AddForm(){


    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [release, setRelease] = useState("");
    const [genre, setGenre] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();


    const submitForm = async(e) =>{
        e.preventDefault();
        const toastId = toast.loading("Adding ...")


        const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            }
          };

      

          const formData = new FormData();
          formData.append("title", title)
          formData.append("description", desc)
          formData.append("release_year", release)
          formData.append("genre", genre)
          formData.append("imgUrl", url)

          

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

          setTitle("");
          setDesc("");
          setGenre("");
          setUrl("");
          setRelease("");
          navigate("/watchlist")
        
    }

   return (
    <div className={styles.Out}>
      
        <div className={styles.formOut}>         
            <form onSubmit={submitForm}>
            <h2>Add Movie</h2>
            <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br />
            <input placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/><br />
            <input placeholder="Release year" value={release} onChange={(e)=>setRelease(e.target.value)}/><br />
            <input placeholder="Genre" value={genre} onChange={(e)=>setGenre(e.target.value)}/><br />
            <input placeholder="Image Url" value={url} onChange={(e)=>setUrl(e.target.value)}/><br />
            
            <button className={styles.submitButton} type="submit">Submit</button>
            
            </form>       
        </div>
    </div>

   )
}

export { AddForm };

