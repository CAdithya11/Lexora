package com.NoIdea.Lexora.repository;

import com.NoIdea.Lexora.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification,Long> {
    @Query(value = "SELECT * FROM notification WHERE user_id = :recieverId", nativeQuery = true)
    List<Notification> findAllByReciever_id(@Param("recieverId") Long recieverId);
}
