package com.e_commerce.model;

import lombok.Getter;

@Getter
public class CategoryTree {

    private CategoryNode root;

    public CategoryTree() {
        this.root = null;
    }

    public void addCategory(String categoryName) {
        root = addCategoryRecursive(root, categoryName);
    }

    private CategoryNode addCategoryRecursive(CategoryNode node, String categoryName) {
        if (node == null) {
            return new CategoryNode(categoryName);
        }

        if (categoryName.compareTo(node.getCategory()) < 0) {
            node.setLeft(addCategoryRecursive(node.getLeft(), categoryName));
        } else if (categoryName.compareTo(node.getCategory()) > 0) {
            node.setRight(addCategoryRecursive(node.getRight(), categoryName));
        }
        return node;
    }

    public void removeCategory(String categoryName) {
        root = removeCategoryRecursive(root, categoryName);
    }

    private CategoryNode removeCategoryRecursive(CategoryNode node, String categoryName) {
        if (node == null) {
            return null;
        }

        if (categoryName.compareTo(node.getCategory()) < 0) {
            node.setLeft(removeCategoryRecursive(node.getLeft(), categoryName));
        } else if (categoryName.compareTo(node.getCategory()) > 0) {
            node.setRight(removeCategoryRecursive(node.getRight(), categoryName));
        } else {
            // Node to be deleted found
            if (node.getLeft() == null) {
                return node.getRight();
            } else if (node.getRight() == null) {
                return node.getLeft();
            }

            // Node with two children: Get the inorder successor
            node.setCategory(findMin(node.getRight()).getCategory());
            node.setRight(removeCategoryRecursive(node.getRight(), node.getCategory()));
        }
        return node;
    }

    private CategoryNode findMin(CategoryNode node) {
        while (node.getLeft() != null) {
            node = node.getLeft();
        }
        return node;
    }

    public CategoryNode searchCategory(String categoryName) {
        return searchCategoryRecursive(root, categoryName);
    }

    private CategoryNode searchCategoryRecursive(CategoryNode node, String categoryName) {
        if (node == null || node.getCategory().equals(categoryName)) {
            return node;
        }

        if (categoryName.compareTo(node.getCategory()) < 0) {
            return searchCategoryRecursive(node.getLeft(), categoryName);
        } else {
            return searchCategoryRecursive(node.getRight(), categoryName);
        }
    }
}

