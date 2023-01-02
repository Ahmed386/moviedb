import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Tvdetails() {

    const [objDetails, setobjDetails] = useState(null);
    //hook => function returns the params that you sent

    let {id } = useParams()


    async function getMovieDetails() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=77cbb62c38149cca587a604894cb9193&language=en-US`)
        setobjDetails(data)
    }

    useEffect(()=>{
        getMovieDetails()

    },[])


  return <>

    {objDetails?<div className="container p-4 m-auto">


    <Helmet>

        <title>{objDetails.name} </title>


    </Helmet>   

        <div className="row">
            <div className="col-md-4">
                <div className="poster text-center">
                <img src={'https://image.tmdb.org/t/p/w500/' + objDetails.poster_path} alt="movie poster" className='w-100' />
                <p>{objDetails.tagline}</p>

                </div>
            </div>
            <div className="col-md-8">
                <div className="moviedetails">
                    <h4>{objDetails.name}</h4>
                    <p>{objDetails.overview}</p>
                    
                    {objDetails.genres?.map((elem,idx)=> <span key={idx} className="badge rounded text-bg-info p-2 m-1">{elem.name}</span> )}
                    <h6 className='mt-2'>country of production : <small className='ms-4'>{objDetails.production_countries[0].name}</small> </h6>
                    <h6 className='mt-2'>Rate : <small className='ms-4'>{objDetails.vote_average.toFixed(1)}</small> </h6>
                    <h6 className='mt-2'>Category : <small className='ms-4'>{objDetails.adult?'+18':'+13'}</small> </h6>
                    <h6 className='mt-2'>Last episode releasedate : <small className='ms-2'> {objDetails.last_episode_to_air.air_date}</small> </h6>
                    <h6 className='mt-2'>Seasons : <small className='ms-4'>{objDetails.number_of_seasons}</small> </h6>
                    <h6 className='mt-2'>Number of episodes : <small className='ms-4'>{objDetails.number_of_episodes}</small> </h6>
                    <h6 className='mt-2'>Link  : <small className='ms-3'><a className='text-decoration-underline' href={objDetails.homepage} target='_blank'> {objDetails.homepage !=''? objDetails.homepage : 'Onupdate'}</a> </small> </h6> 
                    



                    {/* <h6 className='mt-2'>Releasedate : <small className='ms-2'> {objDetails.release_date}</small> </h6>
                    <h6 className='mt-2'>Movietime : <small className='ms-3'>{objDetails.runtime} minutes</small> </h6> */}
                </div>
            </div>
        </div>
    </div>: <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fa-5x text-white"></i>
    </div>}




    
  
  
  
  
  
  
  
  </>
}
