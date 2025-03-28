package com.NoIdea.Lexora.service.User.serviceImpl;

import com.NoIdea.Lexora.model.User.UserEntity;
import com.NoIdea.Lexora.repository.User.UserEntityRepository;
import com.NoIdea.Lexora.service.User.UserEntityService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserEntityServiceImpl implements UserEntityService {
    private final UserEntityRepository userEntityRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntityServiceImpl(UserEntityRepository userEntityRepository, PasswordEncoder passwordEncoder) {
        this.userEntityRepository = userEntityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity createUser(UserEntity userEntity) {
        UserEntity userEntity1 = userEntity;
        userEntity1.setPassword(passwordEncoder.encode(userEntity1.getPassword()));
        return userEntityRepository.save(userEntity);
    }

    @Override
    public UserEntity findUserById(Long id) {
        try {
            return userEntityRepository.findById(id).orElse(null);

        }catch (Exception e){
            return null;
        }

    }

    @Override
    public UserEntity updateProfileImage(UserEntity userEntity) {
        return userEntityRepository.save(userEntity);
    }

    @Override
    public UserEntity updateUserProfile(UserEntity userEntity) {
        return userEntityRepository.save(userEntity);
    }

    @Override
    public String changePassword(String currentPassword,String newPassword, Long id) {
        UserEntity user = findUserById(id);
        if(passwordEncoder.matches(currentPassword,user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPassword));
            userEntityRepository.save(user);
            return "Successfully Changed Password";
        }else{
            return "Failed to Change Password";
        }
    }

    @Override
    public String updateProfessionalDetails(UserEntity userEntity, Long id) {
        UserEntity user = findUserById(id);
        user.setOccupation(userEntity.getOccupation());
        user.setCompany(userEntity.getCompany());
        user.setExperience(userEntity.getExperience());
        user.setCareer(userEntity.getCareer());
        try {
            userEntityRepository.save(user);
            return "Successfully Updated";
        }catch (Exception e){
            return "Failed to update. Try again later";
        }
    }

    @Override
    public String createVerificationRequest(Long id, MultipartFile certificate) throws IOException {
        UserEntity user = findUserById(id);
        user.setDegree_certificate(certificate.getBytes());
        try {
            userEntityRepository.save(user);
            return "Successfully Send the mentor verification request";
        }catch (Exception e){
            return "Failed to send";
        }
    }
}
