import React from 'react'

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 about">
            <h1>About This Project</h1>
            <p>
              This project utilizes{" "}
              <a href="https://www.theguardian.com" rel="noreferer noopener">
                TheGuardian
              </a>{" "}
              news API and is developed by{" "}
              <a href="https://arefweb.ir" target="_blank">
                Aref Movahedzadeh
              </a>
              .
            </p>
            <p>
              Just enter your search term and hit enter. Hope you enjoy{" "}
              <span>😀</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About
