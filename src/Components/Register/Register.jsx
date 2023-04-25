import React, { useState } from 'react';
import image from '../../Assets/gaming.ebaf2ffc84f4451d.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("")

  let validationSchema = Yup.object({
    name : Yup.string().required('Name Field is Required').min(3 , 'MinLength for Name is 3').max(10 , 'MaxLengt for Name is 10'),
    email : Yup.string().required('Email Field is Required').email('This Email is Inavalid'),
    password : Yup.string().required('Password Field is Required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must Start With UpperCase'),
    rePassword : Yup.string().required('rePassword Field is Required').oneOf([Yup.ref("password")]),
    phone : Yup.string().required('Phone Field is Required').matches(/^01[0125][0-9]{8}$/ , 'Phone must be a Valid Number')
  })

  async function handleRegister (values) {
    setisLoading(true);

    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).catch( (error)=>{
      setisLoading(false);
      console.log(error.response.data.message);
      setmessageError(error.response.data.message);
    });
    
    if(data.message == 'success'){
      setisLoading(false)
      navigate('/login');
      console.log(values);
    }
  }

  let Formik = useFormik ({
    initialValues : {
      name : "",
      email : "",
      password : "",
      rePassword : "",
      phone : ""
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
          <h2 className='text-muted text-center py-4'>Create my Account!</h2>

          <form onSubmit={Formik.handleSubmit}>
            {messageError ? <div className='alert alert-danger'> {messageError} </div> : null}
            <div className="row g-4">
              <div className="col-md-6">
                <input type="text" name='name' id='name' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.name} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='Enter Your Name'/>
                {Formik.errors.name && Formik.touched.name? <div className='alert alert-warning mt-2'>{Formik.errors.name}</div> : null}
              </div>
              
              <div className="col-md-6">
                <input type="email" name='email' id='email' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.email} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='Email Address'/>
                {Formik.errors.email && Formik.touched.email? <div className='alert alert-warning mt-2'>{Formik.errors.email}</div> : null}
              </div>

              <div className="col-md-12">
                <input type="text" name='phone' id='phone' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.phone} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='Enter Your Phone'/>
                {Formik.errors.phone && Formik.touched.phone? <div className='alert alert-age-2'>{Formik.errors.phone}</div> : null}
              </div>
              <div className="col-md-12">
                <input type="Password" name='password' id='password' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.password} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='Password'/>
                {Formik.errors.password && Formik.touched.password? <div className='alert alert-warning mt-2'>{Formik.errors.password}</div> : null}
              </div>

              <div className="col-md-12">
                <input type="Password" name='rePassword' id='rePassword' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.rePassword} className='form-control bg-dark text-white border-1 border-info py-2' placeholder='rePassword'/>
                {Formik.errors.rePassword && Formik.touched.rePassword? <div className='alert alert-warning mt-2'>{Formik.errors.rePassword}</div> : null}
              </div>

              <div className="col-md-12">
              {isLoading? <button type='button' className='form-control bg-dark text-white border-0 py-2 my-2 text-white'><i className='fas fa-spinner fa-spin'></i></button>
              :<button disabled = {!(Formik.isValid && Formik.dirty)} type='submit' className='form-control bg-dark text-white border-0 py-2 text-white'>Create Account</button>}
              </div>
            </div>

          </form>
          <p className='text-muted text-center py-3'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
          <p className='text-muted text-center py-3'>Already a member? <Link className='text-info' to='/login'>Login</Link> </p>
        </div>
      </div>
    </div>
  </>
}
