package com.hospital.service.impl;

import com.hospital.bean.Parameter;
import com.hospital.mapper.AdministrativeMapper;
import com.hospital.service.AdministrativeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Create by hupengbo on 2020/2/26 11:58
 */
@Service("administrativeService")
public class AdministrativeImpl implements AdministrativeService {
    @Autowired
    AdministrativeMapper administrativeMapper;

    /**
     * 查询科室信息
     * @return
     */
    @Override
    public List<Map<String,Object>> findAdministrativeMsg() {
        return administrativeMapper.findAdMsg();
    }

    /**
     * 根据科室查询对应医生信息
     * @return
     */
    @Override
    public List<Parameter> findAd_and_Doctor() {
        return administrativeMapper.findAd_and_Doctor();
    }
}
