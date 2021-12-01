package com.hospital.mapper;

import com.hospital.bean.PatientCode;
import com.hospital.bean.Sign;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 体征dao
 */
@Repository("signMapper")
public interface SignMapper {
	/**
	 * 体征数据录入
	 * 
	 * @param sign
	 */
	void signSave(Sign sign);

	/**
	 * 病人体征数据查询
	 * 
	 * @param patientCode
	 * @return
	 */
	List<Map<String, Object>> signQuery(PatientCode patientCode);
}
