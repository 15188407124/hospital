package com.hospital.bean;

import java.io.Serializable;
import java.util.List;

/**
 * 参数封装类
 * 科室信息
 */
public class Parameter implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String code;
	private String name;
	private Integer value;
	private String message;
	private List<Doctor> doctorlist;

	public List<Doctor> getDoctorlist() {
		return doctorlist;
	}

	public void setDoctorlist(List<Doctor> doctorlist) {
		this.doctorlist = doctorlist;
	}

	public Parameter() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Parameter{" +
				"id=" + id +
				", code='" + code + '\'' +
				", name='" + name + '\'' +
				", value=" + value +
				", message='" + message + '\'' +
				", doctorlist=" + doctorlist +
				'}';
	}
}
