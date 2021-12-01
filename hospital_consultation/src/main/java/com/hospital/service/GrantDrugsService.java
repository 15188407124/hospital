package com.hospital.service;

import com.hospital.bean.GrantDrugs;

import java.util.List;

public interface GrantDrugsService {

	/**
	 * 根据住院号查询药物派发记录
	 */
	List<GrantDrugs> grantDrugsFindByPatienId(String patientId);
}
