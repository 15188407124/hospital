package com.hospital.controller;

import com.hospital.bean.*;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import com.hospital.service.UserService;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/doctor")
public class DoctorController {
	@Resource(name = "doctorService")
	private DoctorService doctorService;
	@Resource(name = "patientService")
	private PatientService patientService;
	@Resource(name = "userService")
	private UserService userService;
	private JSON json;
	Logger log = Logger.getLogger(Log4jLogsDetial.class);

	@RequestMapping(value = "/findOrderNum.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String  findOrderNum(Integer doctorId,String order_date,Integer order_up,Integer order_down) throws ParseException {
		Order order = new Order();
		order.setDoctorId(doctorId);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date odate = simpleDateFormat.parse(order_date);
		order.setOrder_date(odate);
		order.setOrder_up(order_up);
		order.setOrder_down(order_down);
		Integer count = doctorService.findOrderNum(order);
		List list = new ArrayList();
		list.add(count);
		json = JSONSerializer.toJSON(new JsonResult<List<Integer>>(list));
		return json.toString();

	}

	@RequestMapping(value = "/save.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String doctorSave(@Param("name") String name, @Param("title") Integer title,
							 @Param("department") Integer department, @Param("gender") Integer gender, @Param("time") String time)
			throws ParseException {
		Doctor doctor = new Doctor();
		if (!(time == null || "".equals(time))) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date worktime = (Date) sdf.parse(time);
			doctor.setWorkTime(worktime);
		}
		doctor.setName(name);
		doctor.setGender(gender);
		doctor.setTitle(title);
		doctor.setDepartment(department);
		doctorService.doctorSave(doctor);
		User user = new User();
		user.setId(doctor.getId().toString());
		user.setName(name);
		user.setPassword("E10ADC3949BA59ABBE56E057F20F883E");/*md5加密后的密码*/
		user.setDescribe(2);
		userService.register(user);
		log.info("新增医生" + doctor.getName()+user.getId());
		json = JSONSerializer.toJSON(new JsonResult<Doctor>(doctor));
		return json.toString();
	}

	@RequestMapping(value = "/doctorQueryById.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String doctorQueryById(@Param("id") String id) {
		List<Doctor> list = doctorService.doctorQueryById(Integer.parseInt(id));
		json = JSONSerializer.toJSON(new JsonResult<List<Doctor>>(list));
		return json.toString();

	}

	@RequestMapping(value = "/doctorQuery.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String doctorQuery(@Param("name") String name, @Param("startTime") String startTime,
							  @Param("endTime") String endTime, @Param("title") Integer title, @Param("department") Integer department,
							  @Param("state") Integer state) throws ParseException {
		DoctorCode doctorCode = new DoctorCode();
		doctorCode.setTitle(title);
		doctorCode.setName(name);
		doctorCode.setDepartment(department);
		/**
		 * 入院登记的医生查询下拉框和医生查询功能模块的医生查询复用的是这一个接口 但是入院登记的下拉框不会传入state参数，而且此处只希望查到在职医生
		 * 所以当没有传入state参数时，将医生状态设置为在职
		 */
		if (state != null) {
			// System.out.println("进入非空区");
			if (state == -1) {
				// System.out.println("进入-1区");
				doctorCode.setState(null);
				log.info("设置医生状态为缺省");
			}
			if (state == 0) {
				// System.out.println("进入0区");
				doctorCode.setState(0);
				log.info("设置医生状态为在职");
			}
			if (state == 1) {
				// System.out.println("进入1区");
				doctorCode.setState(1);
				log.info("设置医生状态为离职");
			}
		}
		if (state == null) {
			doctorCode.setState(0);
			// System.out.println("进入null区");
		}
		// System.out.println("医生状态最终设置为" + doctorCode.getState());
		if (!(startTime == null || "".equals(startTime))) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date start = (Date) sdf.parse(startTime);
			doctorCode.setStartTime(start);
		}
		if (!(endTime == null || "".equals(endTime))) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date end = (Date) sdf.parse(endTime);
			doctorCode.setEndTime(end);
		}
		List<Doctor> list = doctorService.doctorQuery(doctorCode);
		log.info("查询在职医生");
		JsonConfig jc = new JsonConfig();
		jc.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor("yyyy-MM-dd"));
		json = JSONSerializer.toJSON(new JsonResult<List<Doctor>>(list), jc);
		return json.toString();

	}

	@RequestMapping(value = "/doctorDelete.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String doctorDelete(@Param("id") Integer id) {
		if (id == 0) {
			json = JSONSerializer.toJSON(new JsonResult<Doctor>(3, "该医生不存在", null));
		} else {
			/**
			 * 检查该医生名下是否有未出院的患者
			 */
			PatientCode patientCode = new PatientCode();
			patientCode.setDocid(id);
			patientCode.setOutStatus(0);
			List<Map<String, Object>> list = patientService.patientQuery(patientCode);
			// System.out.println("当前医生名下未出院患者：" + list);
			Doctor doctor = doctorService.doctorById(id);
			log.info("查询医生" + doctor.getId());
			if (doctor.getState() == 0 && list.size() == 0) {// 未离职且无患者
				doctorService.doctorDelete(id);
				log.info("医生" + doctor.getName() + "离职");
				json = JSONSerializer.toJSON(new JsonResult<Doctor>(new Doctor()));
			} else if (list.size() != 0) {// 有患者
				json = JSONSerializer.toJSON(new JsonResult<Doctor>(2, null, new Doctor()));
			} else {// 已离职
				json = JSONSerializer.toJSON(new JsonResult<Doctor>(1, null, new Doctor()));
			}
		}
		return json.toString();
	}

	@RequestMapping(value = "/updateDoctorMessage.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateDoctorMessage(@Param("id") Integer id, @Param("name") String name,
									  @Param("keshi") Integer keshi, @Param("zhicheng") Integer zhicheng, @Param("gender") Integer gender) {
		Doctor doctor = new Doctor();
		doctor.setId(id);
		doctor.setName(name);
		doctor.setDepartment(keshi);
		doctor.setTitle(zhicheng);
		doctor.setGender(gender);
		doctorService.updateDoctorMessage(doctor);
		log.info("更新医生" + doctor.getName() + "信息");
		json = JSONSerializer.toJSON(new JsonResult<Doctor>(doctor));
		return json.toString();
	}

	@RequestMapping(value = "/updateDoctorOrder.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateDoctorOrder(@Param("order_date") String order_date,@Param("order_time") Integer order_time, @Param("id") Integer id, @Param("patientId") String patientId) throws ParseException {
		Order order = new Order();
		order.setDoctorId(id);
		order.setPatientId(patientId);
        if (!(order_date == null || "".equals(order_date))) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date odate = (Date) sdf.parse(order_date);
            order.setOrder_date(odate);
        }
	    if (order_time == 1) {
			doctorService.addtOrderMsg(order);
		} else {
			doctorService.addtOrderMsgs(order);
		}
		log.info("更新医生预约信息" + order_time);
		return json.toString();
	}
	@RequestMapping(value = "/checkIsOrder.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String checkIsOrder(@Param("patientId") String patientId,@Param("order_date") String order_date,@Param("order_time") Integer order_time) throws ParseException {
		Order order = new Order();
		order.setPatientId(patientId);
		if (!(order_date == null || "".equals(order_date))) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date odate = (Date) sdf.parse(order_date);
			order.setOrder_date(odate);
		}
		if (order_time == 1) {
			order.setOrder_up(1);
			order.setOrder_down(0);
		} else if(order_time==2) {
			order.setOrder_down(1);
			order.setOrder_up(0);
		}
		System.out.println(order.toString());
		List<Order> list = doctorService.checkIsOrder(order);
		JsonConfig jc = new JsonConfig();
		jc.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor("yyyy-MM-dd"));
		json = JSONSerializer.toJSON(new JsonResult<List<Order>>(list),jc);
		return json.toString();
	}
	@RequestMapping(value = "/OrderDoctorQuery.do", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String OrderDoctorQuery(@Param("patientId") String patientId, @Param("doctorId") Integer doctorId) {
		List<Order> list = doctorService.orderDoctorQuery(patientId, doctorId);
        JsonConfig jc = new JsonConfig();
        jc.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor("yyyy-MM-dd"));
		json = JSONSerializer.toJSON(new JsonResult<List<Order>>(list),jc);
		return json.toString();
	}

	@RequestMapping(value = "/doctorQueryMsg.do",produces = "application/json;charset=utf-8")
	@ResponseBody
	public String doctorQueryMsg(@Param("doctorId") String doctorId,@Param("mark") Integer mark) {
		List<Map<String,Object>> list = doctorService.doctorQueryMsg(doctorId,mark);
		for(Map<String,Object> map:list){
			String msgtime = map.get("msgtime").toString();
			map.put("msgtime",msgtime);
		}
		json = JSONSerializer.toJSON(new JsonResult<List<Map<String,Object>>>(list));
		return json.toString();
	}

	@RequestMapping(value = "/msgSave.do",produces = "application/json;charset=utf-8")
	@ResponseBody
	public String msgSave(@Param("doctorId") String doctorId,@Param("mark") String mark,@Param("msg") String msg,@Param("patientId") String patientId) {
		int marks = Integer.parseInt(mark);
		int doctorIds = Integer.parseInt(doctorId);
		doctorService.msgSave(doctorIds,marks,msg,patientId);
		JSON json = JSONSerializer.toJSON(new JsonResult<List<Map<String,Object>>>());
		return json.toString();
	}

	/**
	 * 删除预约记录
	 * @param doctorId
	 * @param patientId
	 * @return
	 */
	@RequestMapping(value = "/delOrderDoctor.do",produces = "application/json;charset=utf-8")
	@ResponseBody
	public String delOrderDoctor(@Param("doctorId") String doctorId,@Param("patientId") String patientId) {
		doctorService.delOrderDoctor(doctorId,patientId);
		JSON json = JSONSerializer.toJSON(new JsonResult<List<Map<String,Object>>>());
		return json.toString();
	}
}