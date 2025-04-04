package com.vlat.RSTECHtestovoe.repository;

import com.vlat.RSTECHtestovoe.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
