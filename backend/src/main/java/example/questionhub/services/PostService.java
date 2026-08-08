package example.questionhub.services;

import example.questionhub.dto.request.CreatePostRequest;
import example.questionhub.dto.request.UpdatePostRequest;
import example.questionhub.dto.response.PostResponse;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
import example.questionhub.repositories.LikeRepository;
import example.questionhub.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final LikeRepository likeRepository;

    public PostService(PostRepository postRepository, UserService userService, LikeRepository likeRepository) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.likeRepository = likeRepository;
    }

    public List<PostResponse> getAllPosts(Optional<Long> userId) {
        List<Post> list;
        if (userId.isPresent()) {
            list = postRepository.findByUserId(userId.get());
        } else {
            list = postRepository.findAll();
        }
        // use mapper to transform post to postresponse
        return list.stream().map((p) -> {
            long likeCount = likeRepository.countByPostId(p.getId());
            return new PostResponse(p, likeCount);
        }).collect(Collectors.toList());
    }

    public Post getOnePost(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public PostResponse createOnePost(CreatePostRequest createPostRequest) {
        User currentUser = userService.getOneUser(createPostRequest.getUserId());
        if (currentUser != null) {
            Post postToSave = new Post();
            postToSave.setTitle(createPostRequest.getTitle());
            postToSave.setText(createPostRequest.getText());
            postToSave.setUser(currentUser);
            return new PostResponse(postRepository.save(postToSave), 0);
        } else {
            return null;
        }
    }

    public void deleteOnePost(Long postId) {
        postRepository.deleteById(postId);
    }

    public Post updateOnePost(Long postId, UpdatePostRequest updatePostRequest) {
        Optional<Post> currentPost = postRepository.findById(postId);
        if (currentPost.isPresent()) {
            Post updatedPost = currentPost.get();
            updatedPost.setTitle(updatePostRequest.getTitle());
            updatedPost.setText(updatePostRequest.getText());
            postRepository.save(updatedPost);
            return updatedPost;
        } else {
            return null;
        }
    }

//    public PostResponse getOnePostResponse(Long postId) {
//        Post post = getOnePost(postId);
//        if (post != null)
//            return new PostResponse(post);
//        else
//            return null;
//    }
}
