package com.e_commerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Document(indexName = "product")
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
