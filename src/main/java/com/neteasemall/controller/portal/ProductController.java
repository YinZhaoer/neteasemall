package com.neteasemall.controller.portal;

import com.neteasemall.common.ServerResponse;
import com.neteasemall.service.IProductService;
import com.neteasemall.vo.ProductDetailVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * ProductController
 *
 * @author zy
 * @date 2019/3/26
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    private IProductService iProductService;



    @RequestMapping("detail.do")
    @ResponseBody
    public ServerResponse<ProductDetailVo> detail(Integer productId){
        return iProductService.getProductDetail(productId);
    }
}
