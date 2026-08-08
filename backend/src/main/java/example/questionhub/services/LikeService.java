package example.questionhub.services;

import example.questionhub.dto.request.CreateLikeRequest;
import example.questionhub.dto.response.LikeResponse;
import example.questionhub.entities.Like;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
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
        return likeRepository.findById(likeId).orElse(null);
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
