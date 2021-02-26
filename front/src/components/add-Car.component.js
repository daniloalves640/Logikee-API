import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class AddCar extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);

    this.onChangeBrand = this.onChangeBrand.bind(this);
    
    this.onChangeModel = this.onChangeModel.bind(this);

    this.onChangeYear = this.onChangeYear.bind(this);

    this.onChangeColor = this.onChangeColor.bind(this);

    this.onChangePrice = this.onChangePrice.bind(this);

    this.saveCar = this.saveCar.bind(this);

    this.newCar = this.newCar.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        name: "",
        brand: "",
        model: "",
        year: "",
        color: "",
        price: "",
        published: false
      },
      message: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeBrand(e) {
    this.setState({
      brand: e.target.value
    });
  }
  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }
  onChangeYear(e) {
    this.setState({
      year: e.target.value
    });
  }
  onChangeColor(e) {
    this.setState({
      color: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  saveCar() {
    var data = {
      name: this.state.name,
      brand: this.state.brand,
      model: this.state.model,
      year: this.state.year,
      color: this.state.color,
      price: this.state.price
    };

    CarDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          brand: response.data.brand,
          model: response.data.model,
          year: response.data.year,
          color: response.data.color,
          price: response.data.price,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCar() {
    this.setState({
      id: null,
      name: "",
      brand: "",
      model: "",
      year: "",
      color: "",
      price: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>New car added successfully!</h4>
            <button className="btn btn-success" onClick={this.newCar}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                required
                value={this.state.brand}
                onChange={this.onChangeBrand}
                name="brand"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                required
                value={this.state.year}
                onChange={this.onChangeYear}
                name="year"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                className="form-control"
                id="color"
                required
                value={this.state.color}
                onChange={this.onChangeColor}
                name="color"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>
            
            <button onClick={this.saveCar} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}