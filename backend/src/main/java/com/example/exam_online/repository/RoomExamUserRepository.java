package com.example.exam_online.repository;

import com.example.exam_online.entity.Room;
import com.example.exam_online.entity.RoomExamUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomExamUserRepository extends JpaRepository<RoomExamUser, Long> {
    @Query(value = "select u from room_exam_users u where u.user.idUser = :userId and u.room.id = :roomId")
    Optional<RoomExamUser> isUserAllowedEnterRoom(long userId, long roomId);
}
