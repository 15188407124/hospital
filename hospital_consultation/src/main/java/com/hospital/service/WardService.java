package com.hospital.service;

import com.hospital.bean.Bed;
import com.hospital.bean.Patient;
import com.hospital.bean.Ward;

import java.util.List;
import java.util.Map;

public interface WardService {
	/**
	 * 病房的添加
	 */
	void wardSave(Ward ward);

	/**
	 * 增加床位
	 */
	void bedSave(Bed bed);

	/**
	 * 病房查询
	 */
	Ward wardQueryById(Integer wardId);

	/**
	 * 病房查询
	 */
	List<Ward> wardQuery(Ward ward);

	/**
	 * 更改病房状态
	 */
	void wardUpdate(Ward ward);

	/**
	 * 改变床位
	 */
	void logWard(Patient patient);

	/**
	 * 删除病房
	 */
	void wardDelete(Integer wardNo);

	/**
	 * 查询病房额定容量
	 */
	Integer wardspace(Ward ward);

	/**
	 * 病床使用情况统计
	 */
	List<Map<String, Object>> wardStatistics(Integer id);
}
