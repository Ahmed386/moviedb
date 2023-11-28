import React , { useState } from 'react'
// import { Link } from 'react-router-dom';
import Joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login({loginVerfication}) {

  const navigate = useNavigate()

  const [joiErrors, setjoiErrors] = useState([])
  const [apiMessage, setapiMessage] = useState('')


  const [user, setuser] = useState({
  
    email : '' ,
    password : '' 
  })  

  function getUSer(e){
    let inputValue = e.target.value
    let newUser = {...user}
    newUser[e.target.id]=inputValue
    setuser(newUser)
    // console.log(newUser);

  }

  function submitUser(e){
    e.preventDefault()

    const schema = Joi.object({
      
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
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
      

    }

  }
  async function sendUSer() {
    let {data} = await axios.post('https://movies-api.routemisr.com/signin' ,user)
    
    if (data.message == 'success') {
        //userdata from => token
        localStorage.setItem('tkn',data.token)
        loginVerfication()
       //send user to home page
       navigate('/Home')

    }else{
      //send user a message that the account is already registered
      setapiMessage( data.message )
    }
  }






  return <>
    <div className="wraper m-auto p-4">

    <Helmet>

      <title>Login </title>


    </Helmet>

       
       
       {/* {joiErrors == []?'':joiErrors.map( (error ,idx)=> <div key={idx} className='alert alert-danger'>{error.message}</div> )} */}

       {apiMessage.length ==0? '':<div className='alert alert-danger '>{apiMessage}</div>}

        <form onSubmit={submitUser} className='border border-1 border-dark p-5 shadow' >
            <h2 className='text-center mb-3 text-muted'>Sign-in </h2>



            <label className='mb-1' htmlFor="email">email</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='email' type="email" placeholder='email' />

            <label className='mb-1' htmlFor="password">password</label>
            <input onChange={getUSer} className='form-control mb-3 bg-dark border-0 text-white' id='password' type="password" placeholder='password' />

            <button className='btn btn-outline-info'>Login</button>
        </form>

    </div>
  
  
  
  
  
  </>
}
