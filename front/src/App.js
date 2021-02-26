import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCar from "./components/add-Car.component";
import Car from "./components/car.component";
import CarList from "./components/cars-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/cars"} className="navbar-brand">
            Logikee
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cars"} className="nav-link">
                Car Workshop
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/cars/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cars"]} component={CarList} />
            <Route exact path="/cars/add" component={AddCar} />
            <Route path="/cars/:id" component={Car} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
