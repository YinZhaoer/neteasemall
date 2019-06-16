package com.neteasemall.service;

import com.neteasemall.common.ServerResponse;
import com.neteasemall.pojo.User;

public interface IUserService {

    ServerResponse<User> login(String username, String password);


    ServerResponse<String> checkValid(String str,String type);


    ServerResponse checkAdminRole(User user);

}
