package com.hospital.service.impl;

import com.hospital.bean.Bed;
import com.hospital.mapper.BedMapper;
import com.hospital.service.BedService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("bedService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class BedServiceImpl implements BedService {
	@Resource(name = "bedMapper")
	private BedMapper bedMapper;

	@Override
	public List<Bed> bedQuery(Bed bed) {

		return bedMapper.bedQuery(bed);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void bedUpdate(Bed bed) {

		bedMapper.bedUpdate(bed);
	}

	@Override
	public Integer bedStateQuery(Bed bed) {
		return bedMapper.bedStateQuery(bed);
	}

	@Override
	public Integer countwardpatient(Bed bed) {
		return bedMapper.countwardpatient(bed);
	}
}
