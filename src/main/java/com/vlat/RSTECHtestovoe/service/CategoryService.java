package com.vlat.RSTECHtestovoe.service;

import com.vlat.RSTECHtestovoe.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Optional<Category> getById(Long id);
    Page<Category> getAll(Pageable pageable);
    Category save(Category category);
    Optional<Category> update(Category category);
    void deleteById(Long id);
}
