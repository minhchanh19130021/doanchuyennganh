package com.example.exam_online.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity(name ="questions")
@Table
@Getter
@Setter
public class Question extends EntityAudit{

	private String content;
	@OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Answer> answers;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "questions")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@JsonBackReference
	private Set<Questionnaire> questionnaires;

	@Column(name ="result")
	private String result;
}
