package com.hospital.mapper;

import com.hospital.bean.Order;
import com.hospital.bean.OrderPatient;
import com.hospital.bean.Patient;
import com.hospital.bean.PatientCode;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 病人dao
 */
@Repository("patientMapper")
public interface PatientMapper {
	/**
	 * 更新预约病人处理状态
	 * @param patientId
	 */
	void detailOrder(@Param("patientId") String patientId);
	/**
	 * 入院登记信息更新
	 * @param patient
	 */
	void patientUpdateAdd(Patient patient);
	/**
	 * 跟新基本信息
	 * @param patient
	 */
	void patientUpdateInfo(Patient patient);

	void msgSave(@Param("doctorId") int doctorId,@Param("mark")int mark,@Param("msg")String msg,@Param("patientId")String patientId);
	/**
	 * 根据id获取发送和接收消息
	 * @param patientId
	 * @param mark
	 * @return
	 */
	List<Map<String,Object>> patientQueryMsg(@Param("patientId") String patientId,@Param("mark") int mark);
	/**
	 * 搜索预约病人
	 * @param patientName
	 * @param cerificateNo
	 * @return
	 */
	List<OrderPatient> OrderQuery(@Param("patientName") String patientName, @Param("cerificateNo") String cerificateNo, @Param("doctorId") int doctorId);
	/**
	 * 根据id获取病人
	 * @param doctorId
	 * @return
	 */
	List<Map<String,Object>> patientOrderQuery(@Param("doctorId") int doctorId);
	/**
	 * 查询住院病人总数
	 * @return
	 */
	List<Map<String,Object>> patientQueryTotal();
	/**
	 * 搜索病人
	 * @param patientCode
	 * @return
	 */
	List<Map<String,Object>> findPagePatientQuery(PatientCode patientCode);

	/**
	 * 对病人进行分页查询显示
	 * @param currNo
	 * @param pageSize
	 * @return
	 */

	List<Map<String, Object>> pagePatientQuery(@Param("currNo")int currNo,@Param("pageSize")int pageSize);
	/**
	 * 病人的添加
	 * 
	 * @param patient
	 */
	void patientAdd(Patient patient);

	/**
	 * 病人列表的查询
	 * 
	 * @return
	 */
	List<Map<String, Object>> patientQuery(PatientCode patientCode);

	/**
	 * 病人列表的查询--通过身份证
	 * 
	 * @return
	 */
	List<Map<String, Object>> patientQueryBycerificateNo(String cerificateNo);

	/**
	 * 更新病人信息
	 * 
	 * @param patient
	 */
	void patientUpdate(Patient patient);

	/**
	 * 费用结算
	 * 
	 * @param patientId
	 */
	void jiesun(@Param("patientId") String patientId);

	/**
	 * 出院登记
	 */
	void patientLeave(@Param("patientId") String patientId);

	/**
	 * 入院统计
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> inHospital(Map<String, Object> map);

	/**
	 * 出院统计
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> outHospital(Map<String, Object> map);

	/**
	 * 科室查询
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> departmentQuery(Map<String, Object> map);
}
