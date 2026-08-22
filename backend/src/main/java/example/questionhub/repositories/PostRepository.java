package example.questionhub.repositories;

import example.questionhub.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);

    long countByUserId(Long userId);

    @Query(value = """
            SELECT COUNT(*)
            FROM post
            JOIN post_like
            ON post.id = post_like.post_id
            WHERE post.user_id = :userId
            """, nativeQuery = true)
    long countLikesReceivedByUserId(@Param("userId") Long userId);

    @Query(value = """
            SELECT COUNT(*)
            FROM post
            JOIN comment
            ON post.id = comment.post_id
            WHERE post.user_id = :userId
            """, nativeQuery = true)
    long countCommentsReceivedByUserId(@Param("userId") Long userId);
}
