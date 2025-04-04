package com.vlat.RSTECHtestovoe.utils;

import com.vlat.RSTECHtestovoe.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilter implements Serializable {

    private Long categoryId;
    private String name;
    private Double minPrice;
    private Double maxPrice;


    @Override
    public String toString() {
        return "ProductFilter{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                '}';
    }
}
