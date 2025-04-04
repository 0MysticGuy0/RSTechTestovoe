package com.vlat.RSTECHtestovoe.service;

import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.utils.ProductFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProductService {
    Optional<Product> getById(Long id);
    Product save(Product product);
    void deleteById(Long id);
    Page<Product> getAllByCategory(Long categoryId, Pageable pageable);
    Page<Product> getAllByFilter(ProductFilter productFilter, Pageable pageable);
    void deleteCategory(Long categoryId);
}
