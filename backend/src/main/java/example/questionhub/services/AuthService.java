package example.questionhub.services;

import example.questionhub.dto.request.LoginUserRequest;
import example.questionhub.dto.request.RefreshTokenRequest;
import example.questionhub.dto.request.RegisterUserRequest;
import example.questionhub.dto.response.AuthResponse;
import example.questionhub.dto.response.RefreshTokenResponse;
import example.questionhub.entities.RefreshToken;
import example.questionhub.entities.Role;
import example.questionhub.entities.User;
import example.questionhub.repositories.UserRepository;
import example.questionhub.security.service.CustomUserDetails;
import example.questionhub.security.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    public AuthResponse login(LoginUserRequest loginUserRequest) {
        User user = userRepository.findByUserName(loginUserRequest.getUserName())
                .orElseThrow(() -> new RuntimeException("Invalid username or password!"));

        if (!passwordEncoder.matches(loginUserRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password!");
        }

        //Generate access token
        String token = "Bearer " + jwtUtil.generateToken(user);
        //Generate refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        //Generate AuthResponse
        AuthResponse response = new AuthResponse();
        response.setUserId(user.getId());
        response.setUserName(user.getUserName());
        response.setAvatarId(user.getAvatarId());
        response.setAbout(user.getAbout());
        response.setAccessToken(token);
        response.setRefreshToken(refreshToken.getToken());
        response.setResponseMessage("User successfully log in!");

        return response;
    }

    public AuthResponse register(RegisterUserRequest registerUserRequest) {
        Optional<User> user = userRepository.findByUserName(registerUserRequest.getUserName());

        if (user.isPresent()) {
            throw new RuntimeException("Username already in use!");
        }

        //Password encoding
        String encodedPassword = passwordEncoder.encode(registerUserRequest.getPassword());

        User userToSave = new User();
        userToSave.setUserName(registerUserRequest.getUserName());
        userToSave.setPassword(encodedPassword); // Hash'lenmiş password'u kaydet
        userToSave.setRole(Role.USER);

        User returnUser = userRepository.save(userToSave);

        //Generate access token
        String accessToken = "Bearer " + jwtUtil.generateToken(returnUser);
        //Generate refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(returnUser.getId());

        //Generate AuthResponse
        AuthResponse response = new AuthResponse();
        response.setUserId(returnUser.getId());
        response.setUserName(returnUser.getUserName());
        response.setAvatarId(0);
        response.setAbout(null);
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken.getToken());
        response.setResponseMessage("User successfully registered!");

        return response;
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();
        return refreshTokenService.findByToken(refreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map((token) -> {
                    String newAccessToken = jwtUtil.generateToken(token.getUser());
                    return new RefreshTokenResponse(
                            token.getToken(),
                            "Bearer " + newAccessToken,
                            "Access token refreshed successfully.");
                }).orElseThrow(() -> new RuntimeException("Invalid refresh token."));
    }

    public String logoutUser(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();

        if (refreshToken == null || refreshToken.isBlank())
            throw new RuntimeException("Refresh token is required");

        return refreshTokenService.findByToken(refreshToken)
                .map((token) -> {
                    refreshTokenService.deleteRefreshToken(token);
                    return "Logged out successfully.";
                }).orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }
}
