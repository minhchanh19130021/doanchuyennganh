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
public class RoomExamReqest {
	@JsonProperty("room_id")
	private Long roomId;
	
	@JsonProperty("code")
	private String code;

}
