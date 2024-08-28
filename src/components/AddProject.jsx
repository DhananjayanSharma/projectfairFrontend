import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function AddProject() {

  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImg: ""
  })

  const [preview, setPreview] = useState("")
  const [key, setKey] = useState(false)
  const { setAddResponse } = useContext(addResponseContext)

  const handleClose = () => {
    setShow(false);
    handleClose1()
  }
  const handleShow = () => setShow(true);
  console.log(projectDetails);

  const handlefile = (e) => {
    //console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })

  }
  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }

  }, [projectDetails.projectImg])

  const handleClose1 = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImg: ""

    })
    setPreview("")
    if (key == false) {
      setKey(true)
    }
    else {
      setKey(false)
    }
  }
  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImg } = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImg) {
      alert('please fill the form completely')
    }
    else {
      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")
      console.log(token);

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addProjectApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          setAddResponse(result.data)
          alert('project added successfully')
          handleClose()
        }
        else {
          alert('somethingwentwrong')
          handleClose()
        }
      }
    }
  }
  return (
    <>
      <button className='btn btn-success rounded-0' onClick={handleShow}>Add project</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="proImg">
                <input type="file" id='proImg' style={{ display: 'none' }} key={preview} onChange={(e) => handlefile(e)} />
                <img src={preview ? preview : "https://th.bing.com/th/id/OIP.T16FtmcADP8pN97w3wv7PQAAAA?rs=1&pid=ImgDetMain"} alt="no image" className='w-100' />
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Github' className='form-control' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>
              <div className="mb-3">
                <textarea placeholder='Overview' rows={5} className='form-control' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddProject
