import React, { Component } from "react";

export class About extends Component {
  render() {
    return (
      <section className="about">
        <div className="container">
          <div className="about__box">
            <div className="about__box-line">
              <div className="row" />
              <div className="col-lg-8" />
              <div className="article-post">
                <span className="article-post__excerpt">
                  A few words about us
                </span>
                <h1 className="article-post__title">
                  Best Meal Planner with recipies in One Place
                </h1>
                <p className="article-post__description">
                  We are a team devoted to create the best meal planner the
                  world has yet seen! Even the mother of dragons would be amazed
                  by the intellegence and science behind our meal planner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
