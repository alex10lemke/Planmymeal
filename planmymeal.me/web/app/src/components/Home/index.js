import React, { Component } from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import { ClipLoader } from "react-spinners";
import { kitchenType as kitchenTypes, mealCategory } from "../../utils/Options";

const rp = require("request-promise");

class Home extends Component {
  constructor() {
    super();
    this.state = {
      kitchenType: null,
      category: null,
      open: false,
      isLoading: false
    };
  }

  handleKitchenTypeChange = () => value => {
    if (!value) {
      return;
    }
    if (value.length === 1) {
      console.log(value);
      this.setState({
        kitchenType: value[0].value
      });
    } else {
      let kitchenTypeArray = [];
      value.forEach((element, i) => {
        console.log(element);

        kitchenTypeArray.push(element.value);
      });
      this.setState({
        kitchenType: kitchenTypeArray
      });
    }
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

  generateTrialPlan = async () => {
    const waitFor = ms => new Promise(r => setTimeout(r, ms));
    var options = {
      method: "POST",
      uri: "http://localhost:4000/api/recipe/generateTrialPlan",

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
    const { kitchenType, category, open, isLoading } = this.state;
    return (
      <section className="discover">
        <div className="container">
          <p className="discover__description">
            Personalized meal plans based on your food preferences!
          </p>

          <h1 className="discover__title places-tab">
            Personalized Meal Planner
          </h1>

          <h1 className="discover__title events-tab">Discover great events.</h1>

          <ul className="discover__list">
            <li className="discover__list-item">
              <a className="place active-list" href="#">
                <i className="la la-compass" aria-hidden="true" />
                Preferences
              </a>
            </li>
          </ul>

          <form className="discover__form">
            <Select
              isMulti
              menuPlacement="top"
              minMenuHeight={100}
              name="kitchenType"
              onChange={this.handleKitchenTypeChange("kitchenType")}
              placeholder="Select Kitchen Types"
              options={kitchenTypes}
              className="discover__form-input"
            />
            <Select
              isMulti
              menuPlacement="top"
              minMenuHeight={100}
              name="category"
              onChange={this.handleCategoryChange("category")}
              placeholder="Select Meat Type"
              options={mealCategory}
              className="discover__form-input"
            />
            <button
              disabled={isLoading}
              type="button"
              style={{ cursor: "pointer" }}
              className="btn-default btn-default-red"
              onClick={() => this.generateTrialPlan()}
            >
              Plan My Meal
            </button>
          </form>
        </div>
        <Modal open={open} center>
          <div className="container">
            <div className="col-xs-3 text-center">
              <img style={{ width: "15%" }} src="/images/chef.svg" alt="" />
            </div>
            <div className="col-xs-1 text-center">
              <ClipLoader
                sizeUnit={"px"}
                size={42}
                color={"#ffc107"}
                loading={true}
              />
            </div>
            <div className="col-xs-1 text-center">
              <h2 style={{ color: "#495057" }}>
                Hang on, our chef is personalizing your meal plan!
              </h2>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}
export default withRouter(Home);
