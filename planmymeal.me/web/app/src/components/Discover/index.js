import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Modal from "react-responsive-modal";
import Select from "react-select";
import { kitchenType as kitchenTypes } from "../../utils/Options";

const rp = require("request-promise");

const mealCategory = [
  { value: "okse", label: "Oksekød" },
  { value: "kylling", label: "Kylling" },
  { value: "svin", label: "Svinekød" },
  { value: "lam", label: "Lammekød" },
  { value: "fisk", label: "Fisk" }
];

const sideDishCategory = [
  { value: "kartofler", label: "Kartofler" },
  { value: "ris", label: "Ris" },
  { value: "bulgur", label: "Bulgur" },
  { value: "couscous", label: "Couscous" }
];

export class Discover extends Component {
  constructor() {
    super();
    this.state = {
      kitchentype: null,
      meals: [],
      open: false,
      category: null
    };
  }

  getUrl = url => {
    let firstPart = url.split("(")[1];
    let secondPart = firstPart.substring(0, firstPart.length - 2);
    return secondPart;
  };

  componentDidMount() {
    rp(`http://localhost:4000/api/recipe`).then(res => {
      let result = JSON.parse(res);
      console.log(result);
      this.setState({ meals: result.recipes });
    });
  }

  handleChange = name => value => {
    if (!value) {
      return;
    }
    if (value.length === 1) {
      console.log(value);
      console.log(name);
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

  SearchwFilters = async () => {
    var options = {
      method: "GET",
      uri: "http://localhost:4000/api/recipe/recipesWithFilters",
      body: {
        data: this.state.category
      },
      json: true // Automatically stringifies the body to JSON
    };
    rp(options).then(res => {
      console.log(res);
    });
  };

  saveNewCategory = async mealId => {
    var options = {
      method: "POST",
      uri: `http://localhost:4000/api/recipe/insertCategory/${mealId}`,
      body: {
        category: this.state.category
      },
      json: true // Automatically stringifies the body to JSON
    };
    this.setState({
      open: false,
      category: null
    });
    const res = await rp(options);
    console.log(res);
  };

  render() {
    const { meals, open, category } = this.state;
    return (
      <>
        <section
          style={{ backgroundImage: "url(../upload/bg_v2.jpg)" }}
          className="trending-places"
        >
          <div className="container">
            <div className="section-header">
              <h1 style={{ color: "#fff" }} className="section-header__title">
                All our Recipes
              </h1>
              <Select
                isMulti
                menuPlacement="auto"
                minMenuHeight={100}
                name="kitchenType"
                onChange={this.handleChange("kitchenType")}
                placeholder="Select Kitchen Types"
                options={kitchenTypes}
                className="discover__form-input"
              />
            </div>
            <button
              onClick={() => this.SearchwFilters()}
              className="btn-default btn-default-red"
            >
              Søg
            </button>

            <div className="row">
              {meals === null ? (
                <ClipLoader
                  sizeUnit={"px"}
                  size={52}
                  color={"#ffc107"}
                  loading={true}
                />
              ) : (
                meals.map((meal, i) => (
                  <div
                    key={i}
                    style={{ marginBottom: "20px" }}
                    className="col-xl-3 col-md-3"
                  >
                    <div style={{ width: "250px" }} className="item">
                      <div className="place-post">
                        <div
                          style={{ marginBottom: "-34px" }}
                          className="place-post__gal-box"
                        >
                          <a target="_" href={meal.link}>
                            <img
                              className="place-post__image"
                              src={this.getUrl(meal.image)}
                              alt="place-image"
                            />
                          </a>

                          {meal.categories.map(category => {
                            return (
                              <span
                                className="place-post__rating"
                                style={{ textTransform: "capitalize" }}
                              >
                                {category.name}
                              </span>
                            );
                          })}
                        </div>
                        <div
                          style={{
                            minHeight: "160px",
                            background: "#fff",
                            padding: "5px 12px"
                          }}
                          className="place-post__content"
                        >
                          <p className="place-post__info">
                            <i className="fa fa-clock-o" aria-hidden="true" />
                            <span className="open">Duration: </span>x Min
                          </p>
                          <h2
                            style={{
                              minHeight: "55px"
                            }}
                            className="place-post__title"
                          >
                            <a href="#">{meal.name}</a>
                          </h2>
                          <a target="_" href={meal.link} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Discover);
