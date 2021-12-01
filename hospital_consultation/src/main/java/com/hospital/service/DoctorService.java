package com.hospital.service;

import com.hospital.bean.Doctor;
import com.hospital.bean.DoctorCode;
import com.hospital.bean.Message;
import com.hospital.bean.Order;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;

public interface DoctorService {
	/**
	 * 检查同一时间段是否已经预约过医生
	 * @param order
	 * @return
	 */
	List<Order> checkIsOrder(Order order);
	/**
	 * 查询不同时间段预约人数
	 * @param order
	 * @return
	 */
	int findOrderNum(Order order);
	/**
	 * 取消预约
	 * @param doctorId
	 * @param patientId
	 */
	void delOrderDoctor(String doctorId,String patientId);
	/**
	 * 根据id保存发送信息
	 * @param doctorId
	 * @param mark
	 * @param msg
	 * @param patientId
	 */
	void msgSave(int doctorId, int mark,String msg,String patientId);
	/**
	 * 根据id获取已发或者接收信息
	 * @param doctorId
	 * @param mark
	 * @return
	 */
	List<Map<String,Object>> doctorQueryMsg(int doctorId, int mark);
	/**
	 * 查寻用户是否已经预约
	 * @param patientId
	 * @param doctorId
	 * @return
	 */
	List orderDoctorQuery(String patientId,int doctorId);
	/**
	 * 插入预约记录
	 */
	void addtOrderMsg(Order order);//上午预约
	void addtOrderMsgs(Order order);//下午预约
	/**
	 * 根据id查寻医生
	 * @param id
	 * @return
	 */
	List<Doctor> doctorQueryById(int id);
	/**
	 * 医生信息的保存
	 * 
	 * @param doctor
	 */
	void doctorSave(Doctor doctor);

	/**
	 * 医生信息的查询
	 * 
	 * @param doctorCode
	 * @return
	 */
	List<Doctor> doctorQuery(DoctorCode doctorCode);

	/**
	 * 删除医生信息
	 * 
	 * @param id
	 */
	void doctorDelete(Integer id);

	/**
	 * 更新医生信息
	 * 
	 * @param doctor
	 */
	void updateDoctorMessage(Doctor doctor);

	/**
	 * 查询
	 * 
	 * @param id
	 * @return
	 */
	Doctor doctorById(Integer id);
}
