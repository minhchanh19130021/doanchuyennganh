package com.example.exam_online.request;

import com.example.exam_online.entity.Room;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {
	
	@JsonProperty("room_name")
	private String roomName;

	@JsonProperty("create_user_id")
	private Long userId;

	@JsonProperty("start_at")
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDateTime startAt;
	
	@JsonProperty("time")
	private int time;

	@JsonProperty("status")
	private Room.RoomStatus status;
}
