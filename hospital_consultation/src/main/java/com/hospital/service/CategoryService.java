package com.hospital.service;

import com.hospital.bean.Category;

import java.util.List;

public interface CategoryService {
	/**
	 * 根据id获取病床信息
 	 * @param id
	 * @return
	 */
	Category categoryQueryMsg(int id);
	/**
	 * 查询病房类型
	 * 
	 * @param category
	 */
	List<Category> categoryQuery(Category category);

	/**
	 * 更新病房类型的价格
	 * 
	 * @param category
	 */
	void categoryUpdate(Category category);
}
