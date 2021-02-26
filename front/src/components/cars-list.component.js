import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { Link } from "react-router-dom";

export default class Carlist extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);

    this.retrieveCars = this.retrieveCars.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.removeAllCars = this.removeAllCars.bind(this);

    this.searchName = this.searchName.bind(this);

    this.state = {
      cars: [],
      currentCar: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveCars();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveCars() {
    CarDataService.getAll()
      .then(response => {
        this.setState({
          cars: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCars();
    this.setState({
      currentCar: null,
      currentIndex: -1
    });
  }

  setActiveCar(car, index) {
    this.setState({
      currentCar: car,
      currentIndex: index
    });
  }

  removeAllCars() {
    CarDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentCar: null,
      currentIndex: -1
    });

    CarDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          cars: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, cars, currentCar, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Car List</h4>

          <ul className="list-group">
            {cars &&
              cars.map((car, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCar(car, index)}
                  key={index}
                >
                  {car.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCars}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCar ? (
            <div>
              <h4>Car Workshop</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCar.name}
              </div>
              <div>
                <label>
                  <strong>Brand:</strong>
                </label>{" "}
                {currentCar.brand}
              </div>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentCar.model}
              </div>

              <div>
                <label>
                  <strong>Year:</strong>
                </label>{" "}
                {currentCar.year}
              </div>

              <div>
                <label>
                  <strong>Color:</strong>
                </label>{" "}
                {currentCar.color}
              </div>

              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentCar.price}
              </div>

              <div>
                <label>
                  <strong>Status: </strong>
                </label>{" "}
                {currentCar.published ? "Published" : "Pending"}
              </div>

              <Link
                to={`/cars/${currentCar.id}`}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
             
              <p>Select a car</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}