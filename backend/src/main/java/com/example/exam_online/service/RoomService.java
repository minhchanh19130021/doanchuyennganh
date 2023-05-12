package com.example.exam_online.service;

import com.example.exam_online.entity.Room;
import com.example.exam_online.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService extends AbstractEntityAuditService<Room> implements IRoomService<Room>{
	@Autowired
	RoomRepository roomRepository;

	@Override
	public Room getRoomById (Long roomId) {
		return roomRepository.findById(roomId).get();
	}
	
	@Override
	public List<Room> getAllRooms () {
		return roomRepository.findAll();
	}
	
	
	protected JpaRepository<Room, Long> getEntityRepository () {
		return roomRepository;
	}
}
