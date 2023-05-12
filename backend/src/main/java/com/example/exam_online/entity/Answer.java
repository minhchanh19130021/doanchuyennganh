package com.example.exam_online.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Table
@Entity(name = "answers")
@Getter
@Setter
public class Answer extends EntityAudit {

	@ManyToOne
	@JoinColumn(name = "id_question")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@JsonBackReference
	private Question question;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "correct", columnDefinition="tinyint(1) default 1")
//	@Type(type = "org.hibernate.type.YesNoType")
	private boolean correct;
}
