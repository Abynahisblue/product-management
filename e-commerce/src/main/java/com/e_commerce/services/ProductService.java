package com.e_commerce.services;

import com.e_commerce.dto.ProductDTO;
import com.e_commerce.exception.ProductNotFoundException;
import com.e_commerce.model.Product;
import com.e_commerce.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {
    @Autowired
    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(product -> modelMapper.map(product, ProductDTO.class));
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return modelMapper.map(product, ProductDTO.class);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        productRepository.save(product);
        return productDTO;
    }

    public Page<Product> getProductsByName(String name, Pageable pageable) {
        return productRepository.findByNameContaining(name, pageable);
    }

    public List<Product> getProductsByPriceGreaterThan(double price, Sort sort) {
        return productRepository.findByPriceGreaterThan(price, sort);
    }

    @Transactional
    public Product updateProduct(Long productId, ProductDTO productDTO) {
        Optional<Product> existingProductOptional = productRepository.findById(productId);

        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setName(productDTO.getName());
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setImage(productDTO.getImage());
            existingProduct.setQuantity(productDTO.getQuantity());

            // Save the updated product in the product repository
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found: " + productId);
        }
    }


    public Product deleteProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.deleteById(id);
            return product.get();
        } else {
            throw new RuntimeException("Product not found");
        }
}
}
