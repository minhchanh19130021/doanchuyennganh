package com.example.exam_online.service;

import com.example.exam_online.dto.CustomUserDetails;
import com.example.exam_online.entity.User;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private JavaMailSender mailSender;

    public User findById(Long id) throws CustomException {

        Optional<User> user = userRepository.findById(id);
        return user.map(u -> u
        ).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "not found user by id"));
    }
    @Transactional
    public UserDetails loadUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + userId)
        );

        return new CustomUserDetails(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }

    public List<User> findUserByIds(List<Long> userIds) {
        return userRepository.findAllById(userIds);
    }

    public void register(User user) throws MessagingException, UnsupportedEncodingException {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        String randomCode = RandomString.make(64);
        user.setActiveCode(randomCode);
        user.setActive(false);
        user.setRole("st");

        userRepository.save(user);

        sendVerificationEmail(user);
    }

    private void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {

        String fromAddress = "thithunlu@edu.com.vn";
        String toAddress = user.getEmail();
        String senderName = "NLU Exam Online";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "NLU Exam Online.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL =  "http://localhost:8080/api/auth/verify?email="+user.getEmail()+"&code=" + user.getActiveCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public ResponseEntity<?> confirmEmail(String confirmationCode, String email) {
        if(confirmationCode != null)
        {
            User user = userRepository.findByEmail(email);
            user.setActive(true);
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
