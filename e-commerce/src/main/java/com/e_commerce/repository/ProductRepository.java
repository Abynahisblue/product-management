package com.e_commerce.repository;

import com.e_commerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface ProductRepository extends ElasticsearchRepository<Product, String> {
    @Query("{ 'name' : { $regex: ?0, $options: 'i' } }")
    Page<Product> findByNameContaining(String name, Pageable pageable);

    @Query("{ 'price' : { $gt: ?0 } }")
    List<Product> findByPriceGreaterThan(double price, Sort sort);
}
