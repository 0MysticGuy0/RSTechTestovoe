package com.vlat.RSTECHtestovoe.service.impl;

import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.repository.ProductRepository;
import com.vlat.RSTECHtestovoe.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    @Override
    public Optional<Product> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return repository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
