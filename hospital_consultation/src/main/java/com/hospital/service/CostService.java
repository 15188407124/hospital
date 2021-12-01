package com.hospital.service;

import com.hospital.bean.Cost;

import java.util.List;
import java.util.Map;

public interface CostService {
	/**
	 * 预交费用保存
	 * 
	 * @param cost
	 */
	void costAdd(Cost cost);

	/**
	 * 预交费用查询
	 */
	List<Map<String, Object>> costQuery(Map<String, Object> map);

	/**
	 * 费用结算查询
	 */
	List<Map<String, Object>> costTotal(String patientId);

	/**
	 * 药品数量
	 * 
	 * @param patientId
	 * @param drugId
	 * @return
	 */
	Integer drugscountQuery(String patientId, String drugId);
}
