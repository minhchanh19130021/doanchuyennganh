package com.example.exam_online.repository;

import com.example.exam_online.entity.Room;
import com.example.exam_online.entity.RoomExamUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomExamUserRepository extends JpaRepository<RoomExamUser, Long> {
}
