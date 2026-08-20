package example.questionhub.services;

import example.questionhub.dto.request.LoginUserRequest;
import example.questionhub.dto.request.RegisterUserRequest;
import example.questionhub.dto.response.AuthResponse;
import example.questionhub.entities.Role;
import example.questionhub.entities.User;
import example.questionhub.repositories.UserRepository;
import example.questionhub.security.util.JwtUtil;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(LoginUserRequest loginUserRequest) {
        User user = userRepository.findByUserName(loginUserRequest.getUserName())
                .orElseThrow(() -> new RuntimeException("Invalid username or password!"));

        if (!passwordEncoder.matches(loginUserRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password!");
        }

        //Generate token
        String token = "Bearer " + jwtUtil.generateToken(user);

        //Generate AuthResponse
        AuthResponse response = new AuthResponse();
        response.setUserId(user.getId());
        response.setUserName(user.getUserName());
        response.setAvatarId(user.getAvatarId());
        response.setAbout(user.getAbout());
        response.setAccessToken(token);
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

        //Generate AuthResponse
        AuthResponse response = new AuthResponse();
        response.setUserId(returnUser.getId());
        response.setUserName(returnUser.getUserName());
        response.setAccessToken(null); // ileride burada da bir token oluşturup dönülebilir
        response.setResponseMessage("User successfully registered!");
        return response;
    }
}
