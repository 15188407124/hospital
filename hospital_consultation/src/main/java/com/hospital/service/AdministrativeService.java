package com.hospital.service;

import com.hospital.bean.Parameter;

import java.util.List;
import java.util.Map;

/**
 * Create by hupengbo on 2020/2/26 11:55
 */
public interface AdministrativeService {
    /**
     * 查询科室信息
     * @return
     */
    public List<Map<String,Object>> findAdministrativeMsg();

    /**
     * 根据科室查询对应科室医生信息
     * @return
     */
    public List<Parameter> findAd_and_Doctor();

}
