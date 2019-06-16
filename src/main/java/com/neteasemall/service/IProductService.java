package com.neteasemall.service;

import com.github.pagehelper.PageInfo;
import com.neteasemall.common.ServerResponse;
import com.neteasemall.pojo.Product;
import com.neteasemall.vo.ProductDetailVo;

public interface IProductService {

    ServerResponse saveOrUpdateProduct(Product product);

    ServerResponse<String> setSaleStatus(Integer productId, Integer status);

    ServerResponse<ProductDetailVo> manageProductDetail(Integer productId);

    ServerResponse<PageInfo> getProductList(int pageNum, int pageSize);

    ServerResponse<PageInfo> getProductSold(int pageNum, int pageSize);

    ServerResponse <String> deleteProduct(Integer productId);

    ServerResponse<ProductDetailVo> getProductDetail(Integer productId);
}
