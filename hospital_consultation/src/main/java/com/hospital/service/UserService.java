package com.hospital.service;

import com.hospital.bean.User;
import com.hospital.bean.UserCode;
import com.hospital.util.NameOrPasswordException;

import java.util.List;

/**
 * 用户的接口
 *
 */
public interface UserService {
	/**
	 * 用户的登录
	 */
	User login(String name, String password) throws NameOrPasswordException;

	/**
	 * 用户的注册
	 */
	void register(User user);

	/**
	 * 用户的查询
	 */
	User findUserById(String id);

	/**
	 * 用户的查询
	 */
	List<User> userQuery(UserCode userCode);
	/**
	 * 用户的删除
	 */
	void userDelete(String id);
	/**
	 * 更新用户信息
	 */
	void updateUserMessage(User user);

	/**
	 * 修改密码
	 */
	void updateUser(User user);

	/**
	 * 查询原密码是否与该账户匹配
	 * @param user
	 * @return
	 */
	List<User> checkPwdUser(User user);
}
