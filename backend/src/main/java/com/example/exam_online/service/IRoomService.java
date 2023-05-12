package com.example.exam_online.service;

import com.example.exam_online.entity.EntityAudit;
import com.example.exam_online.entity.Room;

import java.util.List;

public interface IRoomService<T> extends  IEntityServiceSupport<T>{
	T getRoomById (Long roomId);

	List<T> getAllRooms ();
}
