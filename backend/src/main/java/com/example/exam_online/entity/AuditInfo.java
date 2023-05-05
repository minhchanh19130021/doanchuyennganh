package com.example.exam_online.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuditInfo {
	@Column(name = "create_user_id")
	private Long createUserId;
	@Column(name = "createDate")
	private LocalDateTime createDate;
	@Column(name = "change_user_id")
	private Long changeUserId;
	@Column(name = "changeDate")
	private LocalDateTime changeDate;

}
