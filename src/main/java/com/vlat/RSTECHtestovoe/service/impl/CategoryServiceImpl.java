package com.vlat.RSTECHtestovoe.service.impl;

import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.repository.CategoryRepository;
import com.vlat.RSTECHtestovoe.service.CategoryService;
import com.vlat.RSTECHtestovoe.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final ProductService productService;

    @Override
    public Optional<Category> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Page<Category> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Category save(Category category) {
        return repository.save(category);
    }

    @Override
    public void deleteById(Long id) {
        productService.deleteCategory(id);
        repository.deleteById(id);
    }
}
