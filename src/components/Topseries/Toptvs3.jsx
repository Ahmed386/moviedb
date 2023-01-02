
import React, { useEffect , useState } from 'react'
import axios from 'axios';
import home from '../Home/Home.module.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Toptvs3() {


    const [allTv, setallTv] = useState(null)

   
    async function getTrendingTv() {
      let {data} = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=77cbb62c38149cca587a604894cb9193&language=en-US&page=3')
      setallTv(data.results)   
    }

    useEffect(function(){
      getTrendingTv();

    } , [])

  
  return <>

    { allTv != null?<div className="container p-3">


    <Helmet>

      <title>Top-Rated Series </title>


    </Helmet>
      
      <div className="row align-items-center">
         <div className="col-md-4">
            <div className={home.title}>
              <h3>
                Trending TvSeries to Watch now

              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
          
          {allTv.map((tv,idx)=> <div key={idx} className="col-md-2">
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


    <div className=' p-3 justify-content-center  d-flex '>
        <div className='justify-content-center  d-flex pagi border border-1 '>
            <Link className="nav-link item px-2 active mx-3 my-2" aria-current="page" to="/Toptvs">1</Link>
            <Link className="nav-link item px-2 active mx-3 my-2" aria-current="page" to="/Toptvs2">2</Link>
            <Link className="nav-link text-warning px-2 active mx-3 my-2" aria-current="page" to="/Toptvs3">3</Link>
        </div>
    </div>

    
    


  
  
  
  
  </>
}

