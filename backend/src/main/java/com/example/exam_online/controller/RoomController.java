package com.example.exam_online.controller;

import com.example.exam_online.config.SecurityHelper;
import com.example.exam_online.dto.RoomDto;
import com.example.exam_online.entity.Room;
import com.example.exam_online.entity.RoomExamUser;
import com.example.exam_online.entity.User;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.request.RoomRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.IRoomService;
import com.example.exam_online.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@CrossOrigin
public class RoomController {
	@Autowired
	private IRoomService<Room> roomService;
	@Autowired
	private UserService userService;
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping("/getARoom/{roomId}")
	public ResponseHandler<Room> getRoom (@PathVariable Long roomId) {
		ResponseHandler<Room> responseHandler;
		try {
			Room room = roomService.getRoomById(roomId);
			responseHandler = new ResponseHandler<Room>("successfully found room",
					HttpStatus.OK.value(), room);
		} catch (Exception e) {
			responseHandler = new ResponseHandler<Room>("not found room with id: " + roomId,
					HttpStatus.NOT_FOUND.value(), null);
		}
		return responseHandler;
	}
	
	@PostMapping("/addARoom")
	public ResponseHandler<RoomDto> addRoom (@RequestBody RoomRequest roomRequest) throws CustomException {
		Room room = new Room();
		room.setName(roomRequest.getRoomName());
		room.setSeconds(roomRequest.getTime());
		room.setStartAt(roomRequest.getStartAt());
		room.setStatus(roomRequest.getStatus());
		Room result = roomService.createEntityAudit(room);
		ResponseHandler<RoomDto> responseHandler = new ResponseHandler<RoomDto>("successfully add a room",
				HttpStatus.OK.value(), new RoomDto(result, userService, mapper));
		return responseHandler;
	}
	
	@PutMapping("delete/{roomId}")
	public ResponseHandler<Room> removeRoom (@PathVariable Long roomId) {
		Room room = roomService.getRoomById(roomId);
		ResponseHandler<Room> responseHandler;
		if(room != null) {
			roomService.deleteEntityAudit(room);
			responseHandler = new ResponseHandler<>("successfully delete a room",
					HttpStatus.OK.value() , null);
		} else {
			responseHandler = new ResponseHandler<>("failed delete a room",
					HttpStatus.OK.value() , null);
		}
		return responseHandler;
	}

	@PutMapping("changeStatus/{roomId}")
	public ResponseHandler<Room> changeStatus(@PathVariable Long roomId, @RequestBody RoomRequest roomRequest) throws CustomException {
		Room room = roomService.getRoomById(roomId);
		ResponseHandler<Room> responseHandler;
		if(room != null) {
			room.setStatus(roomRequest.getStatus());
			roomService.updateEntityAudit(room);
			return responseHandler = new ResponseHandler<>("successfully update a room",
					HttpStatus.OK.value() , null);
		}
		else {
			return responseHandler = new ResponseHandler<>("Fail update a room",
					HttpStatus.NOT_FOUND.value(), null);
		}
	}
	
	@PostMapping("addUserToRoom/{roomId}")
	public ResponseHandler<RoomExamUser> addUserToRoom(@PathVariable Long roomId) {
		User user = SecurityHelper.currentUser();
		ResponseHandler responseHandler;
		Room room;
		try {
			room = roomService.getRoomById(roomId);
			RoomExamUser roomExamUser = new RoomExamUser();
			roomExamUser.setUser(user);
			roomExamUser.setRoom(room);
			responseHandler = new ResponseHandler<>("Add User to Room success",
					HttpStatus.OK.value() , null);
		}catch (Exception ex) {
			responseHandler = new ResponseHandler<>("Can not find room id : " + roomId,
					HttpStatus.NOT_FOUND.value() , null);
		}
		return responseHandler;
	}
	
	
}
