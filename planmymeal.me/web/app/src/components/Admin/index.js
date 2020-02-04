import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Modal from "react-responsive-modal";
import Select from "react-select";

const rp = require("request-promise");

const categories = [
  { value: "5cc80659ef366c111ccdea3f", label: "American" },
  { value: "5cc80dc5476a8e3a045aec45", label: "Danish" },
  { value: "5cc815b59959e31cc8b635cd", label: "Indian" },
  { value: "5cc815c69959e31cc8b635ce", label: "Italian" },
  { value: "5cc815cf9959e31cc8b635cf", label: "Japanese" },
  { value: "5cc815d79959e31cc8b635d0", label: "Chinese" },
  { value: "5cc815e29959e31cc8b635d1", label: "Sushi" },
  { value: "5cc815ea9959e31cc8b635d2", label: "Thai" },
  { value: "5cc81f7ab2bd3c2c4c666478", label: "Grill" },
  { value: "5cc81fdfb2bd3c2c4c666479", label: "Greek" },
  { value: "5cc82004b2bd3c2c4c66647a", label: "Lebanese" },
  { value: "5cc82031b2bd3c2c4c66647b", label: "Mexican" },
  { value: "5cc820cfb2bd3c2c4c66647c", label: "Turkish" },
  { value: "5cc8210bb2bd3c2c4c66647d", label: "Vegan" },
  { value: "5cc8211ab2bd3c2c4c66647e", label: "Vegetarian" },
  { value: "5cc821dab2bd3c2c4c66647f", label: "Vietnamese" },
  { value: "5cc822a2b2bd3c2c4c666480", label: "French" },
  { value: "5cc822e3b2bd3c2c4c666481", label: "Moroccan" },
  { value: "5cc82427b2bd3c2c4c666482", label: "German" }
];

export class Admin extends Component {
  constructor() {
    super();
    this.state = {
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

  onOpenModal = (id, event) => {
    event.preventDefault();
    this.setState({
      open: {
        [id]: true
      }
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  "";
  handleChange = name => value => {
    if (!value) {
      return;
    }
    this.setState({
      [name]: value.value
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
                          <a target="_" href={meal.link}>
                            <button
                              onClick={this.onOpenModal.bind(this, meal._id)}
                              style={{ cursor: "pointer", color: "#fff" }}
                              className="btn-default btn-default-red"
                            >
                              Edit
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Modal
                      open={open[meal._id]}
                      onClose={this.onCloseModal}
                      center
                    >
                      <div className="container">
                        <div className="col-xs-1 text-center">
                          <Select
                            menuPlacement="auto"
                            name="category"
                            value={category ? category.value : ""}
                            onChange={this.handleChange("category")}
                            placeholder="Select Categories"
                            options={categories}
                            className="discover__form-input"
                          />
                          <button
                            onClick={() => this.saveNewCategory(meal._id)}
                            style={{ cursor: "pointer", color: "#fff" }}
                            className="btn-default btn-default-red"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Modal>
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
