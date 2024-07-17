package com.e_commerce.controller;

import com.e_commerce.dto.ProductDTO;
import com.e_commerce.model.CategoryNode;
import com.e_commerce.model.Product;
import com.e_commerce.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryNode> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/add")
    public CategoryNode addCategory(@RequestParam String category) {
        return categoryService.addCategory(category);
    }
    @PostMapping("/addSubcategory")
    public CategoryNode addSubcategory(@RequestParam String category, @RequestParam String subcategory, @RequestParam boolean isLeft) {
        return categoryService.addSubcategory(category, subcategory, isLeft);
    }
    @DeleteMapping("/delete")
    public void removeCategory(@RequestParam String category) {
        categoryService.removeCategory(category);
    }

    @GetMapping("/search")
    public CategoryNode searchCategory(@RequestParam String categoryName) {
        return categoryService.searchCategory(categoryName);
    }


    @PostMapping("/addProductToSubcategory")
    public CategoryNode addProductToSubcategory(@RequestParam String category, @RequestParam String subcategory, @RequestBody ProductDTO product) {
        return categoryService.addProductToSubcategory(category, subcategory, product);
    }
    @PutMapping("/updateProduct")
    public ResponseEntity<Product> updateProductInSubcategory(
            @RequestParam String category,
            @RequestParam String subcategory,
            @RequestParam String id,
            @RequestBody ProductDTO productDTO) {
        Product updatedSubcategory = categoryService.updateProductInSubcategory(category, subcategory, id, productDTO);
        System.out.println("hello");
        return ResponseEntity.ok(updatedSubcategory);
    }

    @GetMapping("/subcategories")
    public List<CategoryNode> getSubcategories(@RequestParam String category) {
        return categoryService.getSubcategories(category);
    }

    @GetMapping("/products")
    public List<Product> getProductsInSubcategory(@RequestParam String category, @RequestParam String subcategory) {
        return categoryService.getProductsInSubcategory(category, subcategory);
    }
    @DeleteMapping("/removeProduct")
    public void removeProductFromCategory(@RequestParam String categoryName, @RequestBody Product product) {
        categoryService.removeProductFromCategory(categoryName, product);
    }

//    @GetMapping("/products")
//    public List<Product> getProductsInCategory(@RequestParam String categoryName) {
//        return categoryService.getProductsInCategory(categoryName);
//    }
}

