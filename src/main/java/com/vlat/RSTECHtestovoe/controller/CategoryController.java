package com.vlat.RSTECHtestovoe.controller;


import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @GetMapping("category")
    public Page<Category> getCategories(@RequestParam("page_num") int pageNumber, @RequestParam("page_size") int pageSize){
        return  service.getAll(PageRequest.of(pageNumber,pageSize));
    }

    @DeleteMapping("category")
    public void deleteCategory(@RequestParam("id")Long id){
        service.deleteById(id);
        //TODO implement deleting (change at products at null and set inactive)
    }

}
