package com.NoIdea.Lexora.repository.MentorMenteeRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long>{
    
}
