package com.hospital.mapper;

import com.hospital.bean.Common;
import com.hospital.bean.Parameter;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("commonMapper")
public interface CommonMapper {
	/**
	 * 职位列表
	 */
	List<Common> titleQuery(@Param("name") String name);

	/**
	 * 参数查询
	 */
	List<Parameter> parameterQuery();

	/**
	 * 参数列表查询
	 */
	List<Parameter> parameterCodeQuery(@Param("code") String code);

	/**
	 * 参数插入
	 */
	// @Insert("insert into
	// paracode(code,parameter_values,parameter_name)values(#{code},#{value},#{name})")
	void parameterCodeInsert(Parameter parameter);

	/**
	 * 参数更新
	 */
	// @Update("update paracode set
	// code=#{code},parameter_values=#{value},parameter_name=#{name}where code_id =
	// #{id}")
	void parameterCodeUpdate(Parameter parameter);

	/**
	 * 参数删除
	 */
	// @Delete("delete from paracode where code_id = #{id}")
	void parameterCodeDelete(@Param("id") Integer id);

	/**
	 * 病房类型查询
	 */
	List<Parameter> wardTypeQuery();

	/**
	 * 民族列表查询
	 */
	List<Parameter> nationQuery();
}