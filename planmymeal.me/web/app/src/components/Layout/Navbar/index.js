import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: null,
      image: null,
      provider: null,
      open: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  logOutUser = async () => {
    await localStorage.clear();
    window.location.replace("/");
  };

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user != null) {
      this.setState({
        loggedIn: true,
        name: user.userName,
        image: user.image,
        provider: user.provider
      });
    }
  }

  render() {
    const { open, loggedIn, name, image, provider } = this.state;
    console.log(image);
    return (
      <header className="clearfix">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/">
              <img src="/images/logo_v1.png" alt="" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li>
                  <a
                    className={
                      this.props.location.pathname === "/" ? "active" : ""
                    }
                    href="#"
                  >
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#">How To</a>
                </li>
                <li>
                  <Link
                    className={
                      this.props.location.pathname === "/Discover"
                        ? "active"
                        : ""
                    }
                    to="/Discover"
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      this.props.location.pathname === "/About" ? "active" : ""
                    }
                    to="/About"
                  >
                    About
                  </Link>
                </li>
              </ul>
              {loggedIn ? (
                <ul className="navbar-nav ml-auto right-list">
                  <li />
                  <li style={{ textAlign: "right", maxWidth: "340px" }}>
                    <a href="#">
                      {name}{" "}
                      <i className="fa fa-caret-down" aria-hidden="true" />
                    </a>
                    <img
                      style={{
                        width: provider === "facebook" ? "12%" : "10%",
                        borderRadius: "50%"
                      }}
                      src={image}
                    />
                    <ul style={{ textAlign: "right" }} className="dropdown">
                      <li>
                        <span>My Profile</span>
                      </li>
                      <li>
                        <Link to="/myplans">My Meal Plans</Link>
                      </li>
                      <li>
                        <Link to="/new">New Meal Plan</Link>
                      </li>
                      <li>
                        <a onClick={this.logOutUser} href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                <>
                  {" "}
                  <a
                    href="#"
                    onClick={this.onOpenModal}
                    className="add-list-btn btn-default"
                  >
                    <i
                      className="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    />{" "}
                    Join/Login
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="container">
            <div className="container">
              <div className="col-xs-3 text-center">
                <img
                  style={{ width: "35%", padding: "10px" }}
                  src="/images/socialMedia.svg"
                  alt=""
                />
              </div>
              <div className="col-xs-1 text-center" />
              <div className="col-xs-1 text-center">
                <h2>Login with your Social media Accounts!</h2>
                <ul className="sign-form__social">
                  <li>
                    <a
                      href="http://localhost:4000/api/auth/facebook"
                      className="facebook"
                    >
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://localhost:4000/api/auth/google"
                      className="google"
                    >
                      <i className="fa fa-google" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      </header>
    );
  }
}

export default withRouter(Navbar);
