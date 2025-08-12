package com.e_commerce.repository;

import com.e_commerce.model.CategoryNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryNode, Long> {
    Optional<CategoryNode> findByCategory(String category);
}
