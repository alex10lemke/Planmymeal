import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";
const rp = require("request-promise");
const jwt = require("jsonwebtoken");

export class Callback extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    jwt.verify(this.props.match.params.id, "mySecret", async (err, decoded) => {
      if (err) {
        console.log("Invalid Token", err);
      } else {
        const userRes = await rp(
          `http://localhost:4000/api/user/${decoded.id}`
        );
        const userParsed = await JSON.parse(userRes);
        console.log(userParsed.user._id);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userParsed.user._id,
            userName: userParsed.user.userName,
            image: userParsed.user.image,
            loginId: userParsed.user.loginId,
            provider: userParsed.user.provider,
            jwtToken: this.props.match.params.id
          })
        );
        window.location.replace("http://localhost:3000");
      }
    });
  }

  render() {
    return (
      <>
        <section
          style={{ backgroundImage: "url(../upload/bg_v2.jpg)" }}
          className="trending-places"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6" />
              <div
                style={{
                  marginLeft: "6%",
                  marginTop: "100px",
                  marginBottom: "100px"
                }}
                className="col-lg-4 col-md-6"
              >
                <ClipLoader
                  sizeUnit={"px"}
                  size={150}
                  color={"#ffffff"}
                  loading={true}
                />
              </div>
              <div className="col-lg-4 col-md-6" />
            </div>
          </div>
        </section>
      </>
    );
  }
}
