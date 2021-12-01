package com.hospital.bean;

import java.util.Date;

/**
 * Create by hupengbo on 2020/3/24 14:09
 */
public class Order {
    private int id;
    private int doctorId;
    private String patientId;
    private Date order_time;
    private Date order_date;
    private int order_up;
    private int order_down;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", doctorId=" + doctorId +
                ", patientId='" + patientId + '\'' +
                ", order_time=" + order_time +
                ", order_date=" + order_date +
                ", order_up=" + order_up +
                ", order_down=" + order_down +
                '}';
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public int getOrder_up() {
        return order_up;
    }

    public void setOrder_up(int order_up) {
        this.order_up = order_up;
    }

    public int getOrder_down() {
        return order_down;
    }

    public void setOrder_down(int order_down) {
        this.order_down = order_down;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Date getOrder_time() {
        return order_time;
    }

    public void setOrder_time(Date order_time) {
        this.order_time = order_time;
    }
}
