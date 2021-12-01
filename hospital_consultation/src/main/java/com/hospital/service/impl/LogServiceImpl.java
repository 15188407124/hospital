package com.hospital.service.impl;

import com.hospital.bean.Log;
import com.hospital.service.LogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("LogService")
@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public class LogServiceImpl implements LogService {
	@Resource(name = "LogMapper")
	private com.hospital.mapper.LogMapper LogMapper;

	@Override
	public List<Log> LogsQuery(Log log) {
		return LogMapper.LogsQuery(log);
	}

	@Override
	public List<Log> LogQueryById(Log log) {
		return LogMapper.LogQueryById(log);
	}
}
