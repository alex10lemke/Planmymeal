import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";

const rp = require("request-promise");

export class Plan extends Component {
  constructor() {
    super();
    this.state = {
      meals: []
    };
  }

  getUrl = url => {
    let firstPart = url.split("(")[1];
    let secondPart = firstPart.substring(0, firstPart.length - 2);
    return secondPart;
  };

  componentDidMount() {
    var day_of_week = dayjs().day();
    var list = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];
    var sorted_list = list
      .slice(day_of_week)
      .concat(list.slice(0, day_of_week));
    console.log(sorted_list);

    rp(`http://localhost:4000/api/plan/${this.props.match.params.id}`).then(
      res => {
        let result = JSON.parse(res);
        let newArray = [];
        sorted_list.forEach(day => {
          result.plan.weekDays.forEach(element => {
            if (day === element.weekDay) {
              newArray.push(element);
            }
          });
        });
        this.setState({ meals: newArray });
      }
    );
  }

  render() {
    const { meals } = this.state;
    return (
      <>
        <section
          style={{ backgroundImage: "url(../upload/bg_v2.jpg)" }}
          className="trending-places"
        >
          <div className="container">
            <div className="section-header">
              <h1 style={{ color: "#fff" }} className="section-header__title">
                Your weekly plan:
              </h1>
              <p
                style={{ color: "#fff" }}
                className="section-header__description"
              >
                Try out a more advanced meal plan by signing up.
              </p>
            </div>
            <div className="row">
              {meals.length === 0 ? (
                <ClipLoader
                  sizeUnit={"px"}
                  size={52}
                  color={"#ffc107"}
                  loading={true}
                />
              ) : (
                <div
                  style={{ marginBottom: "20px" }}
                  className="col-xl-6 col-md-6"
                >
                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="item"
                  >
                    <div className="place-post">
                      <div
                        style={{ marginBottom: "-35px" }}
                        className="place-post__gal-box"
                      >
                        <img
                          className="place-post__image"
                          src={this.getUrl(meals[0].mealId.image)}
                          alt="place-image"
                        />
                        <span
                          style={{ textTransform: "capitalize" }}
                          className="place-post__rating"
                        >
                          {meals[0].weekDay}
                        </span>
                        <a className="place-post__like" href="#">
                          <i className="fa fa-heart-o" aria-hidden="true" />
                        </a>
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
                          <a href="#">{meals[0].mealId.name}</a>
                        </h2>
                        <a target="_" href={meals[0].mealId.link}>
                          <button
                            style={{ cursor: "pointer", color: "#fff" }}
                            className="btn-default btn-default-red"
                          >
                            Go to Recipe
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {meals === null ? (
                <ClipLoader
                  sizeUnit={"px"}
                  size={52}
                  color={"#ffc107"}
                  loading={true}
                />
              ) : (
                meals.slice(1).map((meal, i) => (
                  <div
                    key={i}
                    style={{ marginBottom: "20px" }}
                    className="col-xl-3 col-md-3"
                  >
                    <div style={{ width: "250px" }} className="item">
                      <div className="place-post">
                        <div
                          style={{ marginBottom: "-35px" }}
                          className="place-post__gal-box"
                        >
                          <img
                            className="place-post__image"
                            src={this.getUrl(meal.mealId.image)}
                            alt="place-image"
                          />
                          <span
                            style={{ textTransform: "capitalize" }}
                            className="place-post__rating"
                          >
                            {meal.weekDay}
                          </span>
                          <a className="place-post__like" href="#">
                            <i className="fa fa-heart-o" aria-hidden="true" />
                          </a>
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
                            <a href="#">{meal.mealId.name}</a>
                          </h2>
                          <a target="_" href={meal.mealId.link}>
                            <button
                              style={{ cursor: "pointer", color: "#fff" }}
                              className="btn-default btn-default-red"
                            >
                              Go to Recipe
                            </button>
                          </a>
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
