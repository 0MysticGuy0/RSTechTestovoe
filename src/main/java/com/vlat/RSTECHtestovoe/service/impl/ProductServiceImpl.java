package com.vlat.RSTECHtestovoe.service.impl;

import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.entity.enums.ProductStatus;
import com.vlat.RSTECHtestovoe.repository.ProductRepository;
import com.vlat.RSTECHtestovoe.service.ProductService;
import com.vlat.RSTECHtestovoe.utils.ProductFilter;
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
    @Transactional
    public Optional<Product> update(Product product) {
        var persistentProduct = getById(product.getId());
        if(persistentProduct.isEmpty()) return Optional.empty();
        return Optional.of(save(product));
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
    public Page<Product> getAllByFilter(ProductFilter productFilter, Pageable pageable) {
        return repository.findAllByFilter(productFilter, pageable);
    }

    @Override
    @Transactional
    public void deleteCategory(Long categoryId) {
        Page<Product> page = getAllByCategory(categoryId, PageRequest.of(0, 100));
        deleteCategoryAt(page);
        while(page.hasNext()){
            page = getAllByCategory(categoryId, page.nextPageable());
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
