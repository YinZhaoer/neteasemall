package com.neteasemall.service;

import com.neteasemall.common.ServerResponse;
import com.neteasemall.vo.OrderVo;

import java.math.BigDecimal;

public interface IOrderService {
    ServerResponse<OrderVo> add(Integer userId);
    ServerResponse<OrderVo> list(Integer userId);
}
