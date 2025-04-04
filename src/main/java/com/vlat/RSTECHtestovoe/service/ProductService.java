package com.vlat.RSTECHtestovoe.service;

import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.entity.Product;

import java.util.Optional;

public interface ProductService {
    Optional<Product> getById(Long id);
    Product save(Product product);
    void deleteById(Long id);
}
