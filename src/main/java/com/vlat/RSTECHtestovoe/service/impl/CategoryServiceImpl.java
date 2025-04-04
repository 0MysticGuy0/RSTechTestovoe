package com.vlat.RSTECHtestovoe.service.impl;

import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.repository.CategoryRepository;
import com.vlat.RSTECHtestovoe.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    @Override
    public Optional<Category> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Category save(Category category) {
        return repository.save(category);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
