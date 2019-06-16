package com.neteasemall.service.impl;

import com.neteasemall.common.ServerResponse;
import com.neteasemall.dao.CartMapper;
import com.neteasemall.dao.OrderMapper;
import com.neteasemall.dao.ProductMapper;
import com.neteasemall.pojo.Order;
import com.neteasemall.pojo.Product;
import com.neteasemall.service.ICartService;
import com.neteasemall.service.IOrderService;
import com.neteasemall.util.BigDecimalUtil;
import com.neteasemall.vo.CartProductVo;
import com.neteasemall.vo.CartVo;
import com.neteasemall.vo.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


/**
 * OrderServiceImpl
 *
 * @author zy
 * @date 2019/3/14
 */
@Service("iOrderService")
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private ICartService iCartService;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper productMapper;


    @Override
    public ServerResponse<OrderVo> add(Integer userId) {
        OrderVo orderVo = new OrderVo();
        ServerResponse<CartVo> cartVo = iCartService.list(userId);
        CartVo cartVoData = cartVo.getData();
        orderVo.setOrderCartProductVoList(cartVoData.getCartProductVoList());
        for (CartProductVo cartProductVo : cartVoData.getCartProductVoList()) {
            Integer sold = 2;
            Integer productId = cartProductVo.getProductId();
            String productName = cartProductVo.getProductName();
            BigDecimal soldPrice = cartProductVo.getProductPrice();
            String mainImage = cartProductVo.getProductMainImage();
            Integer quantity = cartProductVo.getQuantity();
            Order order = new Order();
            order.setUserId(userId);
            order.setProductId(productId);
            order.setProductName(productName);
            order.setMainImage(mainImage);
            order.setQuantity(quantity);
            order.setPrice(soldPrice);
            orderMapper.insert(order);
            Product product = productMapper.selectByPrimaryKey(productId);
            product.setSold(sold);
            product.setSoldPrice(soldPrice);
            product.setSoldQuantity(quantity + product.getSoldQuantity());
            product.setCartLabel(0);
            productMapper.updateByPrimaryKeySelective(product);
            cartMapper.deleteAll();
        }
        return ServerResponse.createBySuccess(orderVo);
    }

    @Override
    public ServerResponse<OrderVo> list(Integer userId) {
        OrderVo orderVo = new OrderVo();
        BigDecimal totalPrice = new BigDecimal("0.00");
        List<Order> orderList = orderMapper.selectList();
        orderVo.setOrderProductList(orderList);
        for (Order order : orderList) {
            BigDecimal price = order.getPrice();
            Integer quantity = order.getQuantity();
            BigDecimal sum = BigDecimalUtil.mul(price.doubleValue(), order.getQuantity());
            totalPrice = totalPrice.add(sum);
        }
        orderVo.setTotalPrice(totalPrice);


        return ServerResponse.createBySuccess(orderVo);
    }
}
