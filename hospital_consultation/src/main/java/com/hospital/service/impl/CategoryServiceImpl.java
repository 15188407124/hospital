package com.hospital.service.impl;

import com.hospital.bean.Category;
import com.hospital.mapper.CategoryMapper;
import com.hospital.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("categoryService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class CategoryServiceImpl implements CategoryService {
	@Resource(name = "categoryMapper")
	private CategoryMapper categoryMapper;

	@Override
	public Category categoryQueryMsg(int id) {
		Category category = categoryMapper.categoryQueryMsg(id);
		return category;
	}

	@Override
	public List<Category> categoryQuery(Category category) {

		return categoryMapper.categoryQuery(category);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void categoryUpdate(Category category) {
		categoryMapper.categoryUpdate(category);

	}

}
