package example.questionhub.services;

import example.questionhub.dto.request.CreateLikeRequest;
import example.questionhub.entities.Like;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
import example.questionhub.repositories.LikeRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final UserService userService;
    private final PostService postService;

    public LikeService(LikeRepository likeRepository, UserService userService, PostService postService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Like> getAllLikes(Optional<Long> userId, Optional<Long> postId) {
        if (userId.isPresent() && postId.isPresent()) {
            return likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            return likeRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            return likeRepository.findByPostId(postId.get());
        } else {
            return likeRepository.findAll();
        }
    }

    public Like getOneLike(Long likeId) {
        return likeRepository.findById(likeId).orElse(null);
    }

    public Like createOneLike(CreateLikeRequest createLikeRequest) {
        User currentUser = userService.getOneUser(createLikeRequest.getUserId());
        Post currentPost = postService.getOnePost(createLikeRequest.getPostId());
        if (currentUser != null && currentPost != null) {
            Like like = new Like();
            like.setUser(currentUser);
            like.setPost(currentPost);
            try {
                return likeRepository.save(like);
            } catch (DataIntegrityViolationException ex) {
                //throw DuplicateLikeException
                System.out.println("Mevcut kullanıcı bu posta zaten beğeni yaptı!");
                return null;
            }
        } else {
            return null;
        }
    }

    public void deleteOneLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
