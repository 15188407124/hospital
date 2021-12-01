package com.hospital.service;

import com.hospital.bean.Order;
import com.hospital.bean.OrderPatient;
import com.hospital.bean.Patient;
import com.hospital.bean.PatientCode;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;

import java.rmi.MarshalledObject;
import java.util.List;
import java.util.Map;

public interface PatientService {
	/**
	 * 更新预约处理状态
	 * @param patientId
	 */
	void detailOrder(String patientId);
	/**
	 * 更新入院登记信息
	 * @param patient
	 */
	void patientUpdateAdd(Patient patient);

	/**
	 * 向msg表中插入发送信息
	 * @param doctorId
	 * @param mark
	 * @param msg
	 * @param patientId
	 */
	void  msgSave(int doctorId,int mark,String msg,String patientId);
	/**
	 * 根据id查询接收和发送消息
	 * @param patientId
	 * @param mark
	 * @return
	 */
	List<Map<String,Object>> patientQueryMsg(String patientId, int mark);
	/**
	 * 搜索预约病人
	 * @param patientName
	 * @param cerificateNo
	 * @return
	 */
	List<OrderPatient> OrderQuery(@Param("patientName") String patientName, @Param("cerificateNo") String cerificateNo, int doctorId);
	/**
	 * 查询已登记病人总数
	 * @param
	 * @return
	 */
	List<Map<String,Object>> patientQueryTotal();

	/**
	 * 对住院病人进行分页查询
	 * @param patientCode
	 * @return
	 */
	List<Map<String,Object>> findPagePatientQuery(PatientCode patientCode);

	/**
	 *分页显示病人数据
	 * @param currNo
	 * @param pageSize
	 * @return
	 */
	List<Map<String,Object>> pagePatientQuery(int currNo, int pageSize);
	/**
	 * 病人的添加
	 */
	void patientAdd(Patient patient);

	/**
	 * 病人列表查询
	 */
	List<Map<String, Object>> patientQuery(PatientCode patientCode);

	/**
	 * 病人列表查询--通过身份证
	 */
	List<Map<String, Object>> patientQueryBycerificateNo(String BycerificateNo);
	/**
	 * 更新基本信息
	 * @param patient
	 */
	void patientUpdateInfo(Patient patient);

	/**
	 * 更新病人信息
	 */
	void patientUpdate(Patient patient);

	/**
	 * 费用结算
	 */
	void jiesuan(String patientId);

	/**
	 * 出院登记
	 */
	void patientLeave(String patientId);

	/**
	 * 统计查询patientStatistics
	 */
	List<Map<String, Object>> patientStatistics(Map<String, Object> map);

	/**
	 * 根据id获取病人预约记录
	 * @param doctorId
	 * @return
	 */
	List<Map<String,Object>> patientOrderQuery(int doctorId);
}
