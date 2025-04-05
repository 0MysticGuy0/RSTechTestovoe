package com.vlat.RSTECHtestovoe.controller;

import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.service.ProductService;
import com.vlat.RSTECHtestovoe.utils.ProductFilter;
import com.vlat.RSTECHtestovoe.utils.RequestResponse;
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
    public ResponseEntity<RequestResponse> createProduct(@RequestBody Product product){
        //TODO: get and save image from front (not required);
        service.save(product);
        return ResponseEntity.ok(RequestResponse.of("Successfully created!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<RequestResponse> deleteProduct(@PathVariable("id") Long id){
        service.deleteById(id);
        return ResponseEntity.ok(RequestResponse.of("Product was deleted"));
    }

    @PutMapping
    public ResponseEntity<RequestResponse> editProduct(@RequestBody Product product){
        var res = service.update(product);
        if(res.isEmpty()){
            return ResponseEntity.badRequest().body(RequestResponse.of("There is no Product with ID " + product.getId() + "!"));
        }
        return ResponseEntity.ok(RequestResponse.of("Successfully updated the product!", res.get()));
    }

    @GetMapping
    public ResponseEntity<RequestResponse> getProducts(@RequestBody ProductFilter productFilter,
                                                     @RequestParam("page_num") int pageNumber, @RequestParam("page_size") int pageSize){
        return ResponseEntity.ok(
                RequestResponse.of(
                        service.getAllByFilter(productFilter, PageRequest.of(pageNumber-1, pageSize))
                ));
    }


}
