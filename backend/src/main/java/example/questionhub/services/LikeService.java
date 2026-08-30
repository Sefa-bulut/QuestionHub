package example.questionhub.services;

import example.questionhub.dto.request.CreateLikeRequest;
import example.questionhub.dto.response.LikeResponse;
import example.questionhub.entities.Like;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
import example.questionhub.exceptions.DuplicateLikeException;
import example.questionhub.exceptions.LikeNotFoundException;
import example.questionhub.exceptions.PostNotFoundException;
import example.questionhub.exceptions.UserNotFoundException;
import example.questionhub.repositories.LikeRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<LikeResponse> getAllLikes(Optional<Long> userId, Optional<Long> postId) {
        List<Like> list;
        if (userId.isPresent() && postId.isPresent()) {
            list = likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            list = likeRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            list = likeRepository.findByPostId(postId.get());
        } else {
            list = likeRepository.findAll();
        }
        return list.stream().map(like -> new LikeResponse(like)).collect(Collectors.toList());
    }

    public Like getOneLike(Long likeId) {
        return likeRepository.findById(likeId)
                .orElseThrow(() -> new LikeNotFoundException("Like not found with id: " + likeId));
    }

    public LikeResponse createOneLike(CreateLikeRequest createLikeRequest) {
        User currentUser = userService.getOneUser(createLikeRequest.getUserId());
        Post currentPost = postService.getOnePost(createLikeRequest.getPostId());
        if (currentUser != null && currentPost != null) {
            Like like = new Like();
            like.setUser(currentUser);
            like.setPost(currentPost);
            try {
                return new LikeResponse(likeRepository.save(like));
            } catch (DataIntegrityViolationException ex) {
                throw new DuplicateLikeException("Mevcut kullanıcı bu posta zaten beğeni yaptı!");
            }
        } else {
            throw new PostNotFoundException("User or Post not found!");
        }
    }

    public void deleteOneLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
