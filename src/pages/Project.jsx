import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allApi'

function Project() {

  const [isToken, setIsToken] = useState("")
  const [allProject, setAllProject] = useState([])
  const [searchKey, setSearchKey] = useState("")
  
  const getAllProject = async (searchKey) => {
    const result = await allProjectApi(searchKey)
    setAllProject(result.data)
    
  }
  console.log(allProject);

  useEffect(() => {
    getAllProject(searchKey)
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(sessionStorage.getItem("token"))
    }
    // getAllProject()
  }, [])
  return (
    <>
      <Header />
      <div className="container-fluid">
        <h1 className='text-center mt-5'>All projects</h1>

        {/* all project when logged in */}
        
          {isToken ? <div>
            <div className='row my-4'>
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex">
                <input type="text" className='form-control mb-3' placeholder='Technologies ' onChange={(e) => setSearchKey(e.target.value)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginTop: '12px', marginLeft: '-30px', color: 'lightgray' }} />

              </div>
              <div className="col-md-4"></div>
            </div>
            <div className='row my-5'>
              {allProject?.length > 0 ?
                allProject?.map((item) => (
                  <div className="col-md-4">
                    <ProjectCard project={item} />
                  </div>

                )) :
                <p className='text-danger ms-5' >no project show</p>

              }



            </div>
          </div> :

            <div className='mt-5 w-100 row'>
              <div className="col-md-4"></div>
              <div className="col-md-4 m-4 d-flex justify-content-center align-items-center flex-column" >
                <img src="https://cdn.dribbble.com/users/1525393/screenshots/15722735/media/fdb36d13151cbc4030699f668faa4226.gif" alt="no image" width={'70%'} height={'300px'} />
                <h4 className='mt-5 text-center'>Please  <Link to={'/login'} className='text-danger' >Login</Link> to explore more projects</h4>
              </div>
              <div className="col-md-4"></div>

            </div>}


        </div>
      
    </>
  )
}

export default Project
