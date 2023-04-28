package com.example.exam_online.controller;

import com.example.exam_online.dto.RoomDto;
import com.example.exam_online.dto.UserDto;
import com.example.exam_online.entity.Room;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.request.RoomRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.IRoomService;
import com.example.exam_online.service.RoomService;
import com.example.exam_online.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
public class RoomController {
	@Autowired
	private IRoomService<Room> roomService;
	@Autowired
	private UserService userService;
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping("/getARoom/{roomId}")
	public ResponseHandler<Room> getRoom (@PathVariable Long roomId) {
		Room room = roomService.getRoomById(roomId);
		ResponseHandler<Room> responseHandler = new ResponseHandler<Room>("successfully found room",
				HttpStatus.OK.value(), room);
		return responseHandler;
	}
	
	@PostMapping("/addARoom")
	public ResponseHandler<RoomDto> addRoom (@RequestBody RoomRequest roomRequest) throws CustomException {
		Room room = new Room();
		room.setName(roomRequest.getRoomName());
		room.setSeconds(roomRequest.getTime());
		room.setStartAt(roomRequest.getStartAt());
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
	
}