import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import EditProject from './EditProject'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function MyProject() {
  const { addResponse } = useContext(addResponseContext)
  const [userProject, setUserProject] = useState([])
  const [deleteStatus, setDeletestatus] = useState(false)
  const { editResponse } = useContext(editResponseContext)

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader)
    setUserProject(result.data)
  }
  console.log(userProject);
  const handleDelete = async (id) => {
    const result = await removeUserProjectApi(id)
    if (result.status == 200) {
      setDeletestatus(true)
    }
  }

  useEffect(() => {
    getUserProject()
    setDeletestatus(false)
  }, [addResponse, deleteStatus, editResponse])

  return (
    <>
      <div className='shadow p-md-5 p-3 mb-5'>
        <div className='d-flex mt-4'>
          <h4 className='text-success me-auto'>MyProject</h4>
          <AddProject />

        </div>

        {userProject?.length > 0 ?
          userProject?.map((item) => (
            <div className='p-3 mt-4 rounded-2 d-flex' style={{ backgroundColor: 'lightgray' }}>
              <h5>{item.title}</h5>
              <div className='d-flex ms-auto align-items-center'>
                <EditProject project={item} />
                <Link><FontAwesomeIcon icon={faGlobe} className='ms-3 text-warning' /></Link>
                <FontAwesomeIcon icon={faGithub} className='ms-3 text-success' />
                <FontAwesomeIcon onClick={() => handleDelete(item._id)} icon={faTrash} className='ms-3 text-danger' />

              </div>

            </div>
          )) :
          <p>no project</p>}

      </div>
    </>
  )
}

export default MyProject
