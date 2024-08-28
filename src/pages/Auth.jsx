import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoginAuthContext } from '../context/Contextshare'


function Auth({ register }) {
  const navigate = useNavigate()
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('please fill the fields completely')
    } else {
      const result = await registerApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success('Registration successfull')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        toast.error('something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }
  console.log(userDetails);

  const handleLogin = async(e)=>{
    e.preventDefault()
    const{email,password} = userDetails
    if(!email || !password){
      toast.info('please fill form completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success('Login successfull')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token',result.data.token)
        setIsLoginStatus(true)
        navigate('/')
      }
      else{
        toast.error('something went wrong')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }
    }
  }

  return (
    <>
      <div className='' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='container w-75' >
          <Link to={'/'}> <h4 className='text-warning'><FontAwesomeIcon icon={faArrowLeft} />Back Home</h4> </Link>
          <div className='bg-success p-4'>
            <Row>
              <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
                <img src="https://w7.pngwing.com/pngs/219/637/png-transparent-computer-icons-campervans-internet-padlock-padlock-service-technic-logo.png" alt="" width={'50%'} />

              </Col>
              <Col md={6} className='p-4 d-flex justify-content-center text-light'>
                <form action="">
                  <h4 className='text-center text-light'><FontAwesomeIcon icon={faStackOverflow} />Project Fair</h4>

                  {register ? <h5 className='text-center'>SignUp Your Account</h5> :
                    <h5 className='text-center'>SignIn Your Account</h5>}
                  {register && <div className='mb-3'>
                    <input type="text" placeholder='Username' className='form-control rounded-0'value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />

                  </div>}
                  <div className='mb-3'>
                    <input type="text" placeholder='Email ID' className='form-control rounded-0' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />

                  </div>
                  <div className='mb-3'>
                    <input type="text" placeholder='Password' className='form-control rounded-0' value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />

                  </div>

                  {register ? <div>
                    <button type='button' className='btn btn-warning w-100 rounded-0' onClick={handleRegister}>Register</button>
                    <p>Already a user? click here to <Link to={'/login'} className='text-danger'> Login</Link></p>
                  </div> :
                    <div>
                      <button type='button' onClick={handleLogin} className='btn btn-warning w-100 rounded-0'>Login</button>
                      <p>New user? click here to <Link to={'/register'} className='text-danger'>Register</Link> </p>
                    </div>}
                </form>

              </Col>
            </Row>

          </div>




        </div>
        <ToastContainer autoClose={2000} theme="colored" position='top-center' />
      </div>
    </>
  )
}

export default Auth
