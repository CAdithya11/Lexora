package com.NoIdea.Lexora.repository.IndustryInsightsRepo;


import com.NoIdea.Lexora.model.IndustryInsightsModel.JobTrends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobTrendsRepository extends JpaRepository<JobTrends, Long> {

    List<JobTrends> findByCountry(String country);

    List<JobTrends> findByJobRole(String jobRole);

    List<JobTrends> findByMainCategory(String mainCategory);

    List<JobTrends> findBySubCategory(String subCategory);

    @Query("SELECT j FROM JobTrends j WHERE j.date LIKE CONCAT(:year, '%')")
    List<JobTrends> findByYear(@Param("year") String year);

    @Query("SELECT j FROM JobTrends j WHERE " +
            "(:country IS NULL OR j.country = :country) AND " +
            "(:jobRole IS NULL OR j.jobRole = :jobRole) AND " +
            "(:mainCategory IS NULL OR j.mainCategory = :mainCategory) AND " +
            "(:subCategory IS NULL OR j.subCategory = :subCategory) AND " +
            "(:year IS NULL OR j.date LIKE CONCAT(:year, '%'))")
    List<JobTrends> findJobsWithFilters(
            @Param("country") String country,
            @Param("jobRole") String jobRole,
            @Param("mainCategory") String mainCategory,
            @Param("subCategory") String subCategory,
            @Param("year") String year);
}