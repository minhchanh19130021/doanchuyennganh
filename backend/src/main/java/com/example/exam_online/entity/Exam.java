package com.example.exam_online.entity;

import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Table
@Entity(name = "exams")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Exam extends EntityAudit {
    //	@ManyToOne
//	@JoinColumn(name = "questionnaire_id", referencedColumnName = "id", foreignKey=@ForeignKey(NO_CONSTRAINT))
//	private Questionnaire questionnaire;

    private String title;
    @OneToMany(mappedBy = "exam", cascade = {CascadeType.PERSIST})
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Questionnaire> questionnaires;
}
