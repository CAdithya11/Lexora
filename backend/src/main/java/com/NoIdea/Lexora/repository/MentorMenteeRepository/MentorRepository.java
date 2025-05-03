package com.NoIdea.Lexora.repository.MentorMenteeRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long>{
    
    @Query(value = "SELECT * FROM mentor WHERE email = ?1",nativeQuery = true)
    public List<Mentor> findByEmail(String email);
}
