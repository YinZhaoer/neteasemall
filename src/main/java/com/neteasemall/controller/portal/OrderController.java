package com.neteasemall.controller.portal;

import com.neteasemall.common.Const;
import com.neteasemall.common.ResponseCode;
import com.neteasemall.common.ServerResponse;
import com.neteasemall.pojo.User;
import com.neteasemall.service.IOrderService;
import com.neteasemall.vo.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;

/**
 * OrderController
 *
 * @author zy
 * @date 2019/3/14
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/order/")
public class OrderController {
    @Autowired
    private IOrderService iOrderService;

    @RequestMapping("add.do")
    @ResponseBody
    public ServerResponse<OrderVo> add(HttpSession session){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user ==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),ResponseCode.NEED_LOGIN.getDesc());
        }
        return iOrderService.add(user.getId());
    }

    @RequestMapping("list.do")
    @ResponseBody
    public ServerResponse<OrderVo> list(HttpSession session){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user ==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),ResponseCode.NEED_LOGIN.getDesc());
        }
        return iOrderService.list(user.getId());
    }


}
