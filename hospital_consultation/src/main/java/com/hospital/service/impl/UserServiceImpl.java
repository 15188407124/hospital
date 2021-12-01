package com.hospital.service.impl;

import com.hospital.bean.User;
import com.hospital.bean.UserCode;
import com.hospital.mapper.UserMapper;
import com.hospital.service.UserService;
import com.hospital.util.Log4jLogsDetial;
import com.hospital.util.NameOrPasswordException;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class UserServiceImpl implements UserService {
	@Resource(name = "userMapper")
	private UserMapper userMapper;
	Logger log = Logger.getLogger(Log4jLogsDetial.class);
	/**
	 * 用户登录
	 */
	@Override
	public User login(String name, String password) throws NameOrPasswordException {
		if (name == null || name.trim().isEmpty()) {
			log.info("用户" + name + "尝试登录,但用户名为空");
			throw new NameOrPasswordException(1, "用户名为空");
		}
		if (password == null || password.trim().isEmpty()) {
			log.info("用户" + name + "尝试登录,但密码为空");
			throw new NameOrPasswordException(2, "密码为空");
		}
		name = name.trim();
		password = password.trim();
		User useryz = new User();
		useryz.setId(name);
		User user = userMapper.findUserById(name);
		System.out.println(user.getId());
		if (user == null) {
			log.info("用户" + name + "尝试登录,但用户不存在");
			throw new NameOrPasswordException(1, "用户不存在");
		}
		if (user != null && password.equals(user.getPassword())) {
			// 登录成功
			log.info("用户" + name + "登录成功");
			return user;
		}
		log.info("用户" + name + "尝试登录,但密码错误");
		throw new NameOrPasswordException(2, "密码错误");
	}

	/**
	 * 用户注册
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
	public void register(User user) {
		userMapper.saveUser(user);
	}

	/**
	 * 用户查询
	 */
	@Override
	public User findUserById(String id) {
		return userMapper.findUserById(id);
	}

	/**
	 * 用户查询
	 */
	@Override
	public List<User> userQuery(UserCode userCode) {

		return userMapper.userQuery(userCode);
	}

	/**
	 * 用户删除
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void userDelete(String id) {
		userMapper.userDelete(id);
	}

	/**
	 * 修改密码
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void updateUser(User user) {
		userMapper.updateUser(user);

	}

	@Override
	public List<User> checkPwdUser(User user) {
		List<User> userList = userMapper.checkPwdUser(user);
		return userList;
	}

	/**
	 * 更新用户信息
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void updateUserMessage(User user) {
		userMapper.updateUserMessage(user);

	}

}
