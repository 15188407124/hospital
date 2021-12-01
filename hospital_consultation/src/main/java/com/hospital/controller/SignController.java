package com.hospital.controller;

import com.hospital.bean.PatientCode;
import com.hospital.bean.Sign;
import com.hospital.service.SignService;
import com.hospital.util.BaseUtils;
import com.hospital.util.JsonResult;
import com.hospital.util.Log4jLogsDetial;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/sign")
public class SignController {
	@Resource(name = "signService")
	private SignService signService;
	Logger log = Logger.getLogger(Log4jLogsDetial.class);

	@RequestMapping(value = "/signSave.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String signSave(@Param("patientId") String patientId, @Param("measureTime") String measureTime,
			@Param("temperature") String temperature, @Param("pulse") String pulse, @Param("breathing") String breathing,
			@Param("bloodSugar") String bloodSugar, @Param("bloodPressure") String bloodPressure,
			@Param("vein") String vein, @Param("remarks") String remarks, HttpServletRequest request)
			throws ParseException, UnsupportedEncodingException {
		Sign sign = new Sign();
		sign.setPatientId(BaseUtils.toString(patientId));// 患者ID
		sign.setMeasureTime(BaseUtils.toDates(measureTime));// 护理时间
		sign.setTemperature(BaseUtils.toFloat(temperature));// 体温
		sign.setPulse(BaseUtils.toInteger(pulse));// 心率
		sign.setBreathing(BaseUtils.toInteger(breathing));// 呼吸
		sign.setBloodSugar(BaseUtils.toFloat(bloodSugar));// 血糖
		sign.setBloodPressure(BaseUtils.toString(bloodPressure));// 血压
		sign.setVein(BaseUtils.toFloat(vein));// 静脉
		sign.setRemarks(BaseUtils.toString(remarks));// 备注
		sign.setUserId(BaseUtils.getUser(request).getId());// 护理医师ID
		sign.setUserName(BaseUtils.getUser(request).getName());// 护理医师姓名
		signService.signSave(sign);
		log.info("保存患者" + patientId + "体征护理数据");
		JSON json = JSONSerializer.toJSON(new JsonResult<Sign>(sign));
		return json.toString();
	}

	@RequestMapping(value = "/signQuery.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String signQuery(@Param(value = "patientId") String patientId, @Param("name") String patientName,
			@Param("wardNo") Integer wardNo, @Param("bedNo") Integer bedNo, @Param("start") String start,
			@Param("end") String end) throws ParseException {
		PatientCode patientCode = new PatientCode();
		if (patientId == null || "".equals(patientId)) {
			patientId = null;
		}
		if (patientName == null || "".equals(patientName)) {
			patientName = null;
		}
		// System.out.println("收到的patientName传参:"+patientName);
		patientCode.setPatientId(patientId);
		patientCode.setName(patientName);
		patientCode.setWardNo(wardNo);
		patientCode.setBedNo(bedNo);
		patientCode.setStart(BaseUtils.toDate(start));
		patientCode.setEnd(BaseUtils.toDate(end));
		List<Map<String, Object>> list = signService.signQuery(patientCode);
		log.info("查询患者" + patientName + patientId + "体征护理数据");
		for (Map<String, Object> map : list) {
			String str = map.get("measureTime").toString();
			map.put("measureTime", str);
		}
		JSON json = JSONSerializer.toJSON(new JsonResult<List<Map<String, Object>>>(list));
		return json.toString();
	}
}
