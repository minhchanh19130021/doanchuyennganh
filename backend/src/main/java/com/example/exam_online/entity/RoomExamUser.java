package com.example.exam_online.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Table
@Entity(name = "room_exam_users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomExamUser {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@ManyToOne
	private User user;
	@ManyToOne
	private Room room;
	@ManyToOne
	private Result result;
	
}
