import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({currentUser , removeUserData , }) {

  const navigate = useNavigate()

  function logout() {
    let userChoice = window.confirm('Are You sure to logout')
    if (userChoice) {
      removeUserData()
      navigate('/Login')

    }
  }

  return <>



    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-2">
      <div className="container-fluid">
      

        <Link className="navbar-brand" to="/">
            
            <h3>Noxe</h3>
          </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          {currentUser? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
            </li>
            <li className="nav-item dropdown ">
              
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Movies
                </a>
                <ul className="dropdown-menu bg-dark text-center">
                  <li><Link className="nav-link item active" aria-current="page" to="/Movies">Trending</Link></li>
                  <li><Link className="nav-link item active" aria-current="page" to="/Topmov">Top_Rated</Link></li>
                  <li><Link className="nav-link item active" aria-current="page" to="/Upcommov">Upcoming</Link></li>

                  
                </ul>

            </li>
            
            <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    TvSeries
                  </a>
                <ul className="dropdown-menu bg-dark text-center">
                  <li><Link className="nav-link item active" aria-current="page" to="/Tvseries">Trending</Link></li>
                  <li><Link className="nav-link item active" aria-current="page" to="/Toptvs">Top-Rated</Link></li>
                  <li><Link className="nav-link item active" aria-current="page" to="/Popular">Popular</Link></li>
                  

                  
                </ul>

              {/* <Link className="nav-link active" aria-current="page" to="/Tvseries">TvSeries</Link> */}

            </li>

            
            
          </ul> : ''}


         
          

    
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">



          <li className="nav-item">
                  <i className='fa-brands me-3 fa-facebook-f'></i>
                  <i className='fa-brands me-3 fa-instagram'></i>
                  <i className='fa-brands me-3 fa-spotify'></i>
                  <i className='fa-brands me-3 fa-twitter'></i>
            </li>


            {currentUser? <><li className="nav-item logout">
              <span onClick={logout} className="nav-link " >LogOut</span>
            </li></>  : 
            <>
              
              <li className="nav-item">
                <Link className="nav-link" to="/Login">LOGIN</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">REGISTER</Link>
              </li>
            </>}

            
            



          </ul>



        </div>
      </div>
    </nav>






    
  
  
  
  
  
  
  </>
}
