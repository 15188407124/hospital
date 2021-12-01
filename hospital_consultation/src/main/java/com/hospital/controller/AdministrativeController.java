package com.hospital.controller;
import com.hospital.bean.Parameter;
import com.hospital.service.AdministrativeService;
import com.hospital.util.JsonResult;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.annotation.Resources;
import java.util.List;
import java.util.Map;

/**
 * Create by hupengbo on 2020/2/26 11:49
 */
@Controller
@RequestMapping("/administrative")
public class AdministrativeController {
    @Resource(name = "administrativeService")
    private AdministrativeService administrativeService;

    /**
     * 查询科室信息
     * @return
     */
    @RequestMapping(value = "/findAdministraitveMsg.do",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String findAdministrativeMsg(){
        List<Map<String,Object>> list = administrativeService.findAdministrativeMsg();
        JSON json = JSONSerializer.toJSON(new JsonResult<>(list));
        return json.toString();
    }

    /**
     * 根据科室信息查询专家信息
     * @return
     */
    @RequestMapping(value = "/findAd_and_Doctor.do",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String findAd_and_Doctor(){
        List<Parameter> ad_and_doctor = administrativeService.findAd_and_Doctor();
        JSON json = JSONSerializer.toJSON(new JsonResult<>(ad_and_doctor));
        return json.toString();
    }
}
