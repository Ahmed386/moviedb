import React , { useState } from 'react'
// import { Link } from 'react-router-dom';
import Joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  const navigate = useNavigate()

  const [joiErrors, setjoiErrors] = useState([])
  const [apiMessage, setapiMessage] = useState('')
  const [clickedBtn, setclickedBtn] = useState(false)


  const [user, setuser] = useState({
    first_name : '' ,
    last_name : '' ,
    age : 0 ,
    email : '' ,
    password : '' 
  })  

  

  function getSpecificError(key) {

    if (joiErrors !=null){
      for (const iterator of joiErrors) {

        if ( iterator.context.key == key  ) {
          
        
          return iterator.message ;
          }
        
      }
  
      return '' ;
    }
  }

  function getUSer(e){
    setjoiErrors(null)
    setapiMessage('')
    let inputValue = e.target.value
    let newUser = {...user}
    newUser[e.target.id]=inputValue
    setuser(newUser)
    // console.log(newUser);
  }

  function submitUser(e){

    setclickedBtn(true)

    e.preventDefault()

    const schema = Joi.object({
      first_name:Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      age:Joi.number().min(18).max(80).required(),
      password:Joi.string().pattern(/^[a-z0-9]{7,12}$/i).required()
    })

    let joiResponse =schema.validate(user,{abortEarly:false})
    console.log(joiResponse);
    if (joiResponse.error == undefined ) {
      // data is valid
      // go and call the api
      sendUSer()
    }else{
      let errorList = joiResponse.error.details
      setjoiErrors(errorList)
      // console.log(errorList);
      setclickedBtn(false)


    }



  }
  async function sendUSer() {
    let {data} = await axios.post('https://route-movies-api.vercel.app/signup' ,user)
    console.log(data);

    setclickedBtn(false)

    if (data.message == 'success') {
       //send user to home page
       navigate('/Home')

    }else{
      //send user a message that the account is already registered
      setapiMessage( data.message )
    }
  }






  return <>
    <div className="w-50 m-auto p-4">


    <Helmet>

      <title>Sign Up </title>


    </Helmet>

       
       
       {/* {joiErrors == []?'':joiErrors.map( (error ,idx)=> <div key={idx} className='alert alert-danger'>{error.message}</div> )} */}

       {apiMessage.length ==0? '':<div className='alert alert-danger'>{apiMessage}</div>}

        <form onSubmit={submitUser}  >
            <h2 className='mb-4 text-center'>Create a new account</h2>

            <label className='mb-1' htmlFor="first_name">first_name</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='first_name' type="text" placeholder='first_name' />
            {getSpecificError('first_name')?<div className='alert alert-danger'>
            {getSpecificError('first_name')}
            </div>:''}
            <label className='mb-1' htmlFor="last_name">last_name</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='last_name' type="text" placeholder='last_name' />
            {getSpecificError('last_name')?<div className='alert alert-danger'>
            {getSpecificError('last_name')}
            </div>:''}
            <label className='mb-1' htmlFor="age">age</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='age' type="number" placeholder='age' />
            {getSpecificError('age')?<div className='alert alert-danger'>
            {getSpecificError('age')}
            </div>:''}

            <label className='mb-1' htmlFor="email">email</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='email' type="email" placeholder='email' />
            {getSpecificError('email')?<div className='alert alert-danger'>
            {getSpecificError('email')}
            </div>:''}

            <label className='mb-1' htmlFor="password">password</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='password' type="password" placeholder='password' />
            {getSpecificError('password')?<div className='alert alert-danger'>
            password is not valid you must write from 7 to 12 characters and numbers
            </div>:''}

            <button className='btn btn-outline-info'>
              {clickedBtn == false?'Register ' : <i className='fa-solid fa-spinner fa-spin'></i>}
            </button>
        </form>

    </div>
  
  
  
  
  
  </>
}
