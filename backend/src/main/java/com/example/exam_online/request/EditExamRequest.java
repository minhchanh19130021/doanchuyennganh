package com.example.exam_online.request;

import com.example.exam_online.entity.Question;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
@Getter
@Setter
public class EditExamRequest {
    private long id;
    private String title;
    private List<Long> questionIdListToAdd;
    private List<Long> questionIdListToDelete;

}
