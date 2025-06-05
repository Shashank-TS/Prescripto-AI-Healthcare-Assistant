package com.hms.hospital_management_service.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.hospital_management_service.Model.User;
import com.hms.hospital_management_service.Repository.UserRepository;


@Service
public class UserService {

    
    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Long id) throws Exception {

        Optional<User> doctorbox = userRepo.findById(id);
        if (doctorbox.isPresent()) {
            User user = doctorbox.get();
            return user;
        } else {
            throw new Exception("user not found with id "+id);
        }
    }

    public User updateUser(User user, Long id) throws Exception {

        User oldUser = this.getUserById(id);

        oldUser.setFullname(user.getFullname());

        return userRepo.save(oldUser);
    }

    
    public void deleteById(Long id) {
        userRepo.deleteById(id);
    }
    
}
