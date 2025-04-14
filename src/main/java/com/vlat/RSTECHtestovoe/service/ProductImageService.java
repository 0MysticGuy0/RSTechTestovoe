package com.vlat.RSTECHtestovoe.service;

import org.springframework.web.multipart.MultipartFile;

public interface ProductImageService {
    String saveImage(MultipartFile image);
}
