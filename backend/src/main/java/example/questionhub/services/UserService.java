package example.questionhub.services;

import example.questionhub.entities.User;
import example.questionhub.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createOneUser(User user) {
        return userRepository.save(user);
    }

    public User getOneUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateOneUser(Long userId, User user) {
        Optional<User> currentUser = userRepository.findById(userId);
        if (currentUser.isPresent()) {
            User updatedUser = currentUser.get();
            updatedUser.setUserName(user.getUserName());
            updatedUser.setPassword(user.getPassword());
            return userRepository.save(updatedUser);
        } else {
            return null;
        }
    }

    public void deleteOneUser(Long userId) {
        userRepository.deleteById(userId);
    }

}
