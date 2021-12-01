package com.hospital.controller;

import com.hospital.bean.Category;
import com.hospital.service.CategoryService;
import com.hospital.util.BaseUtils;
import com.hospital.util.JsonDateValueProcessor;
import com.hospital.util.JsonResult;
import com.hospital.util.Log4jLogsDetial;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {

	@Resource(name = "categoryService")
	private CategoryService categoryService;
	Logger log = Logger.getLogger(Log4jLogsDetial.class);
	@RequestMapping(value = "/categoryQueryMsg.do",produces = "application/json;charset=utf-8")
	@ResponseBody
	public String categoryQueryMsg(HttpServletRequest request){
		int id = Integer.parseInt(request.getParameter("id"));
		Category category = categoryService.categoryQueryMsg(id);
		log.info("查询" + id);
		JsonConfig jc = new JsonConfig();
		jc.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor("yyyy-MM-dd"));
		JSON json = JSONSerializer.toJSON(new JsonResult<>(category), jc);
		return json.toString();
	}
	@RequestMapping(value = "/categoryQuery.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String categoryQuery(@Param("id") Integer id, @Param("type") Integer type, @Param("name") String name) {
		List<Category> list = categoryService.categoryQuery(new Category());
		log.info("查询参数" + id);
		JsonConfig jc = new JsonConfig();
		jc.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor("yyyy-MM-dd"));
		JSON json = JSONSerializer.toJSON(new JsonResult<List<Category>>(list), jc);
		return json.toString();
	}

	@RequestMapping(value = "/categoryUpdate.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String categoryUpdate(HttpServletRequest request, HttpServletResponse response) {
			Integer id = BaseUtils.toInteger(request.getParameter("id"));
			Float updatePrice = BaseUtils.toFloat(request.getParameter("updatePrice"));
			Category category = new Category();
			if (updatePrice != 0) {
				category.setId(id);
				category.setPrice(updatePrice);
				categoryService.categoryUpdate(category);
				log.info("更新参数" + id);
			}
		JsonConfig jc = new JsonConfig();
		jc.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor("yyyy-MM-dd"));
		JSON json = JSONSerializer.toJSON(new JsonResult<Category>(new Category()), jc);
		return json.toString();
	}
}
