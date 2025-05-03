// public class RoadMapController {
    
// }
package com.NoIdea.Lexora.repository.RoadMapRepo;

import com.NoIdea.Lexora.model.RoadMapModel.Roadmap;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoadMapRepo extends MongoRepository<Roadmap, String> {

    // Find roadmap by rId
    Optional<Roadmap> findByrId(Integer rId);

    // Find roadmaps by job name
    List<Roadmap> findByJobNameContainingIgnoreCase(String jobName);

    // Check if a roadmap with given rId exists
    boolean existsByrId(Integer rId);

    // Find roadmaps that contain specific main text name
    List<Roadmap> findByMainTextMainTextNameContainingIgnoreCase(String mainTextName);

    // Custom query methods can be added here as needed
}