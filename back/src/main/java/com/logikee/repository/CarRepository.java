package com.logikee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.logikee.model.CarModel;

public interface CarRepository extends MongoRepository<CarModel, String>
{
    List findByName(String title);
    //Optional<CarModel> findById(String name);
}