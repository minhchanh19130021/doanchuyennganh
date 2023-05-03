package com.example.exam_online.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table
@Entity(name ="exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exam extends EntityAudit {
	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "EXAM_QUESTION", joinColumns = @JoinColumn(name = "exam_id"))
	@Column(name ="question_id")
	private Set<String> questions;

	@Column(name = "title")
	private String title;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
