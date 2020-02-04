import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__up-part">
            <div className="row">
              <div className="col-md-4">
                <div className="footer__widget text-widget">
                  <h2 className="footer__widget-title-white">About</h2>

                  <p className="footer__widget-description">
                    PlanMyMeal creates personalized meal plans based on your
                    food preferences.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer__widget subscribe-widget">
                  <h2 className="footer__widget-title-white">Subscribe</h2>
                  <p className="footer__widget-description">
                    Be notified about new Features & Recipes.
                  </p>
                  <form className="footer__subscribe-form">
                    <input
                      className="footer__subscribe-input"
                      type="text"
                      name="email-sub"
                      id="email-sub"
                      placeholder="Enter your Email"
                    />
                    <button className="footer__subscribe-button" type="submit">
                      <i
                        className="la la-arrow-circle-o-right"
                        aria-hidden="true"
                      />
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer__widget text-widget">
                  <h2 className="footer__widget-title-white">Contact Info</h2>
                  <p className="footer__widget-description">
                    Aalborg <br />
                    PlanMyMealMe@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__down-part">
            <div className="row">
              <div className="col-md-7">
                <p className="footer__copyright">
                  © Copyright 2019 - All Rights Reserved
                </p>
              </div>
              <div className="col-md-5">
                <ul className="footer__social-list">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a className="google" href="#">
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
