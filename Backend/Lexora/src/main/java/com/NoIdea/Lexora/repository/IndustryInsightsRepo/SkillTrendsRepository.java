//package com.NoIdea.Lexora.repository.IndustryInsightsRepo;
//
//
//import com.NoIdea.Lexora.model.IndustryInsightsModel.SkillTrends;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//public interface SkillTrendsRepository extends JpaRepository<SkillTrends, Long> {
//
//    List<SkillTrends> findByCountry(String country);
//
//    List<SkillTrends> findByJobRole(String jobRole);
//
//    @Query("SELECT s FROM SkillTrends s WHERE s.date LIKE CONCAT(:year, '%')")
//    List<SkillTrends> findByYear(@Param("year") String year);
//
//    @Query("SELECT s FROM SkillTrends s WHERE " +
//            "(:country IS NULL OR s.country = :country) AND " +
//            "(:jobRole IS NULL OR s.jobRole = :jobRole) AND " +
//            "(:year IS NULL OR s.date LIKE CONCAT(:year, '%'))")
//    List<SkillTrends> findSkillsWithFilters(
//            @Param("country") String country,
//            @Param("jobRole") String jobRole,
//            @Param("year") String year);
//}