package com.hospital.service.impl;

import com.hospital.bean.Doctor;
import com.hospital.bean.DoctorCode;
import com.hospital.bean.Message;
import com.hospital.bean.Order;
import com.hospital.mapper.DoctorMapper;
import com.hospital.service.DoctorService;
import org.apache.tools.ant.types.resources.selectors.Or;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("doctorService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class DoctorServiceImpl implements DoctorService {
	@Resource(name = "doctorMapper")
	private DoctorMapper doctorMapper;

	@Override
	public List<Order> checkIsOrder(Order order) {
		List<Order> list = doctorMapper.checkIsOrder(order);
		return list;
	}

	@Override
	public int findOrderNum(Order order) {
		return doctorMapper.findOrderNum(order);
	}

	@Override
	public void delOrderDoctor(String doctorId, String patientId) {
		doctorMapper.delOrderDoctor(doctorId,patientId);
	}

	@Override
	public void msgSave(int doctorId, int mark, String msg, String patientId) {
		doctorMapper.msgSave(doctorId,mark,msg,patientId);
	}

	@Override
	public List<Map<String,Object>> doctorQueryMsg(int doctorId, int mark) {
		List<Map<String,Object>> list = doctorMapper.doctorQueryMsg(doctorId,mark);
		return list;
	}

	@Override
	public List orderDoctorQuery(String patientId, int doctorId) {
		List<Order> list = doctorMapper.orderDoctorQuery(patientId,doctorId);
		return list;
	}

	@Override
	public void addtOrderMsg(Order order) {
		doctorMapper.addOrderMsg(order);
	}

	@Override
	public void addtOrderMsgs(Order order) {
		doctorMapper.addOrderMsgs(order);
	}

	@Override
	public List<Doctor> doctorQueryById(int id) {
		Doctor doctor = doctorMapper.doctorById(id);
		List<Doctor> list = new ArrayList<>();
		list.add(doctor);
		return list;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
	public void doctorSave(Doctor doctor) {
		doctorMapper.doctorSave(doctor);

	}

	@Override
	public List<Doctor> doctorQuery(DoctorCode doctorCode) {
		return doctorMapper.doctorQuery(doctorCode);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void doctorDelete(Integer id) {
		doctorMapper.doctorDelete(id);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void updateDoctorMessage(Doctor doctor) {
		doctorMapper.updateDoctorMessage(doctor);
	}

	@Override
	public Doctor doctorById(Integer id) {

		return doctorMapper.doctorById(id);
	}

}
