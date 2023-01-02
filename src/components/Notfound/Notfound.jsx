import React from 'react'
import { Helmet } from 'react-helmet';
import home from '../Home/Home.module.css'



export default function Notfound() {
  return <>

        <Helmet>

             <title>Error page not found ! </title>


        </Helmet>


        <div className="container m-5 m-auto p-5">
            <div className="row align-items-center ">
                <div className="col-md-4">
                    <div className={home.title}>
                        <h2>
                        Movie db

                        </h2>
                        <p>Lorem ipsum dolor sit amet, consectetur.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className=''>

                        <i class="w-75 my-3 ms-4 p-3 text-center fa-solid fa-compass fa-spin fa-2x "></i>
                        
                        <p>Error 404  this page doesn't exist ! maybe it was deleted you can go back or search for something else . </p>
                       
                    </div>
                </div>
            </div>
        </div>
  
  
  
  
  </>
}
