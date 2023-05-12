package com.example.exam_online.dto;

import com.example.exam_online.entity.Room;
import com.example.exam_online.entity.User;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
	private Long roomId;
	private String roomName;
	private LocalDateTime startAt;
	private int time;
	
	private String code;

	private Room.RoomStatus status;
	private UserDto createdUser;
	private UserDto changedUser;
	
	
	public RoomDto (Room room, UserService userService, ModelMapper mapper) throws CustomException {
		Long createUserId = room.getAuditInfo().getCreateUserId();
		Long changeUserId = room.getAuditInfo().getChangeUserId();
		if(createUserId != null) {
			this.createdUser = mapper.map(userService.findById(createUserId), UserDto.class);
		}
		if(changeUserId != null) {
			this.changedUser = mapper.map(userService.findById(changeUserId), UserDto.class);
		}
		this.roomName = room.getName();
		this.startAt = room.getStartAt();
		this.time = room.getSeconds();
		this.roomId = room.getId();
		this.code = room.getCode();
	}
	
}
