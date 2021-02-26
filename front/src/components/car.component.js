import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    
    this.onChangeModel = this.onChangeModel.bind(this);

    this.onChangeBrand = this.onChangeBrand.bind(this);

    this.onChangeYear = this.onChangeYear.bind(this);

    this.onChangePrice = this.onChangePrice.bind(this);

    this.onChangeColor = this.onChangeColor.bind(this);

    this.getCar = this.getCar.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);

    this.state = {
      currentCar: {
        id: null,
        name: "",
        brand: "",
        color: "",
        model: "",
        year: "",
        price: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCar(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          name: name
        }
      };
    });
  }

  onChangeModel(e) {
    const model = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        model: model
      }
    }));
  }

  onChangeBrand(e) {
    const brand = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        brand: brand
      }
    }));
  }

  onChangeYear(e) {
    const year = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        year: year
      }
    }));
  }

  onChangeColor(e) {
    const color = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        color: color
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        price: price
      }
    }));
  }

  getCar(id) {
    CarDataService.get(id)
      .then(response => {
        this.setState({
          currentCar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCar.id,
      name: this.state.currentCar.name,
      brand: this.state.currentCar.brand,
      model: this.state.currentCar.model,
      color: this.state.currentCar.color,
      year: this.state.currentCar.year,
      price: this.state.currentCar.price,
      published: status
    };

    CarDataService.update(this.state.currentCar.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCar: {
            ...prevState.currentCar,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCar() {
    CarDataService.update(
      this.state.currentCar.id,
      this.state.currentCar
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Car updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCar() {    
    CarDataService.delete(this.state.currentCar.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cars')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCar: currentCar } = this.state;

    return (
      <div>
        {currentCar ? (
          <div className="edit-form">
            <h4>Car Workshop</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Car</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCar.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={currentCar.brand}
                  onChange={this.onChangeBrand}
                />
              </div>

              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={currentCar.model}
                  onChange={this.onChangeModel}
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  value={currentCar.year}
                  onChange={this.onChangeYear}
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Color</label>
                <input
                  type="number"
                  className="form-control"
                  id="color"
                  value={currentCar.color}
                  onChange={this.onChangeColor}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentCar.price}
                  onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentCar.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCar.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCar}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCar}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Select a car</p>
          </div>
        )}
      </div>
    );
  }
}
