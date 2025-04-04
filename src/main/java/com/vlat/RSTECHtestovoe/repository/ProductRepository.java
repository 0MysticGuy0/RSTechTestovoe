package com.vlat.RSTECHtestovoe.repository;

import com.vlat.RSTECHtestovoe.entity.Category;
import com.vlat.RSTECHtestovoe.entity.Product;
import com.vlat.RSTECHtestovoe.utils.ProductFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("Select l from Product l where l.category.id = :categoryId")
    Page<Product> findAllByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("Select l from Product l where " +
            "(:#{#f.categoryId} IS NULL OR l.category.id = :#{#f.categoryId}) " +
            "AND ( :#{#f.name} IS NULL OR l.name LIKE CONCAT('%', :#{#f.name}, '%')) " +
            "AND (:#{#f.minPrice} IS NULL OR l.price >= :#{#f.minPrice}) " +
            "AND (:#{#f.maxPrice} IS NULL OR l.price <= :#{#f.maxPrice})")
    Page<Product> findAllByFilter(@Param("f") ProductFilter f, Pageable pageable);
}
