package example.questionhub.services;

import example.questionhub.dto.request.CreatePostRequest;
import example.questionhub.dto.request.UpdatePostRequest;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
import example.questionhub.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<Post> getAllPosts(Optional<Long> userId) {
        if (userId.isPresent()) {
            return postRepository.findByUserId(userId.get());
        } else {
            return postRepository.findAll();
        }
    }

    public Post getOnePost(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public Post createOnePost(CreatePostRequest createPostRequest) {
        User currentUser = userService.getOneUser(createPostRequest.getUserId());
        if (currentUser != null) {
            Post post = new Post();
            post.setTitle(createPostRequest.getTitle());
            post.setText(createPostRequest.getText());
            post.setUser(currentUser);
            return postRepository.save(post);
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
}
