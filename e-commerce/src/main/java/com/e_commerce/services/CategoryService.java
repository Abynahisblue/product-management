package com.e_commerce.services;

import com.e_commerce.dto.ProductDTO;
import com.e_commerce.model.CategoryNode;
import com.e_commerce.model.CategoryTree;
import com.e_commerce.model.Product;
import com.e_commerce.repository.CategoryRepository;
import com.e_commerce.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryTree categoryTree;

    private final CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryTree = new CategoryTree();
    }
    public List<CategoryNode> getAllCategories() {
        return categoryRepository.findAll();
    }

    public CategoryNode addCategory(String category) {
        CategoryNode categoryNode = new CategoryNode(category);
        return categoryRepository.save(categoryNode);
    }
    public CategoryNode addSubcategory(String category, String subcategory, boolean isLeft) {
        Optional<CategoryNode> parentCategoryNodeOptional = categoryRepository.findByCategory(category);

        if (parentCategoryNodeOptional.isPresent()) {
            CategoryNode parentCategoryNode = parentCategoryNodeOptional.get();
            parentCategoryNode.addSubcategory(subcategory, isLeft);
            return categoryRepository.save(parentCategoryNode);
        } else {
            throw new RuntimeException("Parent category not found: " + category);
        }
    }
    public List<CategoryNode> getSubcategories(String category) {
        Optional<CategoryNode> categoryNodeOptional = categoryRepository.findByCategory(category);
        List<CategoryNode> subcategories = new ArrayList<>();

        if (categoryNodeOptional.isPresent()) {
            CategoryNode categoryNode = categoryNodeOptional.get();
            if (categoryNode.getLeft() != null) {
                subcategories.add(categoryNode.getLeft());
            }
            if (categoryNode.getRight() != null) {
                subcategories.add(categoryNode.getRight());
            }
        } else {
            throw new RuntimeException("Category not found: " + category);
        }

        return subcategories;
    }

    public List<Product> getProductsInSubcategory(String category, String subcategory) {
        Optional<CategoryNode> parentCategoryNodeOptional = categoryRepository.findByCategory(category);

        if (parentCategoryNodeOptional.isPresent()) {
            CategoryNode parentCategoryNode = parentCategoryNodeOptional.get();
            CategoryNode subcategoryNode = parentCategoryNode.findCategoryNode(subcategory);
            if (subcategoryNode != null) {
                return subcategoryNode.getProducts();
            } else {
                throw new RuntimeException("Subcategory not found: " + subcategory);
            }
        } else {
            throw new RuntimeException("Parent category not found: " + category);
        }
    }


    public void removeCategory(String category) {
        categoryTree.removeCategory(category);
    }

    public CategoryNode searchCategory(String categoryName) {
        return categoryTree.searchCategory(categoryName);
    }


    @Transactional
    public CategoryNode addProductToSubcategory(String parentCategory, String subcategory, ProductDTO productDTO) {
        Optional<CategoryNode> parentCategoryNodeOptional = categoryRepository.findByCategory(parentCategory);

        if (parentCategoryNodeOptional.isPresent()) {
            CategoryNode parentCategoryNode = parentCategoryNodeOptional.get();
            CategoryNode subcategoryNode = parentCategoryNode.findCategoryNode(subcategory);
            if (subcategoryNode != null) {
                // Convert ProductDTO to Product entity
                Product product = new Product();
                product.setName(productDTO.getName());
                product.setDescription(productDTO.getDescription());
                product.setPrice(productDTO.getPrice());
                product.setImage(productDTO.getImage());
                product.setQuantity(productDTO.getQuantity());

                // Save the product in the product repository
                product = productRepository.save(product);

                // Add the product to the subcategory
                subcategoryNode.addProduct(product);

                // Save the category node to persist the changes
                categoryRepository.save(parentCategoryNode);

                return subcategoryNode;
            } else {
                throw new RuntimeException("Subcategory not found: " + subcategory);
            }
        } else {
            throw new RuntimeException("Parent category not found: " + parentCategory);
        }
    }
    @Transactional
    public Product updateProductInSubcategory(String category, String subcategory, String _id, ProductDTO productDTO) {
        Optional<CategoryNode> parentCategoryNodeOptional = categoryRepository.findByCategory(category);

        if (parentCategoryNodeOptional.isPresent()) {
            CategoryNode parentCategoryNode = parentCategoryNodeOptional.get();
            CategoryNode subcategoryNode = parentCategoryNode.findCategoryNode(subcategory);

            if (subcategoryNode != null) {
                Optional<Product> existingProductOptional = productRepository.findById(_id);

                if (existingProductOptional.isPresent()) {
                    Product existingProduct = existingProductOptional.get();

                    // Check if the product belongs to the subcategory
                    if (!subcategoryNode.getProducts().contains(existingProduct)) {
                        throw new RuntimeException("Product does not belong to the specified subcategory: " + subcategory);
                    }

                    existingProduct.setName(productDTO.getName());
                    existingProduct.setDescription(productDTO.getDescription());
                    existingProduct.setPrice(productDTO.getPrice());
                    existingProduct.setImage(productDTO.getImage());
                    existingProduct.setQuantity(productDTO.getQuantity());

                    // Save the updated product in the product repository
                    productRepository.save(existingProduct);

                    // Save the category node to persist the changes
                    categoryRepository.save(parentCategoryNode);

                    return existingProduct;
                } else {
                    throw new RuntimeException("Product not found: " + _id);
                }
            } else {
                throw new RuntimeException("Subcategory not found: " + subcategory);
            }
        } else {
            throw new RuntimeException("Parent category not found: " + category);
        }
    }
    public void removeProductFromCategory(String category, Product product) {
        CategoryNode categoryNode = searchCategory(category);
        if (categoryNode != null) {
            categoryNode.removeProduct(product);
        } else {
            throw new RuntimeException("Category not found: " + category);
        }
    }

    public List<Product> getProductsInCategory(String category) {
        CategoryNode categoryNode = searchCategory(category);
        if (categoryNode != null) {
            return categoryNode.getProducts();
        } else {
            throw new RuntimeException("Category not found: " + category);
        }
    }
}
