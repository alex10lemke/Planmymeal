import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { kitchenType as kitchenTypes, mealCategory } from "../../utils/Options";
const rp = require("request-promise");

let kitchenTypeArray = [];

class Advanced extends Component {
  constructor() {
    super();
    this.state = {
      kitchenType: null,
      category: null,
      categories: [],
      open: false,
      isLoading: false,
      nextStep: false
    };
  }

  componentDidMount() {
    kitchenTypeArray = [];
    this.setState({
      categories: [],
      category: null,
      kitchenType: kitchenTypeArray
    });
  }

  handleKitchenTypeChange = categoryId => {
    if (!kitchenTypeArray.includes(categoryId)) {
      kitchenTypeArray.push(categoryId);
    } else {
      var index = kitchenTypeArray.indexOf(categoryId);
      if (index > -1) {
        kitchenTypeArray.splice(index, 1);
      }
    }
    console.log(kitchenTypeArray);
    this.setState({
      kitchenType: kitchenTypeArray
    });
  };

  handleCategoryChange = () => value => {
    if (!value) {
      return;
    }
    if (value.length === 1) {
      console.log(value);

      this.setState({
        category: value[0].value
      });
    } else {
      let categoryArray = [];
      value.forEach((element, i) => {
        console.log(element);

        categoryArray.push(element.value);
      });
      this.setState({
        category: categoryArray
      });
    }
  };

  generatePlan = async () => {
    const waitFor = ms => new Promise(r => setTimeout(r, ms));
    var getToken = JSON.parse(localStorage.getItem("user"));
    var options = {
      method: "POST",
      uri: "http://localhost:4000/api/recipe/generateWeekPlan",
      headers: {
        authorization: getToken.jwtToken ? `${getToken.jwtToken}` : ""
      },
      body: {
        data: {
          category: this.state.category,
          kitchenType: this.state.kitchenType
        }
      },
      json: true // Automatically stringifies the body to JSON
    };
    this.setState({
      isLoading: true,
      open: true
    });
    rp(options).then(res => {
      waitFor(4000);
      this.props.history.push(`/plan/${res.id}`);
    });
  };

  render() {
    const { categories, nextStep } = this.state;
    return (
      <section className="services">
        {nextStep ? (
          <div className="container">
            <div className="section-header">
              <h1 style={{ color: "#fff" }} className="section-header__title">
                Create New Meal Plan:
                <a
                  style={{ float: "right" }}
                  onClick={() => this.setState({ nextStep: false })}
                  className="btn-default btn-default-red"
                  href="#"
                >
                  Back
                </a>
              </h1>

              <p className="section-header__description">
                <strong>Step 2:</strong> Select your personal preferences:{" "}
              </p>
            </div>
            <div className="add-listing__form-box" id="opening-box">
              <h2
                style={{ color: "#fb646f" }}
                className="add-listing__form-title"
              >
                Select your preferences:
              </h2>

              <div className="add-listing__form-content">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="row">
                      <div className="col-lg-10">
                        <Select
                          isMulti
                          menuPlacement="auto"
                          minMenuHeight={100}
                          name="kitchenType"
                          onChange={this.handleCategoryChange("category")}
                          placeholder="Select Kitchen Types"
                          options={mealCategory}
                        />
                      </div>
                      {/* <div className="col-md-6">
                        <Select
                          isMulti
                          menuPlacement="auto"
                          minMenuHeight={100}
                          name="kitchenType"
                          placeholder="Select Kitchen Types"
                          options={mealCategory}
                          className="discover__form-input"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-md-6">
                    <Select
                      isMulti
                      menuPlacement="top"
                      minMenuHeight={100}
                      name="kitchenType"
                      placeholder="Select Kitchen Types"
                      options={mealCategory}
                      className="discover__form-input"
                    />
                  </div>
                  <div className="col-md-6">
                    <Select
                      isMulti
                      menuPlacement="top"
                      minMenuHeight={100}
                      name="kitchenType"
                      placeholder="Select Kitchen Types"
                      options={mealCategory}
                      className="discover__form-input"
                    />
                  </div> */}
                  <a
                    onClick={() => this.generatePlan()}
                    className="btn-default btn-default-red planMyMealButton"
                    href="#"
                  >
                    Plan My Meal
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="section-header">
              <h1 style={{ color: "#fff" }} className="section-header__title">
                Create New Meal Plan:
                <a
                  style={{ float: "right" }}
                  onClick={() => this.setState({ nextStep: true })}
                  className="btn-default btn-default-red"
                  href="#"
                >
                  Next Step
                </a>
              </h1>

              <p className="section-header__description">
                <b>Step 1:</b> Select one or more Kitchen types:{" "}
              </p>
            </div>

            <div className="services__box">
              <div className="row">
                {kitchenTypes.map((name, i) => {
                  return (
                    <div
                      key={i}
                      style={{ maxWidth: "14%" }}
                      className="col-xl-2 col-md-2 col-sm-6"
                    >
                      <a
                        onClick={() => this.handleKitchenTypeChange(name.value)}
                        href="#"
                        style={{
                          background: kitchenTypeArray.includes(name.value)
                            ? "#fb646f"
                            : "#f8f9fa66"
                        }}
                        className="services-post"
                      >
                        <div className="services-post__content">
                          <img
                            style={{
                              width: "75%",
                              borderRadius: "50%",
                              minHeight: "63px"
                            }}
                            src={name.img}
                          />
                          <h3
                            style={{
                              color: kitchenTypeArray.includes(name.value)
                                ? "#fff"
                                : "#fb646f"
                            }}
                            className="services-post__title"
                          >
                            {name.label}
                          </h3>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default withRouter(Advanced);
