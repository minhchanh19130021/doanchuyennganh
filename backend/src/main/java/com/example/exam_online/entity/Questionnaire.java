package com.example.exam_online.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "questionnaires")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Questionnaire extends EntityAudit {
	@Column(name ="code")
	private long code;

	@ManyToOne
	@JoinColumn(name = "id_question")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@JsonBackReference
	private Question questions;

	@ManyToOne
	@JoinColumn(name = "id_exam")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@JsonBackReference
	private Exam exam;

}
