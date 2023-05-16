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

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
    @Query(value = "select reu.user.idUser from room_exam_users reu where reu.room.id = ?1")
    List<Long> getUserIds(Long roomId);
}
