package com.example.exam_online.repository;

import com.example.exam_online.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);

    @Query(value = "select u.idUser from User u where u.username = ?1 and u.isActive = true")
    Integer existsByUsername1(String username);

    @Query(value = "select u.idUser from User u where u.email = ?1 and u.isActive = true")
    Integer existsByEmail1(String email);

    @Query(value = "select reu.user.idUser from room_exam_users reu where reu.room.id = ?1")
    List<Long> getUserIds(Long roomId);
}
