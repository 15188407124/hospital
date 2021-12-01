package com.hospital.service;

import com.hospital.bean.Log;

import java.util.List;

public interface LogService {
	/**
	 * 日志查询
	 * */
	List<Log> LogsQuery(Log log);
	
	/**
	 * 日志统计
	 * */
	List<Log> LogQueryById(Log log);
}
