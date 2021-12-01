package com.hospital.mapper;

import com.hospital.bean.Doctor;
import com.hospital.bean.DoctorCode;
import com.hospital.bean.Message;
import com.hospital.bean.Order;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 医生dao
 */
@Repository("doctorMapper")
public interface DoctorMapper {
	/**
	 * 查询不同时间段的预约人数
	 * @param order
	 * @return
	 */
	int findOrderNum(Order order);
	/**
	 * 取消预约
	 * @param doctorId
	 * @param patientId
	 */
	void delOrderDoctor(@Param("doctorId") String doctorId,@Param("patientId") String patientId);
	/**
	 * 发送信息
	 * @param doctorId
	 * @param mark
	 * @param msg
	 * @param patientId
	 */
	void msgSave(@Param("doctorId")int doctorId,@Param("mark")int mark,@Param("msg")String msg,@Param("patientId")String patientId);
	/**
	 * 根据id获取已发或者接收信息
	 * @param doctorId
	 * @param mark
	 * @return
	 */
	List<Map<String,Object>> doctorQueryMsg(@Param("doctorId") int doctorId, @Param("mark") int mark);
	/**
	 * 根据id查寻患者是否预约
	 * @param patientId
	 * @param doctorId
	 * @return
	 */
	List<Order> orderDoctorQuery(@Param("patientId") String patientId, @Param("doctorId") int doctorId);
	/**
	 * 保存预约记录
	 */
	void addOrderMsg(Order order);
	void addOrderMsgs(Order order);
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
	void doctorDelete(@Param("id") Integer id);

	/**
	 * 更新医生信息
	 * 
	 * @param doctor
	 */
	void updateDoctorMessage(Doctor doctor);

	/**
	 * 医生查询
	 */
	Doctor doctorById(@Param("id") Integer id);

	/**
	 * 查询同一天的同一时间段是否已经预约过医生
	 * @param order
	 * @return
	 */
    List<Order> checkIsOrder(Order order);
}
