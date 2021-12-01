package com.hospital.bean;

import java.util.Date;

/**
 * Create by hupengbo on 2020/4/15 18:12
 */
public class OrderPatient {
    private String patientId;//这里用来表示身份证号
    private String name;
    private Integer gender;
    private String cerificateNo;
    private String homeAddress;
    private String contacts;
    private String contactsPhone;
    private Date order_time;
    private Date order_date;
    private int order_up;
    private int order_down;
    private int order_state;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public int getOrder_state() {
        return order_state;
    }

    public void setOrder_state(int order_state) {
        this.order_state = order_state;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getCerificateNo() {
        return cerificateNo;
    }

    public void setCerificateNo(String cerificateNo) {
        this.cerificateNo = cerificateNo;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getContactsPhone() {
        return contactsPhone;
    }

    public void setContactsPhone(String contactsPhone) {
        this.contactsPhone = contactsPhone;
    }

    public Date getOrder_time() {
        return order_time;
    }

    public void setOrder_time(Date order_time) {
        this.order_time = order_time;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }
}
