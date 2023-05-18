package com.example.exam_online.controller;

import com.example.exam_online.config.SecurityHelper;
import com.example.exam_online.dto.RoomDto;
import com.example.exam_online.entity.AuditInfo;
import com.example.exam_online.entity.Room;
import com.example.exam_online.entity.RoomExamUser;
import com.example.exam_online.entity.User;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.request.LeaveRoomRequest;
import com.example.exam_online.request.RoomExamReqest;
import com.example.exam_online.request.RoomRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.ExamService;
import com.example.exam_online.service.IRoomService;
import com.example.exam_online.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;


@RestController
@RequestMapping("/room")
@CrossOrigin
public class RoomController {
    @Autowired
    private IRoomService<Room> roomService;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ExamService examService;

    @PutMapping("/{roomId}/leave")
    public ResponseHandler<String> leaveRoom(@PathVariable Long roomId, @RequestBody LeaveRoomRequest request) throws CustomException {
        ResponseHandler<String> responseHandler;
        Room room = roomService.getRoomById(roomId);
        if (room == null) {
            return responseHandler = new ResponseHandler<String>("Phòng thi không tồn tại",
                                                                 HttpStatus.NOT_FOUND.value(), null);
        }
        User user = userService.findById(request.getUserId());
        if (user == null) {
            return responseHandler = new ResponseHandler<String>("User không tồn tại",
                                                                 HttpStatus.NOT_FOUND.value(), null);
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endTime = room.getStartAt().plus(room.getSeconds(), ChronoUnit.SECONDS);
        if (now.isBefore(endTime)) {
            return responseHandler = new ResponseHandler<String>("Chưa hết thời gian làm bài",
                                                                 HttpStatus.OK.value(), null);
        }
        room.setStatus(Room.RoomStatus.DONE);
        roomService.updateEntityAudit(room);
        return responseHandler = new ResponseHandler<String>("Rời phòng thi thành công",
                                                             HttpStatus.OK.value(), null);
    }

    @GetMapping("/getARoom/{roomId}")
    public ResponseHandler<Room> getRoom(@PathVariable Long roomId) {
        ResponseHandler<Room> responseHandler;
        try {
            Room room = roomService.getRoomById(roomId);
            responseHandler = new ResponseHandler<Room>("successfully found room",
                                                        HttpStatus.OK.value(), room);
        } catch (Exception e) {
            responseHandler = new ResponseHandler<Room>("not found room with id: " + roomId,
                                                        HttpStatus.NOT_FOUND.value(), null);
        }
        return responseHandler;
    }

    @GetMapping("/getAllRoom")
    public ResponseHandler<List<Room>> getRooms() {
        ResponseHandler<List<Room>> responseHandler;
        try {
            List<Room> rooms = roomService.getAllRooms();
            responseHandler = new ResponseHandler<List<Room>>("successfully found room",
                                                              HttpStatus.OK.value(), rooms);
        } catch (Exception e) {
            responseHandler = new ResponseHandler<List<Room>>(e.getMessage(),
                                                              HttpStatus.NOT_FOUND.value(), null);
        }
        return responseHandler;
    }

    @PostMapping("/addARoom")
    public ResponseHandler<RoomDto> addRoom(@RequestBody RoomRequest roomRequest) throws CustomException {
        Room room = new Room();

        AuditInfo auditInfo = new AuditInfo(roomRequest.getUserId(), roomRequest.getStartAt(), roomRequest.getUserId(),
                                            roomRequest.getStartAt());
        room.setName(roomRequest.getRoomName());
        room.setSeconds(roomRequest.getTime());
        room.setStartAt(roomRequest.getStartAt());
        room.setStatus(roomRequest.getStatus());
        room.setAuditInfo(auditInfo);
        room.setExam(examService.findById(roomRequest.getExamId()));
        Room result = roomService.createEntityAudit(room);
        ResponseHandler<RoomDto> responseHandler = new ResponseHandler<RoomDto>(
                "successfully add a room",
                HttpStatus.OK.value(),
                new RoomDto(result, userService,
                            mapper));
        return responseHandler;
    }

    @PutMapping("delete/{roomId}")
    public ResponseHandler<Room> removeRoom(@PathVariable Long roomId) {
        Room room = roomService.getRoomById(roomId);
        ResponseHandler<Room> responseHandler;
        if (room != null) {
            roomService.deleteEntityAudit(room);
            responseHandler = new ResponseHandler<>("successfully delete a room",
                                                    HttpStatus.OK.value(), null);
        } else {
            responseHandler = new ResponseHandler<>("failed delete a room",
                                                    HttpStatus.OK.value(), null);
        }
        return responseHandler;
    }

    @PutMapping("changeStatus/{roomId}")
    public ResponseHandler<Room> changeStatus(@PathVariable Long roomId, @RequestBody RoomRequest roomRequest) throws CustomException {
        Room room = roomService.getRoomById(roomId);
        ResponseHandler<Room> responseHandler;
        if (room != null) {
            room.setStatus(roomRequest.getStatus());
            roomService.updateEntityAudit(room);
            return responseHandler = new ResponseHandler<>("successfully update a room",
                                                           HttpStatus.OK.value(), null);
        } else {
            return responseHandler = new ResponseHandler<>("Fail update a room",
                                                           HttpStatus.NOT_FOUND.value(), null);
        }
    }

    @PostMapping("/addUserToRoom")
    public ResponseHandler<RoomExamUser> addUserToRoom(@RequestBody RoomExamReqest roomExamReqest) throws CustomException {
        User user = SecurityHelper.currentUser();
        ResponseHandler responseHandler;
        Room room;
        try {
            room = roomService.getRoomById(roomExamReqest.getRoomId());
            if (!roomExamReqest.getCode().equals(room.getCode())) {
                return new ResponseHandler<>("Room code invalid: ",
                                             HttpStatus.BAD_REQUEST.value(), null);
            }
            if (!examService.isUserAllowedEnterRoom(user.getIdUser(), roomExamReqest.getRoomId())) {
                RoomExamUser roomExamUser = new RoomExamUser();
                roomExamUser.setUser(user);
                roomExamUser.setRoom(room);
                examService.saveRoomExamUser(roomExamUser);
            }
            responseHandler = new ResponseHandler<>("Add User to Room success",
                                                    HttpStatus.OK.value(), null);
        } catch (Exception ex) {
            responseHandler = new ResponseHandler<>("Can not find room id : " + roomExamReqest.getRoomId(),
                                                    HttpStatus.NOT_FOUND.value(), null);
        }
        return responseHandler;
    }


}
