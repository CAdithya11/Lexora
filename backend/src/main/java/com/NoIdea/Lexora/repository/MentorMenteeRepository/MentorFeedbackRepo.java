package com.NoIdea.Lexora.repository.MentorMenteeRepository;

import com.NoIdea.Lexora.model.MentorMenteeModel.MentorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MentorFeedbackRepo extends JpaRepository<MentorFeedback,Long> {

    @Query(value = "SELECT * FROM mentor_feedback WHERE mentor_id = :mentorId",nativeQuery = true)
    List<MentorFeedback> findAllByMentorId(@Param("mentorId")Long mentorId);
}
