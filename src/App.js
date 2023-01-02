import './App.css';
import {  createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main from './components/Main/Main';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Movies from './components/TrendingMovies/Movies';
import Tvseries from './components/TrendingTvs/Tvseries';
import MovieDetails from './components/Moviedetails/MovieDetails';
import Tvdetails from './components/Tvdetails/Tvdetails';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import Upcomingmovies from './components/Upcomingmovies/Upcomingmovies';
import Topreatedmovies from './components/topmovies/Topreatedmovies';
import Topratedmovies2 from './components/topmovies/Topratedmovies2';
import Topratedmovies3 from './components/topmovies/Topratedmovies3';
import Upcomingmovies2 from './components/Upcomingmovies/Upcomingmovies2';
import Upcomingmovies3 from './components/Upcomingmovies/Upcomingmovies3';
import Toptvs from './components/Topseries/Toptvs';
import Toptvs2 from './components/Topseries/Toptvs2';
import Toptvs3 from './components/Topseries/Toptvs3';
import Populartv from './components/poptvs/Populartv';
import Populartv2 from './components/poptvs/Populartv2';
import Populartv3 from './components/poptvs/Populartv3';
import { Offline } from 'react-detect-offline';
import Notfound from './components/Notfound/Notfound';








function App() {



  const [loggedInUser, setloggedInUser] = useState(null)



  function ProtectedRoute(props) {

      if (localStorage.getItem('tkn') ==null && loggedInUser == null  ) {
        // mafesh user ? tl3o bra
        // <h1 className='text-white'>you should login first </h1>
        return <Navigate  to='/Login' />
        // <div className='w-100 vh-100 bg-warning'>kjnkjn</div>
      }
      else{
        //feeh user ? ab3too 3la el home page
        return <> { props.children }</>

      }
  }

  function getLogedInUserData() {
    
    if (localStorage.getItem('tkn') != null) {

     let tkn =  localStorage.getItem('tkn');

     
     let userData = jwtDecode(tkn);

     setloggedInUser(userData)

     console.log(userData);
     
      
    }

  }


  function removeUserData(){
    localStorage.removeItem('tkn');
    setloggedInUser(null);
    
  }

  function checkReload() {
    if (localStorage.getItem('tkn') !=null && loggedInUser == null) {
      //user 3ml reload
      getLogedInUserData()
      

    }
  }

  useEffect(function() {
    checkReload()

  },[])


  const router = createHashRouter([
    {path: '' , element:<Main removeUserData={removeUserData} currentUser={loggedInUser}/>,children:[
      {path:'',element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      {path:'Home',element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      {path:'Register',element:<Register /> },
      {path:'Login',element: <Login loginVerfication={getLogedInUserData}/> },
      {path:'*',element:<ProtectedRoute><Notfound /></ProtectedRoute>  },
      {path:'Movies',element: <ProtectedRoute> <Movies /> </ProtectedRoute> },
      {path:'Upcommov',element: <ProtectedRoute> <Upcomingmovies /> </ProtectedRoute> },
      {path:'Upcommov2',element: <ProtectedRoute> <Upcomingmovies2 /> </ProtectedRoute> },
      {path:'Upcommov3',element: <ProtectedRoute> <Upcomingmovies3 /> </ProtectedRoute> },
      {path:'Topmov',element: <ProtectedRoute> <Topreatedmovies /> </ProtectedRoute> },
      {path:'Topmov2',element: <ProtectedRoute> <Topratedmovies2 /> </ProtectedRoute> },
      {path:'Topmov3',element: <ProtectedRoute> <Topratedmovies3 /> </ProtectedRoute> },
      {path:'Tvseries',element: <ProtectedRoute> <Tvseries /> </ProtectedRoute> },
      {path:'Toptvs',element: <ProtectedRoute> <Toptvs /> </ProtectedRoute> },
      {path:'Toptvs2',element: <ProtectedRoute> <Toptvs2 /> </ProtectedRoute> },
      {path:'Toptvs3',element: <ProtectedRoute> <Toptvs3 /> </ProtectedRoute> },
      {path:'Popular',element: <ProtectedRoute> <Populartv /> </ProtectedRoute> },
      {path:'Popular2',element: <ProtectedRoute> <Populartv2 /> </ProtectedRoute> },
      {path:'Popular3',element: <ProtectedRoute> <Populartv3 /> </ProtectedRoute> },
      {path:'moviedetails',element: <ProtectedRoute> <MovieDetails  /> </ProtectedRoute> , children:[
        {path:':id' }
      ] },
      {path:'tvdetails',element: <ProtectedRoute> <Tvdetails  /> </ProtectedRoute> , children:[
        {path:':id' }
      ] },
      
      
    ]},
  ])



  return <>
  <Offline>
    <div className='bg-secondary offline border border-4 border-white text-white  m-5 p-2'>
      <h3>Oops your internet connection has been lost</h3>
    </div>
  </Offline>

  <RouterProvider router={router} />

    
  </>
}

export default App;
