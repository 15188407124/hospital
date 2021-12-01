package com.hospital.service.impl;

import com.hospital.bean.Common;
import com.hospital.bean.Parameter;
import com.hospital.mapper.CommonMapper;
import com.hospital.service.CommonService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("commonService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class CommonServiceImpl implements CommonService {
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;

	@Override
	public List<Common> titleQuery(String name) {

		return commonMapper.titleQuery(name);
	}

	@Override
	public List<Parameter> parameterQuery() {

		return commonMapper.parameterQuery();
	}

	@Override
	public List<Parameter> parameterCodeQuery(String code) {

		return commonMapper.parameterCodeQuery(code);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
	public void parameterCodeInsert(Parameter parameter) {
		commonMapper.parameterCodeInsert(parameter);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void parameterCodeUpdate(Parameter parameter) {
		commonMapper.parameterCodeUpdate(parameter);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void parameterCodeDelete(Integer id) {
		commonMapper.parameterCodeDelete(id);
	}

	@Override
	public List<Parameter> wardTypeQuery() {

		return commonMapper.wardTypeQuery();
	}

	@Override
	public List<Parameter> nationQuery() {

		return commonMapper.nationQuery();
	}

}
