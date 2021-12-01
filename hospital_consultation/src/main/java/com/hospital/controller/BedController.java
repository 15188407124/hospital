package com.hospital.controller;

import com.hospital.bean.Bed;
import com.hospital.service.BedService;
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
import java.util.List;

@Controller
@RequestMapping("/bed")
public class BedController {
	@Resource(name = "bedService")
	private BedService bedService;
	Logger log = Logger.getLogger(Log4jLogsDetial.class);

	@RequestMapping(value = "/bedQuery.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String bedQuery(@Param("wardNo") Integer wardNo) {
		Bed bed = new Bed();
		bed.setWardNo(wardNo);
		bed.setState(0);
		List<Bed> list = bedService.bedQuery(bed);
		log.info("查询" + wardNo + "房间内病床");
		JsonConfig js = new JsonConfig();
		JSON json = JSONSerializer.toJSON(new JsonResult<List<Bed>>(list), js);
		return json.toString();
	}
}
