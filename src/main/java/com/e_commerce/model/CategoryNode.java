package com.e_commerce.model;

import com.e_commerce.middleware.CustomSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Document(collection = "categories")
public class CategoryNode {

    @Id
    private String id;
    private String category;

    @JsonSerialize(using = CustomSerializer.class)
    private CategoryNode left;

    @JsonSerialize(using = CustomSerializer.class)
    private CategoryNode right;

    @DBRef
    private List<Product> products;

    public CategoryNode(String category) {
        this.category = category;
        this.left = null;
        this.right = null;
        this.products = new ArrayList<Product>();
    }

    public void addCategory(String newCategory) {
        if (newCategory.compareTo(this.category) < 0) {
            if (left == null) {
                left = new CategoryNode(newCategory);
            } else {
                left.addCategory(newCategory);
            }
        } else if (newCategory.compareTo(this.category) > 0) {
            if (right == null) {
                right = new CategoryNode(newCategory);
            } else {
                right.addCategory(newCategory);
            }
        }
    }

    public void addSubcategory(String newCategory, boolean isLeft) {
        if (isLeft) {
            if (left == null) {
                left = new CategoryNode(newCategory);
            } else {
                left.addSubcategory(newCategory, isLeft);
            }
        } else {
            if (right == null) {
                right = new CategoryNode(newCategory);
            } else {
                right.addSubcategory(newCategory, isLeft);
            }
        }
    }

    public CategoryNode findCategoryNode(String searchCategory) {
        if (searchCategory.equals(this.category)) {
            return this;
        } else if (left != null && left.containsCategory(searchCategory)) {
            return left.findCategoryNode(searchCategory);
        } else if (right != null) {
            return right.findCategoryNode(searchCategory);
        }
        return null;
    }


    public boolean containsCategory(String searchCategory) {
        if (searchCategory.equals(this.category)) {
            return true;
        } else if (searchCategory.compareTo(this.category) < 0) {
            return left != null && left.containsCategory(searchCategory);
        } else {
            return right != null && right.containsCategory(searchCategory);
        }
    }
    public void addProduct(Product product) {
        products.add(product);
    }

    public void removeProduct(Product product) {
        products.remove(product);
    }
}