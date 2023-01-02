import React, { useEffect , useState } from 'react'
import axios from 'axios';
import home from './Home.module.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Home() {


    const [allMovies, setallMovies] = useState(null)
    const [allTv, setallTv] = useState(null)

    async function getTrendingMovies() {
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=77cbb62c38149cca587a604894cb9193')
      setallMovies(data.results)   
    }
    async function getTrendingTv() {
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=77cbb62c38149cca587a604894cb9193')
      setallTv(data.results)   
    }
    

    useEffect(function(){
      

      getTrendingMovies();
      getTrendingTv();

    } , [])

  
  return <>



    {allMovies != null && allTv != null?<div className="container p-3">

      <Helmet>

      <title>Movie db</title>


      </Helmet>
      
      <div className="row align-items-center ">
        <div className="col-md-4">
          <div className={home.title}>
            <h3>
              Trending Movies to Watch now

            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        {allMovies.slice(0,10).map((movie , idx)=> <div key={idx} className="col-md-2 ">
            <Link to={`/moviedetails/${movie.id}`}>

              <div className="movie text-center ">
                <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='w-100 ' alt="" />
                <h6 >{movie.title}</h6>
              </div>
            </Link>

        </div>)}
      </div>
      <div className="row align-items-center">
         <div className="col-md-4">
            <div className={home.title}>
              <h3>
                Trending Tv to Watch now

              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
          
          {allTv.slice(0,10).map((tv,idx)=> <div key={idx} className="col-md-2">

            <Link to={`/tvdetails/${tv.id}`}>
              <div className="tv text-center">
                <img src={'https://image.tmdb.org/t/p/w500/' + tv.poster_path} className='w-100' alt="" />
                <h6>{tv.name}</h6>
              </div>
            </Link>
        
          </div> )}
      </div>

    </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
    </div>}

    
    


  
  
  
  
  </>
}
