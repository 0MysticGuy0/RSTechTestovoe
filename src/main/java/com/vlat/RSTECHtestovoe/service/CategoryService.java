package com.vlat.RSTECHtestovoe.service;

import com.vlat.RSTECHtestovoe.entity.Category;

import java.util.Optional;

public interface CategoryService {
    Optional<Category> getById(Long id);
    Category save(Category category);
    void deleteById(Long id);
}
