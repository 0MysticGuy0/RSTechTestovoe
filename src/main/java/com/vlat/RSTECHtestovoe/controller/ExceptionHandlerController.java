package com.vlat.RSTECHtestovoe.controller;

import com.vlat.RSTECHtestovoe.utils.RequestResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler
    public ResponseEntity<RequestResponse> exceptionHandler(Exception exception){
        return ResponseEntity.badRequest().body(
                RequestResponse.of("Error! " + exception.getMessage())
        );
    }

}
