package com.e_commerce.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private String image;
    private Double price;
    private Integer quantity;

    public ProductDTO() {
    }
    public ProductDTO(String id, String name, Double price, String description,String image, Integer quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.quantity = quantity;
    }

}
