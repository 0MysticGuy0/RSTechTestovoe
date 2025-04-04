package com.vlat.RSTECHtestovoe.repository;

import com.vlat.RSTECHtestovoe.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
