package com.hospital.service;

import com.hospital.bean.PatientCode;
import com.hospital.bean.Sign;

import java.util.List;
import java.util.Map;

public interface SignService {
	/**
	 * 体征数据录入
	 */
	void signSave(Sign sign);

	/**
	 * 体征数据查询
	 */
	List<Map<String, Object>> signQuery(PatientCode patientCode);
}
