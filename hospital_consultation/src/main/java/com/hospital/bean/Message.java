package com.hospital.bean;

import java.util.Date;

/**
 * Create by hupengbo on 2020/3/24 21:15
 */
public class Message {
    private int msgId;
    private int doctorId;
    private String patientId;
    private int mark;
    private String msg;
    private Date msgtime;

    @Override
    public String toString() {
        return "Message{" +
                "msgId=" + msgId +
                ", doctorId=" + doctorId +
                ", patientId='" + patientId + '\'' +
                ", mark=" + mark +
                ", msg='" + msg + '\'' +
                ", msgtime=" + msgtime +
                '}';
    }

    public int getMsgId() {
        return msgId;
    }

    public void setMsgId(int msgId) {
        this.msgId = msgId;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Date getMsgtime() {
        return msgtime;
    }

    public void setMsgtime(Date msgtime) {
        this.msgtime = msgtime;
    }
}
