package com.vlat.RSTECHtestovoe.controller;

import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.service.ProductImageService;
import com.vlat.RSTECHtestovoe.service.ProductService;
import com.vlat.RSTECHtestovoe.utils.ProductFilter;
import com.vlat.RSTECHtestovoe.utils.RequestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1.0/product/")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final ProductImageService productImageService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<RequestResponse> createProduct(@RequestPart("product") Product product,
                                                         @RequestPart(name = "image", required = false) MultipartFile productImage){
        if(productImage != null){
            String imagePath = productImageService.saveImage(productImage);
            product.setImagePath(imagePath);
        }

        service.save(product);
        return ResponseEntity.ok(RequestResponse.of("Successfully created!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<RequestResponse> deleteProduct(@PathVariable("id") Long id){
        service.deleteById(id);
        return ResponseEntity.ok(RequestResponse.of("Product was deleted"));
    }

    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<RequestResponse> editProduct(@RequestPart("product") Product product,
                                                       @RequestPart(name = "image", required = false) MultipartFile productImage){
        if(productImage != null){
            String imagePath = productImageService.saveImage(productImage);
            product.setImagePath(imagePath);
        }
        var res = service.update(product);
        if(res.isEmpty()){
            return ResponseEntity.badRequest().body(RequestResponse.of("There is no Product with ID " + product.getId() + "!"));
        }
        return ResponseEntity.ok(RequestResponse.of("Successfully updated the product!", res.get()));
    }

    @GetMapping
    public ResponseEntity<RequestResponse> getProducts(@RequestParam(name = "categoryId", required = false) Long filterCategoryId, @RequestParam(name="name", required = false) String filterName,
                                                       @RequestParam(name = "minPrice", required = false) Double minPrice, @RequestParam(name = "maxPrice", required = false) Double maxPrice,
                                                     @RequestParam("page_num") int pageNumber, @RequestParam("page_size") int pageSize){
        ProductFilter filter = new ProductFilter(filterCategoryId, filterName.toLowerCase(), minPrice, maxPrice);
        return ResponseEntity.ok(
                RequestResponse.of(
                        service.getAllByFilter(filter, PageRequest.of(pageNumber-1, pageSize))
                ));
    }


}
