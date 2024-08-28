import { faFacebook, faInstagram, faStackOverflow, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <>
    <div className='container-fluid bg-success mt-5 p-5'>
        <div className='row'>
            <div className="col-md-4">
                <h1 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2' style={{color: "#ffffff",}} />Project Fair</h1>
                <p className='mt-3' style={{textAlign:'justify'}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde voluptate accusantium, aspernatur, provident consequuntur sit id maxime possimus quam blanditiis dolore minima! Nihil saepe consequatur nobis cumque iusto repellendus quis.</p>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center align-items-center flex-column">
            <h4 className='text-light'>Links</h4>
               <Link to={'./'} style={{textDecoration:"none"}}><p className='mt-1'>Home</p></Link> 
               <Link to={'/project'}style={{textDecoration:"none"}}><p>Project</p></Link> 
               <Link to={'/dashboard'}style={{textDecoration:"none"}}> <p>Dashboard</p></Link>
            </div>
            <div className="col-md-2  d-flex justify-content-center align-items-center flex-column">
                <h4 className='text-light'>Guides</h4>
                <p className='mt-1'>React</p>
                <p>Bootstrap</p>
                <p>Bootswatch</p>
            </div>
            <div className="col-md-4">
                <h4 className='text-light'>Contact Us</h4>
                <div className='d-flex mt-3'>
                    <input type="text " placeholder='email Id' className='form-control rounded-0' />
                    <button className='btn btn-warning rounded-0 '>Subscribe  </button>

                </div>
                <div className='d-flex mt-3 justify-content-between text-light'>
                <FontAwesomeIcon icon={faTwitter}  className='fa-2x'/>
                <FontAwesomeIcon icon={faFacebook} className='fa-2x'/>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x'/>
                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x'/>

                </div>
            </div>
        </div>

    </div>
      
    </>
  )
}

export default Footer
