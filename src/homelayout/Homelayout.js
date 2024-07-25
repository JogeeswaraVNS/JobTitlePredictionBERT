import React from 'react'
import {Outlet} from 'react-router-dom'
import ProjectNavbar from '../navbarproject/ProjectNavbar'

function Homelayout() {
  return (
    <div>
      <div>
        <ProjectNavbar/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Homelayout