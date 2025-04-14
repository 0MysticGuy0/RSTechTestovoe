package com.vlat.RSTECHtestovoe.service.impl;

import com.vlat.RSTECHtestovoe.service.ProductImageService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    @Value("${api.product-images.path}")
    private String IMAGES_PATH;

    @PostConstruct
    void init(){
        Path dirPath = Path.of(IMAGES_PATH);
        if(!Files.exists(dirPath)){
            try {
                Files.createDirectory(dirPath);
            } catch (IOException e) {
                System.out.println("-=-=-=-= ERROR SAVING IMAGE -1! CAN'T CREATE DIRECTORY: " + e.getMessage());
            }
        }
    }

    @Override
    public String saveImage(MultipartFile image) {
        String fileName = IMAGES_PATH + image.getOriginalFilename();
        Path path = Path.of(fileName);
        if(!Files.exists(path)){
            try {
                Files.createFile(path);
            } catch (IOException e) {
                System.out.println("-=-=-=-= ERROR SAVING IMAGE -2!" + e.getMessage());
            }
        }

        try(FileOutputStream fos = new FileOutputStream(fileName)){
            fos.write(image.getBytes());
        } catch (IOException e) {
            System.out.println("-=-=-=-= ERROR SAVING IMAGE -3!" + e.getMessage());
            return null;
        }
        System.out.println(fileName);
        return fileName;
    }
}
