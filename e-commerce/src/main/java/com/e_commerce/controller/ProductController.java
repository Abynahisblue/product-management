package com.e_commerce.controller;

import com.e_commerce.dto.ProductDTO;
import com.e_commerce.model.Product;
import com.e_commerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public Page<ProductDTO> getAllProducts(
            @RequestParam int page,
            @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getAllProducts(pageable);
    }

    @GetMapping("/{id}")
    public ProductDTO getProductById(@RequestParam String id){
        return productService.getProductById(id);
    }

    @PostMapping()
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        return productService.createProduct(productDTO);
    }

    @GetMapping("/search")
    public Page<Product> searchProductsByName(
            @RequestParam String name,
            @RequestParam int page,
            @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getProductsByName(name, pageable);
    }

    @GetMapping("/price")
    public List<Product> getProductsByPrice(
            @RequestParam double price,
            @RequestParam String sortField,
            @RequestParam String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
        return productService.getProductsByPriceGreaterThan(price, sort);
    }
    @PutMapping("/updateProduct")
    public ResponseEntity<Product> updateProduct(
            @RequestParam String id,
            @RequestBody ProductDTO productDTO) {
        Product updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }


    @DeleteMapping("/{id}")
    public String deleteProduct(@RequestParam("id") String id){
        Product deletedProduct = productService.deleteProduct(id);
        if(deletedProduct != null){
            return "Product with" + deletedProduct + "is successfully deleted";
        }
        return "Product not found";
    }
}
