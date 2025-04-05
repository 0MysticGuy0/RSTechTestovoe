package com.vlat.RSTECHtestovoe.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestResponse implements Serializable {

    private String message;
    private Object body;

    public static RequestResponse of(String message, Object body){
        return new RequestResponse(message, body);
    }
    public static RequestResponse of(String message){
        return new RequestResponse(message, null);
    }
    public static RequestResponse of(Object body){
        return new RequestResponse(null, body);
    }

}
