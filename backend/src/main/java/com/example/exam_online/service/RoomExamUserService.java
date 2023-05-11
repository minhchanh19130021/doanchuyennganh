package com.example.exam_online.service;

import com.example.exam_online.entity.RoomExamUser;
import com.example.exam_online.repository.RoomExamUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class RoomExamUserService implements IRoomExamUserService {
	@Autowired
	private RoomExamUserRepository roomExamUserRepository;
	
	@Override
	public RoomExamUser addUserToRoom (RoomExamUser roomExamUser) {
		RoomExamUser result = roomExamUserRepository.save(roomExamUser);
		return result;
	}
}
