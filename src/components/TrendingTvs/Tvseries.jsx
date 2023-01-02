import React, { Fragment, useEffect , useState } from 'react'
import axios from 'axios';
import home from '../Home/Home.module.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Tvseries() {


    const [allTv, setallTv] = useState(null)

   
    async function getTrendingTv() {
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=77cbb62c38149cca587a604894cb9193')
      setallTv(data.results)   
    }

    useEffect(function(){
      getTrendingTv();

    } , [])

    async function search(e) {
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=77cbb62c38149cca587a604894cb9193&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
      setallTv(data.results)   
      console.log(data.results);
       
    }

  
  return <>

    <input onChange={search} className="form-control mt-3 bg-dark border-0 text-white w-50 m-auto" type="search" placeholder="Search" aria-label="Search" />
    

    { allTv != null?<div className="container p-3">


    <Helmet>

      <title>Trending Series </title>


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
          {allTv.map(( tv , idx)=> <Fragment key={idx}>
            {tv.poster_path?<div  className="col-md-2 ">
            <Link to={`/tvdetails/${tv.id}`}>

            <div className="tv text-center">
                <img src={'https://image.tmdb.org/t/p/w500/' + tv.poster_path} className='w-100' alt="" />
                <h6>{tv.name}</h6>
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
