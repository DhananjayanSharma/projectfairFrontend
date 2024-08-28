import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
    <div style={{width:'100%', height:'100vh' ,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className='row'>
            <div className="col-md-1"></div>
            <div className="col-md-10 d-flex justify-content-center align-items-center flex-column">
                <img src="https://cdn.dribbble.com/users/469578/screenshots/2597126/404-drib23.gif" alt="no image" width={'100%'} height={'450px'}/>
                <h1 className='mt-3'>Look like you're lost</h1>
                <h5 className='mt-2'>The page you are looking is unavailable</h5>
                <Link to={'./'}><button className='btn btn-success mt-5 rounded-0 '>Back home</button></Link>
            </div>
            <div className="col-md-1"></div>

        </div>

    </div>
      
    </>
  )
}

export default PageNotFound
