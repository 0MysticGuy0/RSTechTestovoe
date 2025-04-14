package com.vlat.RSTECHtestovoe.controller;


import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.service.CategoryService;
import com.vlat.RSTECHtestovoe.utils.RequestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1.0/category/")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public ResponseEntity<RequestResponse> createCategory(@RequestBody Category category){
        service.save(category);
        return ResponseEntity.ok(RequestResponse.of("Successfully created!"));
    }

    @GetMapping
    public ResponseEntity<RequestResponse> getCategories(@RequestParam("page_num") int pageNumber, @RequestParam("page_size") int pageSize){
        return ResponseEntity.ok(
                RequestResponse.of(
                        service.getAll(PageRequest.of(pageNumber-1,pageSize))   )   );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<RequestResponse> deleteCategory(@PathVariable("id")Long id){
        service.deleteById(id);
        return ResponseEntity.ok(RequestResponse.of("Category was deleted"));
    }

    @PutMapping
    public ResponseEntity<RequestResponse> editCategory(@RequestBody Category category){
        var result = service.update(category);
        if(result.isEmpty()){
            return ResponseEntity.badRequest().body(RequestResponse.of("There is no Category with ID" + category.getId() + "!"));
        }
        return ResponseEntity.ok(RequestResponse.of("Successfully updated the category!", result.get()));
    }

}
