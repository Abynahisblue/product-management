package com.e_commerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "product")
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private String image;
    private Double price;
    private Integer quantity;

    @DBRef
    private CategoryNode subcategoryNode;
}
