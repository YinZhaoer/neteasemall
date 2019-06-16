package com.neteasemall.vo;

import com.neteasemall.pojo.Order;

import java.math.BigDecimal;
import java.util.List;

/**
 * OrderVo
 *
 * @author zy
 * @date 2019/3/14
 */
public class OrderVo {
    private List<CartProductVo> orderCartProductVoList;

    private List<Order> orderProductList;

    private BigDecimal totalPrice;

    public List<CartProductVo> getOrderCartProductVoList() {
        return orderCartProductVoList;
    }

    public void setOrderCartProductVoList(List<CartProductVo> orderCartProductVoList) {
        this.orderCartProductVoList = orderCartProductVoList;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public List<Order> getOrderProductList() {
        return orderProductList;
    }

    public void setOrderProductList(List<Order> orderProductList) {
        this.orderProductList = orderProductList;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
