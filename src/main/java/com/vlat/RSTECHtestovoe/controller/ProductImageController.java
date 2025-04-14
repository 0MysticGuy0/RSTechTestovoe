package com.vlat.RSTECHtestovoe.controller;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1.0/product-image/")
@RequiredArgsConstructor
public class ProductImageController {

    @GetMapping
    public ResponseEntity<byte[]> getProductImage(@RequestParam("imagePath") String imagePath){
        Path path = Path.of(imagePath);
        if(Files.exists(path)){
            try(FileInputStream in = new FileInputStream(path.toString())){
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", Files.probeContentType(path));
                return new ResponseEntity<>(in.readAllBytes(), headers, HttpStatus.OK);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
