package com.NoIdea.Lexora.model.IndustryInsightsModel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "JobData")
public class JobTrends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mainCategory;
    private String subCategory;
    private String jobRole;
    private String country;
    private String jobTrendingCount;
    private String date;
    private int minSalary;
    private int maxSalary;
    private int avgSalary;
}