package com.NoIdea.Lexora.model.RoadMapModel;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Getter
@Setter
@Document(collection = "roadmaps")
public class Roadmap {

    @Id
    private String id;
    private Integer rId;
    private String jobName;
    private List<MainText> mainText;

    // Default constructor for Spring Data
    public Roadmap() {}

    // Constructor with fields
    public Roadmap(Integer rId, String jobName, List<MainText> mainText) {
        this.rId = rId;
        this.jobName = jobName;
        this.mainText = mainText;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getrId() {
        return rId;
    }

    public void setrId(Integer rId) {
        this.rId = rId;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public List<MainText> getMainText() {
        return mainText;
    }

    public void setMainText(List<MainText> mainText) {
        this.mainText = mainText;
    }

    // Inner class for MainText
    public static class MainText {
        private String mainTextId;
        private String mainTextName;
        private List<SubCategory> subCategory;

        // Default constructor
        public MainText() {}

        // Constructor with fields
        public MainText(String mainTextId, String mainTextName, List<SubCategory> subCategory) {
            this.mainTextId = mainTextId;
            this.mainTextName = mainTextName;
            this.subCategory = subCategory;
        }

        // Getters and Setters
        public String getMainTextId() {
            return mainTextId;
        }

        public void setMainTextId(String mainTextId) {
            this.mainTextId = mainTextId;
        }

        public String getMainTextName() {
            return mainTextName;
        }

        public void setMainTextName(String mainTextName) {
            this.mainTextName = mainTextName;
        }

        public List<SubCategory> getSubCategory() {
            return subCategory;
        }

        public void setSubCategory(List<SubCategory> subCategory) {
            this.subCategory = subCategory;
        }
    }

    // Inner class for SubCategory
    public static class SubCategory {
        private String subId;
        private String subName;
        private String subDescription;
        private List<SubStep> subSteps;

        // Default constructor
        public SubCategory() {}

        // Constructor with fields
        public SubCategory(String subId, String subName, String subDescription, List<SubStep> subSteps) {
            this.subId = subId;
            this.subName = subName;
            this.subDescription = subDescription;
            this.subSteps = subSteps;
        }

        // Getters and Setters
        public String getSubId() {
            return subId;
        }

        public void setSubId(String subId) {
            this.subId = subId;
        }

        public String getSubName() {
            return subName;
        }

        public void setSubName(String subName) {
            this.subName = subName;
        }

        public String getSubDescription() {
            return subDescription;
        }

        public void setSubDescription(String subDescription) {
            this.subDescription = subDescription;
        }

        public List<SubStep> getSubSteps() {
            return subSteps;
        }

        public void setSubSteps(List<SubStep> subSteps) {
            this.subSteps = subSteps;
        }
    }

    // Inner class for SubStep
    public static class SubStep {
        private String stepsId;
        private String stepsDescription;

        // Default constructor
        public SubStep() {}

        // Constructor with fields
        public SubStep(String stepsId, String stepsDescription) {
            this.stepsId = stepsId;
            this.stepsDescription = stepsDescription;
        }

        // Getters and Setters
        public String getStepsId() {
            return stepsId;
        }

        public void setStepsId(String stepsId) {
            this.stepsId = stepsId;
        }

        public String getStepsDescription() {
            return stepsDescription;
        }

        public void setStepsDescription(String stepsDescription) {
            this.stepsDescription = stepsDescription;
        }
    }
}
