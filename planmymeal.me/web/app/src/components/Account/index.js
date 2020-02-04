import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { ClipLoader } from "react-spinners";
const rp = require("request-promise");

class Account extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      image: null,
      mealCount: 0,
      plans: []
    };
  }

  getUrl = url => {
    let firstPart = url.split("(")[1];
    let secondPart = firstPart.substring(0, firstPart.length - 2);
    return secondPart;
  };

  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      var options = {
        method: "GET",
        uri: `http://localhost:4000/api/user/userWithPlan/${user.loginId}`,
        headers: {
          authorization: user.jwtToken ? `${user.jwtToken}` : ""
        },
        json: true // Automatically stringifies the body to JSON
      };
      const userPlans = await rp(options);

      if (user != null) {
        this.setState({
          name: user.userName,
          image: user.image,
          plans: userPlans.userPlans,
          mealCount: userPlans.userPlans.length
        });
      }
      console.log(userPlans.userPlans);
    }
  }

  render() {
    const { name, image, plans, mealCount } = this.state;
    return (
      <section className="services">
        <div className="user-detail__profile">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="user-detail__profile-box">
                  <a className="user-detail__profile-image" href="#">
                    <img src={image ? image : ""} alt="" />
                  </a>
                  <h3 className="user-detail__profile-title">
                    <a href="#">{name ? name : ""}</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-7">
                <Link
                  style={{ float: "right" }}
                  className="btn-default btn-default-red"
                  to="/new"
                >
                  Create New Plan
                </Link>
                <ul className="user-detail__profile-list">
                  <li>
                    <span>{mealCount}</span>
                    Total Plans
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ background: "#f8f9fa" }}
          className="user-detail__scroll-menu-box"
        >
          <div className="container">
            <ul className="user-detail__scroll-menu navigate-section">
              <li>
                <a className="active" href="#">
                  My Plans:
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <div
            style={{ border: "none", borderRadius: "0px" }}
            className="add-listing__form-box"
          >
            <div className="add-listing__form-content">
              <div className="row">
                <div
                  style={{ minHeight: "600px" }}
                  className="col-lg-12 col-md-12"
                >
                  <h2
                    style={{ color: "#fb646f" }}
                    className="user-detail__subtitle"
                  >
                    Newest Plan:
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {plans !=
                    (
                      <ClipLoader
                        sizeUnit={"px"}
                        size={42}
                        color={"#ffc107"}
                        loading={true}
                      />
                    )
                      ? plans.map((plan, i) => {
                          return (
                            <div className="col-xl-3 col-md-3">
                              <div key={i}>
                                <div>
                                  <Link to={`/plan/${plan._id}`}>
                                    <img
                                      style={{
                                        maxHeight: "170px",
                                        objectFit: "cover"
                                      }}
                                      className="cities-post__image"
                                      src={this.getUrl(
                                        plan.weekDays[0].mealId.image
                                      )}
                                      alt=""
                                    />
                                  </Link>
                                  <h2 className="cities-post__title">
                                    <a style={{ color: "#fb646f" }} href="#">
                                      Week {plan.weekNr}
                                    </a>
                                  </h2>
                                  <ul className="cities-post__list">
                                    <li style={{ color: "#fb646f" }}>
                                      7 Meals
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Account);
