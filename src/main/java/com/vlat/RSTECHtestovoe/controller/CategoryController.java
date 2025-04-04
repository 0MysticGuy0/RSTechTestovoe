package com.vlat.RSTECHtestovoe.controller;


import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/category/")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public ResponseEntity<HttpStatus> createCategory(@RequestBody Category category){
        service.save(category);
        return ResponseEntity.ok().build();
    }

    //TODO: возвращать ошибку если нет переданного объекта
    @GetMapping
    public ResponseEntity<Page<Category>> getCategories(@RequestParam("page_num") int pageNumber, @RequestParam("page_size") int pageSize){
        return ResponseEntity.ok(service.getAll(PageRequest.of(pageNumber-1,pageSize)));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id")Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Category> editCategory(@RequestBody Category category){
        return ResponseEntity.ok(service.save(category));
    }

}
