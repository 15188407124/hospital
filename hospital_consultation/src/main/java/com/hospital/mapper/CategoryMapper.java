package com.hospital.mapper;

import com.hospital.bean.Category;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("categoryMapper")
public interface CategoryMapper {
	/**
	 * 根据id获取病床信息
	 * @param id
	 * @return
	 */
	Category categoryQueryMsg(@Param("id") int id);
	/**
	 * 病房类型的查询
	 */
	List<Category> categoryQuery(Category category);

	/**
	 * 更新病房类型的价格
	 */
	void categoryUpdate(Category category);
}
