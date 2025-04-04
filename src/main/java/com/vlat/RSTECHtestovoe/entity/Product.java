package com.vlat.RSTECHtestovoe.entity;


import com.vlat.RSTECHtestovoe.entity.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    @Column(name = "image_path")
    private String imagePath;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "creation_date")
    private Date creationDate;

    @Enumerated(value = EnumType.STRING)
    private ProductStatus status;
}
