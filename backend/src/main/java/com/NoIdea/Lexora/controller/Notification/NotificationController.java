package com.NoIdea.Lexora.controller.Notification;

import com.NoIdea.Lexora.Constant.CommonConstants;
import com.NoIdea.Lexora.dto.NotificationDTO.NotificationDTO;
import com.NoIdea.Lexora.model.Notification;
import com.NoIdea.Lexora.service.MentorMenteeService.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/{reciever_id}")
    public ResponseEntity<List<NotificationDTO>> findAllNotificationsByUser_id(@PathVariable Long reciever_id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(notificationService.findAllNotificationsByRecieverId(reciever_id));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping()
    public ResponseEntity<String> createNotification(@RequestBody Notification notification){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.createNotification(notification));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonConstants.InternalServerError);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateNotificationToReadStatus(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(notificationService.updateNotification(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonConstants.InternalServerError);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBYNotificationId(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(notificationService.deleteNotification(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonConstants.InternalServerError);
        }
    }
}
