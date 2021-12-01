package com.hospital.mapper;

import com.hospital.bean.Log;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 日志Dao
 */
@Repository("LogMapper")
public interface LogMapper {
	/**
	 * 查询日志
	 */
	List<Log> LogsQuery(Log log);

	/**
	 * 单个日志查询
	 */
	List<Log> LogQueryById(Log log);
}
