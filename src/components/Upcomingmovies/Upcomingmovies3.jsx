

import React, { useEffect , useState } from 'react'
import axios from 'axios';
import home from '../Home/Home.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Upcomingmovies3() {


    const [allMovies, setallMovies] = useState(null)

    async function getTrendingMovies() {
      let {data} = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=77cbb62c38149cca587a604894cb9193&language=en-US&page=3')
      setallMovies(data.results)   
    }
   

    useEffect(function(){
      getTrendingMovies();
      

    } , [])

  
  return <>

    {allMovies != null?<div className="container p-3">


    <Helmet>

      <title>Upcoming Movies </title>


    </Helmet>

      <div className="row align-items-center ">
        <div className="col-md-4">
          <div className={home.title}>
            <h3>
              Upcoming Movies 

            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        {allMovies.map((movie , idx)=> <div key={idx} className="col-md-2 ">
        <Link to={`/moviedetails/${movie.id}`}>

          <div className="movie text-center">
            <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='w-100' alt="" />
            <h6>{movie.title}</h6>
          </div>
        </Link> 

        </div>)}
      </div>
      

    </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
    </div>}



    <div className=' p-3 justify-content-center  d-flex '>
        <div className='justify-content-center  d-flex pagi border border-1 '>
            <Link className="nav-link item px-2  active mx-3 my-2" aria-current="page" to="/Upcommov">1</Link>
            <Link className="nav-link item px-2 active mx-3 my-2" aria-current="page" to="/Upcommov2">2</Link>
            <Link className="nav-link text-warning px-2 active mx-3 my-2" aria-current="page" to="/Upcommov3">3</Link>
        </div>
    </div>

    
    


  
  
  
  
  </>
}


