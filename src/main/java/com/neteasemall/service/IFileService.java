package com.neteasemall.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    //上传商品文件
    String upload(MultipartFile file, String path);
}
