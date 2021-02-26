package com.logikee.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logikee.model.CarModel;
import com.logikee.repository.CarRepository;

@CrossOrigin("http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CarController {
    @Autowired
    CarRepository carRepository;
    
    @GetMapping("/cars")
    public ResponseEntity<List> getAllCars(@RequestParam(required = false) String carName)
    {
        try
        {
            List listOfCars = new ArrayList<>();
            if(carName == null || carName.isEmpty())
            {
                carRepository.findAll().forEach(listOfCars::add);
            }
            else
            {
                carRepository.findByName(carName).forEach(listOfCars::add);
            }

            if(listOfCars.isEmpty())
            {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(listOfCars, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/cars/{id}")
    public ResponseEntity getCarById(@PathVariable("id") String id)
    {
        try
        {
            Optional carOptional = carRepository.findById(id);

            return new ResponseEntity<>(carOptional.get(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/cars")
    public ResponseEntity addCarToLibrary(@RequestBody CarModel car)
    {
        try
        {
            CarModel createdCar = carRepository.save(new CarModel(car.getId(), car.getName(), car.getBrand(), car.getModel(), car.getYear(), car.getColor(),
                       car.getPrice()));
            return new ResponseEntity<>(createdCar, HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/cars/{id}")
    public ResponseEntity updateCar(@PathVariable("id") String id, @RequestBody CarModel car)
    {
        Optional carOptional = carRepository.findById(id);

        if(carOptional.isPresent())
        {
            CarModel updatedCar = (CarModel) carOptional.get();
            updatedCar.setName(car.getName());
            updatedCar.setBrand(car.getBrand());
            updatedCar.setModel(car.getModel());
            updatedCar.setYear(car.getYear());
            updatedCar.setColor(car.getColor());
            updatedCar.setPrice(car.getPrice());

            return new ResponseEntity<>(carRepository.save(updatedCar), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/cars/{id}")
    public ResponseEntity deleteCar(@PathVariable("id") String id)
    {
        try
        {
            carRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
