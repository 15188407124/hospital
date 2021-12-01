package com.hospital.mapper;

import com.hospital.bean.GrantDrugs;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 药品派发Dao
 * 
 */
@Repository("grantDrugsMapper")
public interface GrantDrugsMapper {
	// 根据患者住院号查询药品派发
	List<GrantDrugs> grantDrugsFindByPatienId(@Param("patientId") String patientId);
}
