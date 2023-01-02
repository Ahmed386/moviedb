import React, { Fragment, useEffect , useState } from 'react'
import axios from 'axios';
import home from '../Home/Home.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Movies() {


    const [allMovies, setallMovies] = useState(null)

    async function getTrendingMovies() {
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=77cbb62c38149cca587a604894cb9193')
      setallMovies(data.results)   
    }
    async function search(e) {
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=77cbb62c38149cca587a604894cb9193&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
      setallMovies(data.results)   
      console.log(data.results);
       
    }
   

    useEffect(function(){
      getTrendingMovies();
      

    } , [])

  
  return <>

    <input onChange={search} className="form-control mt-3 bg-dark border-0 text-white w-50 m-auto" type="search" placeholder="Search" aria-label="Search" />


    {allMovies != null?<div className="container p-3">
    <Helmet>

      <title>Trending Movies </title>


    </Helmet>

      <div className="row align-items-center ">
        <div className="col-md-4">
          <div className={home.title}>
            <h3>
              Trending Movies 

            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        {allMovies.map((movie , idx)=> <Fragment key={idx}>
            {movie.poster_path?<div  className="col-md-2 ">
            <Link to={`/moviedetails/${movie.id}`}>

            <div className="movie text-center">
                <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='w-100' alt="" />
                <h6>{movie.title}</h6>
            </div>
            </Link> 

            </div>:''}
            </Fragment>)}
      </div>
      

    </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
    </div>}

    
    


  
  
  
  
  </>
}
