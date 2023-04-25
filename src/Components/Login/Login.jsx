import React, { useState } from 'react';
import image from '../../Assets/gaming.ebaf2ffc84f4451d.jpg';
import logo from '../../Assets/logo (1).png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("")

  let validationSchema = Yup.object({
    email : Yup.string().required('Email Field is Required').email('This Email is Inavalid'),
    password : Yup.string().required('Password Field is Required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must Start With UpperCase'),
  })

  async function handleRegister (values) {
    setisLoading(true);

    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin` , values).catch( (error)=>{
      setisLoading(false);
      console.log(error.response.data.message);
      setmessageError(error.response.data.message);
    });
    
    if(data.message === 'success'){
      localStorage.setItem('userToken' , data.token);
      saveUserData();
      setisLoading(false);
      navigate('/home');
    }
  }

  let Formik = useFormik ({
    initialValues : {
      email : "",
      password : "",
    },
    onSubmit : handleRegister ,
    validationSchema
  })

  return <>
    <div className="container mt-5 bg-dark ps-0">
      <div className="row">
        <div className="col-md-6">
            <img src={image} className='w-100 h-100'/>
        </div>
        <div className="col-md-6">
          <img src={logo} width={150} height={100} className='d-block mx-auto'/>
          <h2 className='text-muted text-center py-4'>Log in to Game Over</h2>

          <form onSubmit={Formik.handleSubmit}>
            {messageError ? <div className='alert alert-danger'> {messageError} </div> : null}
            <div className="row g-4">
              
              <div className="col-md-12">
                <input type="email" name='email' id='email' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.email} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='Email Address'/>
                {Formik.errors.email && Formik.touched.email? <div className='alert alert-warning mt-2'>{Formik.errors.email}</div> : null}
              </div>

              <div className="col-md-12">
                <input type="Password" name='password' id='password' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.password} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='Password'/>
                {Formik.errors.password && Formik.touched.password? <div className='alert alert-warning mt-2'>{Formik.errors.password}</div> : null}
              </div>

              <div className="col-md-12">
              {isLoading? <button type='button' className='form-control bg-dark text-white border-0 py-2 my-2 text-white'><i className='fas fa-spinner fa-spin'></i></button>
              :<button disabled = {!(Formik.isValid && Formik.dirty)} type='submit' className='form-control bg-dark text-white border-0 py-2 text-white'>Log in</button>}
              </div>
            </div>

          </form>
          <p className='text-center pt-2'><Link className='text-info' to=''>Forgot Password?</Link></p>
          <p className='text-muted text-center py-2'>Not a Member Yet? <Link className='text-info' to='/register'>Create Account</Link> </p>
        </div>
      </div>
    </div>
  </>
}

