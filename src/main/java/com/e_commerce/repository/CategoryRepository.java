package com.e_commerce.repository;

import com.e_commerce.model.CategoryNode;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<CategoryNode, String> {
    Optional<CategoryNode> findByCategory(String category);
}
