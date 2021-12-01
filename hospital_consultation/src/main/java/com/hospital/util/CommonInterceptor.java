package com.hospital.util;

import com.hospital.bean.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CommonInterceptor implements Filter {

	@Override
	public void destroy() {

	}

	@SuppressWarnings("unused")
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		User user = BaseUtils.getUser(request);
		String path = request.getRequestURI();
		path = path.substring(path.indexOf("/", 1));
		/*设置过滤条件，非login.jsp请求或者new_patient_reg.jsp页面请求都进行过滤判断*/
		if (!path.matches(".*/login\\.html$")) {
			if (path.matches(".*/*\\.html$")) {
				checkLogin(request, response, chain);
				return;
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

	@SuppressWarnings("unused")
	private void checkDotDo(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		User user = BaseUtils.getUser(request);
		if (user != null) {
			chain.doFilter(request, response);
			return;
		}
//		String json = "{\"state\":1,\"message\":\"必须登录！\"}";
		String json = "";
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().println(json);
	}
/*进行登录检查，如果未登录，则进行过滤操作，如果已经登录，则放行*/
	private void checkLogin(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 如果没有�? 就重定向到login.jsp
		User user = BaseUtils.getUser(request);
		if (user != null) {
			if (!("".equals(user.getId())) && (user.getId() != null)) {
				chain.doFilter(request, response);
				return;
			}
		}
		// 重定向到 login.jsp
		String path = request.getContextPath() + "/login.html";
		response.sendRedirect(path);
	}

}
