package com.vlat.RSTECHtestovoe.controller;

import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.service.ProductService;
import com.vlat.RSTECHtestovoe.utils.ProductFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1.0/product/")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ResponseEntity<HttpStatus> createProduct(@RequestBody Product product){
        service.save(product);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }

    //TODO: возвращать ошибку если нет переданного объекта
    @PutMapping
    public ResponseEntity<Product> editProduct(@RequestBody Product product){
        return ResponseEntity.ok(service.save(product));
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(@RequestBody ProductFilter productFilter,
                                                     @RequestParam("page_num") int pageNumber, @RequestParam("page_size") int pageSize){
        return ResponseEntity.ok(
                service.getAllByFilter(productFilter, PageRequest.of(pageNumber-1, pageSize)));
    }

}
