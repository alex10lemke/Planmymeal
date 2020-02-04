import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/index";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import { Plan } from "./components/Plan";
import { Callback } from "./components/Callback";
import { Admin } from "./components/Admin";
import Advanced from "./components/Advanced";
import Account from "./components/Account";
import { About } from "./components/About";
import { Discover } from "./components/Discover";

export const Routes = () => (
  <BrowserRouter>
    <div id="container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={Advanced} />
        <Route path="/admin" component={Admin} />
        <Route path="/myplans" component={Account} />
        <Route path="/plan/:id" component={Plan} />
        <Route path="/callback/:id" component={Callback} />
        <Route path="/about" component={About} />
        <Route path="/discover" component={Discover} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
