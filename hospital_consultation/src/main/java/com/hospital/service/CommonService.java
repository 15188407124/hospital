package com.hospital.service;

import com.hospital.bean.Common;
import com.hospital.bean.Parameter;

import java.util.List;

public interface CommonService {
	/**
	 * 职位列表
	 * 
	 * @param name
	 * @return
	 */
	List<Common> titleQuery(String name);

	/**
	 * 参数查询
	 * 
	 * @return
	 */
	List<Parameter> parameterQuery();

	/**
	 * 参数列表查询
	 * 
	 * @return
	 */
	List<Parameter> parameterCodeQuery(String code);

	/**
	 * 参数插入
	 * 
	 * @param parameter
	 */
	void parameterCodeInsert(Parameter parameter);

	/**
	 * 参数更新
	 * 
	 * @param parameter
	 */
	void parameterCodeUpdate(Parameter parameter);

	/**
	 * 参数删除
	 * 
	 * @param id
	 */
	void parameterCodeDelete(Integer id);

	/**
	 * 病房类型查询
	 * 
	 * @return
	 */
	List<Parameter> wardTypeQuery();

	/**
	 * 民族列表查询
	 * 
	 * @return
	 */
	List<Parameter> nationQuery();

}
