package com.hospital.mapper;

import com.hospital.bean.Parameter;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Create by hupengbo on 2020/2/26 11:59
 * 查询科室基本信息
 */
@Repository
public interface AdministrativeMapper {
    public List<Map<String,Object>> findAdMsg();
    public List<Parameter> findAd_and_Doctor();
}
