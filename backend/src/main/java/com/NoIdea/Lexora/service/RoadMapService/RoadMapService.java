package com.NoIdea.Lexora.service.RoadMapService;

import com.NoIdea.Lexora.model.RoadMapModel.Roadmap;
import com.NoIdea.Lexora.repository.RoadMapRepo.RoadMapRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoadMapService {

    private final RoadMapRepo roadmapRepository;

    @Autowired
    public RoadMapService(RoadMapRepo roadmapRepository) {
        this.roadmapRepository = roadmapRepository;
    }

    /**
     * Save a new roadmap
     */
    public Roadmap saveRoadmap(Roadmap roadmap) {
        // Check if a roadmap with the same rId already exists
        if (roadmapRepository.existsByrId(roadmap.getrId())) {
            throw new IllegalArgumentException("Roadmap with rId " + roadmap.getrId() + " already exists");
        }
        return roadmapRepository.save(roadmap);
    }

    /**
     * Get all roadmaps
     */
    public List<Roadmap> getAllRoadmaps() {
        return roadmapRepository.findAll();
    }

    /**
     * Get roadmap by MongoDB id
     */
    public Optional<Roadmap> getRoadmapById(String id) {
        return roadmapRepository.findById(id);
    }

    /**
     * Get roadmap by rId
     */
    public Optional<Roadmap> getRoadmapByrId(Integer rId) {
        return roadmapRepository.findByrId(rId);
    }

    /**
     * Update an existing roadmap
     */
    public Roadmap updateRoadmap(String id, Roadmap updatedRoadmap) {
        Optional<Roadmap> existingRoadmap = roadmapRepository.findById(id);

        if (existingRoadmap.isPresent()) {
            Roadmap roadmap = existingRoadmap.get();

            // Update fields if provided in updatedRoadmap
            if (updatedRoadmap.getJobName() != null) {
                roadmap.setJobName(updatedRoadmap.getJobName());
            }

            if (updatedRoadmap.getMainText() != null) {
                roadmap.setMainText(updatedRoadmap.getMainText());
            }

            // Keep the original rId
            return roadmapRepository.save(roadmap);
        } else {
            throw new RuntimeException("Roadmap not found with id: " + id);
        }
    }

    /**
     * Delete a roadmap by id
     */
    public void deleteRoadmap(String id) {
        if (!roadmapRepository.existsById(id)) {
            throw new RuntimeException("Roadmap not found with id: " + id);
        }
        roadmapRepository.deleteById(id);
    }

    /**
     * Find roadmaps by job name (partial match)
     */
    public List<Roadmap> findRoadmapsByJobName(String jobName) {
        return roadmapRepository.findByJobNameContainingIgnoreCase(jobName);
    }

    /**
     * Add a new main text to an existing roadmap
     */
    public Roadmap addMainText(Integer rId, Roadmap.MainText mainText) {
        Optional<Roadmap> optionalRoadmap = roadmapRepository.findByrId(rId);

        if (optionalRoadmap.isPresent()) {
            Roadmap roadmap = optionalRoadmap.get();
            roadmap.getMainText().add(mainText);
            return roadmapRepository.save(roadmap);
        } else {
            throw new RuntimeException("Roadmap not found with rId: " + rId);
        }
    }

    /**
     * Add a subcategory to a main text in a roadmap
     */
    public Roadmap addSubCategory(Integer rId, String mainTextId,
                                       Roadmap.SubCategory subCategory) {
        Optional<Roadmap> optionalRoadmap = roadmapRepository.findByrId(rId);

        if (optionalRoadmap.isPresent()) {
            Roadmap roadmap = optionalRoadmap.get();

            // Find the main text by id
            for (Roadmap.MainText mt : roadmap.getMainText()) {
                if (mt.getMainTextId().equals(mainTextId)) {
                    mt.getSubCategory().add(subCategory);
                    return roadmapRepository.save(roadmap);
                }
            }

            throw new RuntimeException("Main text not found with id: " + mainTextId);
        } else {
            throw new RuntimeException("Roadmap not found with rId: " + rId);
        }
    }

    /**
     * Add a sub-step to a subcategory in a roadmap
     */
    public Roadmap addSubStep(Integer rId, String mainTextId,
                                   String subId, Roadmap.SubStep subStep) {
        Optional<Roadmap> optionalRoadmap = roadmapRepository.findByrId(rId);

        if (optionalRoadmap.isPresent()) {
            Roadmap roadmap = optionalRoadmap.get();

            // Find the main text and subcategory by id
            for (Roadmap.MainText mt : roadmap.getMainText()) {
                if (mt.getMainTextId().equals(mainTextId)) {
                    for (Roadmap.SubCategory sc : mt.getSubCategory()) {
                        if (sc.getSubId().equals(subId)) {
                            sc.getSubSteps().add(subStep);
                            return roadmapRepository.save(roadmap);
                        }
                    }
                    throw new RuntimeException("Subcategory not found with id: " + subId);
                }
            }

            throw new RuntimeException("Main text not found with id: " + mainTextId);
        } else {
            throw new RuntimeException("Roadmap not found with rId: " + rId);
        }
    }
}