package com.e_commerce.services;

import com.e_commerce.dto.ProductDTO;
import com.e_commerce.model.CategoryNode;
import com.e_commerce.model.Product;
import com.e_commerce.repository.CategoryRepository;
import com.e_commerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final S3Service s3Service;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository, S3Service s3Service) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.s3Service = s3Service;
    }

    public List<CategoryNode> getAllCategories() {
        return categoryRepository.findAll();
    }

    public CategoryNode addCategory(String category) {
        CategoryNode categoryNode = new CategoryNode(category);
        return categoryRepository.save(categoryNode);
    }

    public void removeCategory(String category) {
        Optional<CategoryNode> categoryNode = categoryRepository.findByCategory(category);
        if (categoryNode.isPresent()) {
            categoryRepository.delete(categoryNode.get());
        } else {
            throw new RuntimeException("Category not found: " + category);
        }
    }

    public CategoryNode searchCategory(String categoryName) {
        Optional<CategoryNode> categoryNode = categoryRepository.findByCategory(categoryName);
        return categoryNode.orElse(null);
    }

    @Transactional
    public CategoryNode addProductToCategory(String categoryName, ProductDTO productDTO, MultipartFile imageFile) {
        Optional<CategoryNode> categoryNodeOptional = categoryRepository.findByCategory(categoryName);

        if (categoryNodeOptional.isPresent()) {
            CategoryNode categoryNode = categoryNodeOptional.get();
            
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            // Upload image to S3 if provided
            if (imageFile != null && !imageFile.isEmpty()) {
                try {
                    String imageUrl = s3Service.uploadFile(imageFile);
                    product.setImage(imageUrl);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to upload image: " + e.getMessage());
                }
            }
            product.setQuantity(productDTO.getQuantity());
            product.setSubcategoryNode(categoryNode);

            productRepository.save(product);
            return categoryNode;
        } else {
            throw new RuntimeException("Category not found: " + categoryName);
        }
    }

    public List<Product> getProductsInCategory(String category) {
        Optional<CategoryNode> categoryNode = categoryRepository.findByCategory(category);
        if (categoryNode.isPresent()) {
            return categoryNode.get().getProducts();
        } else {
            throw new RuntimeException("Category not found: " + category);
        }
    }
}