package com.example.exam_online.entity;

import com.example.exam_online.dto.IEntityResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table
@Entity(name = "rooms")
@AllArgsConstructor
@Getter
@Setter
public class Room extends EntityAudit implements IEntityResponse {
	@Column(name = "invitation_code")
	private String code;
	
	@Column(name ="name")
	private String name;
	@Column(name = "startAt")
	private LocalDateTime startAt;
	//This is time to calculate end time
	@Column(name = "time")
	private int seconds;
	
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private RoomStatus status = RoomStatus.OPEN;
	
	@ManyToOne
	@JoinColumn(name = "exam_id")
	private Exam exam;
	
	public Room() {
		code = generateCode();
	}
	private String generateCode() {
		return RandomStringUtils.randomAlphabetic(4);
	}
	
	public enum RoomStatus {
		OPEN,
		CLOSE
	}
}
