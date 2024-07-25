import React from "react";
import { Container, Navbar } from "react-bootstrap";

function ProjectNavbar() {
  return (
    <div>

      <div className="navbar bg-dark">
        <div className="py-2 container-fluid">
          <a className="navbar-brand" href="/">
            <h5 className="ms-1 text-white">Job Title Prediction</h5>
          </a>


        <a className="navbar-brand" href="/predict">
            <div className="btn ms-1 btn-primary">
              <h5 className="pt-1 px-2">
              Predict
              </h5>
              </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectNavbar;
