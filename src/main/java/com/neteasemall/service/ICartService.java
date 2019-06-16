package com.neteasemall.service;

import com.neteasemall.common.ServerResponse;
import com.neteasemall.vo.CartVo;

import java.math.BigDecimal;

public interface ICartService {
    ServerResponse<CartVo> add(Integer userId, Integer productId, Integer count);
    ServerResponse<CartVo> update(Integer userId,Integer productId,Integer count);

    ServerResponse<CartVo> list (Integer userId);
    ServerResponse<CartVo> selectOrUnSelect (Integer userId,Integer productId,Integer checked);
    ServerResponse<Integer> getCartProductCount(Integer userId);

    ServerResponse<String> deleteProduct(Integer id, Integer productId);
}
