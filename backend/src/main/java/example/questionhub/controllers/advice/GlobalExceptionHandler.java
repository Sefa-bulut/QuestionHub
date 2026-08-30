package example.questionhub.controllers.advice;

import example.questionhub.dto.error.ErrorDetails;
import example.questionhub.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDetails> userNotFoundExceptionHandler(UserNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorDetails);
    }

    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<ErrorDetails> postNotFoundExceptionHandler(PostNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorDetails);
    }

    @ExceptionHandler(DuplicateLikeException.class)
    public ResponseEntity<ErrorDetails> duplicateLikeExceptionHandler(DuplicateLikeException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(errorDetails);
    }

    @ExceptionHandler(LikeNotFoundException.class)
    public ResponseEntity<ErrorDetails> likeNotFoundExceptionHandler(LikeNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorDetails);
    }

    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<ErrorDetails> commentNotFoundExceptionHandler(CommentNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorDetails);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorDetails> invalidCredentialsExceptionHandler(InvalidCredentialsException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorDetails);
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<ErrorDetails> duplicateUsernameExceptionHandler(DuplicateUsernameException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(errorDetails);
    }

    @ExceptionHandler(RefreshTokenNotFoundException.class)
    public ResponseEntity<ErrorDetails> refreshTokenNotFoundExceptionHandler(RefreshTokenNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(errorDetails);
    }

    @ExceptionHandler(RefreshTokenExpiredException.class)
    public ResponseEntity<ErrorDetails> refreshTokenExpiredExceptionHandler(RefreshTokenExpiredException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(errorDetails);
    }
}
