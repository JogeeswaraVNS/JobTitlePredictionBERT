import React, { useState } from 'react'
import axios from "axios";

function Predictcomponent() {

    let [JobDescription,setJobDescription]=useState('')

    let [JobSector,setJobSector]=useState('')

    let [JobTitle,setJobTitle]=useState('')

    let [loading, setloading] = useState(false);

    let backendapi = "http://localhost:5000";

    let handleSubmit = async () => {
      if(JobDescription.length>0){
        setloading(true)
        let response = await axios.post(`${backendapi}/predict`, {
            JobDescription
        });
        setJobSector(response.data.JobSector)
        setJobTitle(response.data.JobTitle)
        setloading(false)
    }}


  return (
    <div style={{textAlign:'center'}} className='mt-4'>
        <h3 className='my-4'>Enter Job Description</h3>

            <textarea className='mb-4' onChange={(event)=>{setJobDescription(event.target.value)}} rows={12} cols={120} placeholder='Enter the job description here'>
            </textarea>
            <br></br>




            <div className='col'>

            <div onClick={()=>{handleSubmit()
            setJobSector('')
            
          }} className='btn btn-primary'>
                <h5 className='px-3 pt-1'>Predict</h5>
            </div>
              </div>



            {
                loading===true?
                <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="ps-1 mt-4"
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="ms-2 mt-2">
                  <h6>Getting Job Sector and Job Title For You</h6>
                </div>
              </div>
                :
                null
            }

{
                JobSector.length===0?
                null
                :
                <div className='mt-4'>

<div className='row mx-auto'>

                  <div className='col'>
                  <h4>JobSector</h4>
                    <h2 className='text-primary'>{JobSector}</h2>
                    </div>



<div className='col'>
                    <h4>JobTitle</h4>
                    <h2 className='text-primary'>{JobTitle}</h2>

                    </div>

</div>
                </div>
            }


    </div>
  )
}

export default Predictcomponent