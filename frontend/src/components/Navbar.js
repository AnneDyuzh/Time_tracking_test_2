import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {

  render() {
    const userLink = (
      <ul  className="navbar-nav">
        <li className="nav-item ">
          <Link to="/todo-list" className=" text-white text-left nav-link">
            Задачи
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                О приложении
              </Link>
            </li>
          </ul>
          {localStorage.usertoken=userLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
