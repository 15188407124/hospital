package com.hospital.mapper;

import com.hospital.bean.Bed;

import java.util.List;

/**
 * 病床管理
 */
public interface BedMapper {
	/**
	 * 病床查询
	 */
	List<Bed> bedQuery(Bed bed);

	/**
	 * 更改床位状态
	 */
	void bedUpdate(Bed bed);

	/**
	 * 查询房间是否已满
	 */
	Integer bedStateQuery(Bed bed);

	// 统计房间入住人数
	Integer countwardpatient(Bed bed);
}
