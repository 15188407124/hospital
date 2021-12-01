package com.hospital.service.impl;

import com.hospital.bean.GrantDrugs;
import com.hospital.mapper.GrantDrugsMapper;
import com.hospital.service.GrantDrugsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service("grantDrugsService")
@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public class GrantDrugsServiceImpl implements GrantDrugsService {
	@Resource(name = "grantDrugsMapper")
	private GrantDrugsMapper grantDrugsMapper;

	public List<GrantDrugs> grantDrugsFindByPatienId(String patientId) {
		return grantDrugsMapper.grantDrugsFindByPatienId(patientId) ;
	}

}
