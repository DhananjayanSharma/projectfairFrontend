import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allApi'


function Home() {
  const [token, setToken] = useState("")
  const [homeProject, setHomeProject] = useState([])

  const gethomeProject = async () => {
    const result = await homeProjectApi()
    setHomeProject(result.data)
  }
  console.log(homeProject);


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    gethomeProject()
  }, [])

  return (
    <>
      <div className='container-fluid bg-success p-4 mb-4' style={{ height: '100vh', width: '100%' }}>
        <Row className='mt-5'>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
            <div>
              <h1 className='text-light mt-5' style={{ fontSize: '76px' }}>Project Fair</h1>
              <h6>One stop destination for all software development projects</h6>
             {!token? <Link to={'/login'}>
              <button className='btn btn-outline-light my-4'>getStarted<FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button>
              </Link> 
                  :
                <Link to={'/dashboard'}> 
                <button className='btn btn-outline-light ms-2 my-4'>Manage Project<FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button>
                </Link>}
            </div>
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://th.bing.com/th/id/OIP.eZQ15B3OXa3xBbFM7xczHAAAAA?rs=1&pid=ImgDetMain" alt="" width={'100%'} />
          </Col>
        </Row>
      </div>
      <div className='container-fluid'>
        <h1 className='text-center my-5'>Explore Our Project</h1>
        <div className='row mb-5'>
          {homeProject?.length > 0 ?
            homeProject?.map((item) => (
              <div className="col-md-4 justify-content-center d-flex p-4">
                <ProjectCard project={item} />
              </div>
            )) :
            null}
        </div>
        <Link to={'/project'} className='text-danger'> <h5 className='text-center my-5'>See more projects</h5></Link>
      </div>
    </>
  )
}

export default Home
