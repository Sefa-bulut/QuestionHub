package example.questionhub.services;

import example.questionhub.dto.request.UpdateUserRequest;
import example.questionhub.dto.response.UserStatsResponse;
import example.questionhub.entities.User;
import example.questionhub.repositories.PostRepository;
import example.questionhub.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public UserService(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
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

    public User updateOneUser(Long userId, UpdateUserRequest updateUserRequest) {
        Optional<User> currentUser = userRepository.findById(userId);
        if (currentUser.isPresent()) {
            User updatedUser = currentUser.get();
            updatedUser.setAvatarId(updateUserRequest.getAvatarId());
            updatedUser.setAbout(updateUserRequest.getAbout());
            return userRepository.save(updatedUser);
        } else {
            return null;
        }
    }

    public void deleteOneUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public UserStatsResponse getUserStats(Long userId) {
        Optional<User> currentUser = userRepository.findById(userId);
        if (currentUser.isPresent()) {
            long postCount = postRepository.countByUserId(userId);
            long likeCount = postRepository.countLikesReceivedByUserId(userId);
            long commentCount = postRepository.countCommentsReceivedByUserId(userId);
            UserStatsResponse userStatsResponse = new UserStatsResponse();
            userStatsResponse.setReceivedCommentCount(commentCount);
            userStatsResponse.setReceivedLikeCount(likeCount);
            userStatsResponse.setSharedPostCount(postCount);
            return userStatsResponse;
        }
        return null;
    }
}
