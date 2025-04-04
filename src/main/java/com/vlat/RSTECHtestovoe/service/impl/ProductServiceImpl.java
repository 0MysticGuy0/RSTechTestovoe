package com.vlat.RSTECHtestovoe.service.impl;

import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.entity.enums.ProductStatus;
import com.vlat.RSTECHtestovoe.repository.ProductRepository;
import com.vlat.RSTECHtestovoe.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public Page<Product> getAllByCategory(Long categoryId, Pageable pageable) {
        return repository.findAllByCategoryId(categoryId, pageable);
    }

    @Override
    @Transactional
    public void deleteCategory(Long categoryId) {
        Page<Product> page = repository.findAllByCategoryId(categoryId, PageRequest.of(0, 100));
        deleteCategoryAt(page);
        while(page.hasNext()){
            page = repository.findAllByCategoryId(categoryId, page.nextPageable());
            deleteCategoryAt(page);
        }
    }

    private void deleteCategoryAt(Page<Product> productsPage){
        for(Product p: productsPage){
            p.setCategory(null);
            p.setStatus(ProductStatus.NON_ACTIVE);
        }
    }
}
