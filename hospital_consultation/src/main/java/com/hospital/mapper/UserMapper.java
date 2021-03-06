package com.hospital.mapper;

import com.hospital.bean.User;
import com.hospital.bean.UserCode;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户dao
 */
@Repository("userMapper")
public interface UserMapper {
	/**
	 * 用户的查询
	 * 
	 * @param user
	 * @return
	 */
	User findUser(User user);

	/**
	 * 用户的注册
	 * 
	 * @param user
	 * @return
	 */
	void saveUser(User user);

	/**
	 * 用户的查询
	 * 
	 * @param id
	 * @return
	 */
	User findUserById(@Param("id") String id);

	/**
	 * 用户的查询
	 * 
	 * @param userCode
	 * @return
	 */
	List<User> userQuery(UserCode userCode);

	/**
	 * 用户的删除
	 * 
	 * @param id
	 */
	void userDelete(@Param("id") String id);

	/**
	 * 修改密码
	 * 
	 * @param user
	 */
	void updateUser(User user);

	/**
	 * 更新用户信息
	 * 
	 * @param user
	 */
	void updateUserMessage(User user);

	/**
	 * 查询该账户原密码是否匹配
	 * @param user
	 * @return
	 */
	List<User> checkPwdUser(User user);
}
