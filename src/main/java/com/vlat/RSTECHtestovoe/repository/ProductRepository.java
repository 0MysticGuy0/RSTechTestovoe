package com.vlat.RSTECHtestovoe.repository;

import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("Select l from Product where l.category.id = :categoryId")
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);
}
