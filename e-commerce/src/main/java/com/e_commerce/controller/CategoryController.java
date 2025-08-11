package com.e_commerce.controller;

import com.e_commerce.dto.ProductDTO;
import com.e_commerce.model.CategoryNode;
import com.e_commerce.model.Product;
import com.e_commerce.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @DeleteMapping("/delete")
    public void removeCategory(@RequestParam String category) {
        categoryService.removeCategory(category);
    }

    @GetMapping("/search")
    public CategoryNode searchCategory(@RequestParam String categoryName) {
        return categoryService.searchCategory(categoryName);
    }


    @PostMapping("/addProduct")
    public CategoryNode addProductToCategory(
            @RequestParam String category,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer quantity,
            @RequestParam(required = false) MultipartFile image) {
        
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(name);
        productDTO.setDescription(description);
        productDTO.setPrice(price);
        productDTO.setQuantity(quantity);
        
        return categoryService.addProductToCategory(category, productDTO, image);
    }

    @GetMapping("/category/products")
    public List<Product> getProductsInCategory(@RequestParam String categoryName) {
        return categoryService.getProductsInCategory(categoryName);
    }
}

