sessionStorage //localStorage只能储存字符串，注意json的转换,涉及跳转页面共享变量的使用使用它
var USER_DATA
var MANAGE_PRODUCT_LIST
var FILE_NAME
var SELECT_PRODUCT //点击商品链接后选中的商品信息
var IMAGE_HOST = "http://image.neteasemall.com/"
var UPDATE_FLAG //用于编辑商品的标识
var CART
var ORDER   //订单
var CART_NUMBER//购物车数值设置

function waitting() {
    console.log("waitting")
}

function goBack() {
    history.go(-1)
}

function logout() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: "http://localhost:8080/user/logout.do",//url
        url: "/user/logout.do",//url
        data: {},
        success: function (result) {
            if (result.status == 0) {
                USER_DATA = null
                sessionStorage.setItem("USER_DATA", USER_DATA)
                console.log("LOGOUT_SUCCESS");
                document.getElementById("loginDiv_span").innerText = "请"
                document.getElementById("loginDiv_herf").innerText = "[登陆]"
                document.getElementById("loginDiv_href").setAttribute('href', "http://localhost:8080/user/login.do");
                transToLogin()
            }
        },
        error: function () {
            alert("异常！");
        }
    });


}


function transToLogin() {
    console.log("跳转到登陆界面")
    // window.location.href = "http://localhost:8080/login.html";
    window.location.href = "/login.html";
}

function transToUpdateProductPage() {
    // window.location = "http://localhost:8080/updateProduct.html"
    window.location = "/updateProduct.html"
}

function transToHomePage() {
    console.log("跳转到首页")
    // window.location.href = "http://localhost:8080/";
    window.location.href = "/";
}

function transToProductDetailPage() {
    // window.location = "http://localhost:8080/productDetail.html"
    window.location = "/productDetail.html"
}

function transToOrder() {
    console.log("跳转到订单")
    // window.location.href = "http://localhost:8080/order.html";
    window.location.href = "/order.html";

}

function transToCartPage() {
    // window.location = "http://localhost:8080/cart.html "
    window.location = "/cart.html "
}


//获取主页展示商品信息,label0表示所有商品，1表示未购买商品
function getProductInfo(label) {
    if (label == 0) {
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            // url: "http://localhost:8080/manage/product/homepage_list.do", //url
            url:"/manage/product/homepage_list.do",
            data: {"pageNum": 1, "pageSize": 100000},
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.status == 0) {
                    MANAGE_PRODUCT_LIST = result
                    sessionStorage.setItem("MANAGE_PRODUCT_LIST", JSON.stringify(MANAGE_PRODUCT_LIST))
                    createEachProductView()
                    console.log("LOGIN_SUCCESS");
                }
            },
            error: function () {
                alert("异常！");
            }
        });
    }
    else {
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            // url: "http://localhost:8080/manage/product/sold_list.do", //url
            url: "/manage/product/sold_list.do", //url
            data: {"pageNum": 1, "pageSize": 100000},
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.status == 0) {
                    MANAGE_PRODUCT_LIST = result
                    sessionStorage.setItem("MANAGE_PRODUCT_LIST", JSON.stringify(MANAGE_PRODUCT_LIST))
                    createEachProductView()
                    console.log("LOGIN_SUCCESS");
                }
            },
            error: function () {
                alert("异常！");
            }
        })

    }

}


function setFunctionBar() {
    USER_DATA = JSON.parse(sessionStorage.getItem("USER_DATA"))
    console.log(USER_DATA)
    if (USER_DATA != null) {
        var role = USER_DATA.role
        document.getElementById("loginDiv_span").innerText = USER_DATA.username
        document.getElementById("loginDiv_href").setAttribute('onclick', "logout()");
        document.getElementById("loginDiv_href").innerText = "[退出]"
        if (role == 0) {


            document.getElementById("orderDiv").style.display = "block";
            document.getElementById("orderDiv").style.left = "70%";

            document.getElementById("cartDiv").style.display = "block";
            document.getElementById("cartDiv").style.left = "80%";

            document.getElementById("loginDiv").style.left = "20%";

            document.getElementById("homePageDiv").style.left = "60%";

        }

        if (role == 1) {
            document.getElementById("updateDiv").style.display = "block";
            document.getElementById("updateDiv").style.left = "80%";

            document.getElementById("loginDiv").style.left = "20%";

            document.getElementById("homePageDiv").style.left = "70%";

        }
    }
    else {

    }
}

//设置商品细节展示信息
function setProductDetail() {
    var user = JSON.parse(sessionStorage.getItem("USER_DATA"))
    var productDetail = JSON.parse(sessionStorage.getItem("SELECT_PRODUCT"))
    var name = productDetail.name
    var abstract = productDetail.subtitle
    var price = productDetail.price
    var stock = productDetail.stock
    var mainImage = productDetail.mainImage
    var detail = productDetail.detail
    var cartLabel = productDetail.cartLabel
    var sold = productDetail.sold
    var soldPrice = productDetail.soldPrice
    var soldQuantity = productDetail.soldQuantity


    var addToCartButton = document.getElementById("productDetailDiv_buyButton")
    var productName = document.getElementById("productDetailDiv_name")
    productName.innerText = name
    var productAbstract = document.getElementById("productDetailDiv_abstract")
    productAbstract.innerText = abstract
    var productPrice = document.getElementById("productDetailDiv_price")
    productPrice.innerText = "￥" + price
    var productImage = document.getElementById("productDetailDiv_img")
    productImage.setAttribute("src", mainImage)
    var productDetailText = document.getElementById("productDetailDiv_detial_textArea")
    productDetailText.innerText = detail
    var buyDiv = document.getElementById("productDetailDiv_buyDiv")
    var updateButton = document.getElementById("productDetailDiv_updateButton")
    var boughtDiv = document.getElementById("productDetailDiv_boughtDiv")
    var boughtPriceDiv = document.getElementById("productDetailDiv_boughtPrice")
    var soldQuantityDiv = document.getElementById("productDetailDiv_soldQuantity")
    if (user == null) {
        buyDiv.remove()
        boughtDiv.remove()
        boughtPriceDiv.remove()
        soldQuantityDiv.remove()
        updateButton.remove()
        addToCartButton.remove()
    }
    else {
        var role = user.role

        if (role == 0) {
            updateButton.remove();
            soldQuantityDiv.remove();
            if (sold == 2) {
                buyDiv.remove();
                boughtPriceDiv.innerText = "购买时价格：" + "  " + "￥" + soldPrice
            }
            else {
                boughtDiv.remove();
                boughtPriceDiv.remove();
            }
        }
        if (role == 1) {
            buyDiv.remove();
            boughtDiv.remove();
            if (sold == 2) {
                soldQuantityDiv.innerText = "已出售数量:" + " " + soldQuantity
            }
            else {
                soldQuantityDiv.remove()
            }

        }
    }


}

//确认弹窗函数
function setConfirm(message, e) {
    console.log(message);

    var message = message
    if (message == "product") {
        dialogBox(
            function () {
                console.log("product confirmed");
                addToCart()
            },
            function () {
                console.log("product canceled");
                // do something
            }
        );
    }

    if (message == "cart") {
        dialogBox(
            function () {
                console.log("cart confirmed");
                putToOrder()
            },
            function () {
                console.log("cart canceled");
                // do something
            }
        );

    }
    if (message = "deleteProduct") {
        dialogBox(
            function () {
                console.log("deleteProduct confirmed");
                delectProduct(e)
            },
            function () {
                console.log("deleteProduct canceled");
                // do something
            }
        );
    }

}


//确认弹窗函数
function dialogBox(yesCallback, noCallback) {

    // 显示遮罩和对话框
    $('.wrap-dialog').removeClass("hide");
    // 确定按钮
    $('#confirm').click(function () {
        $('.wrap-dialog').addClass("hide");
        yesCallback();
    });
    // 取消按钮
    $('#cancel').click(function () {
        $('.wrap-dialog').addClass("hide");
        noCallback();
    });
}


//点击登陆按钮后执行
function afterLogin() {
    var form = document.getElementById("loginForm")
    var formdata = new FormData(form)
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: "http://localhost:8080/user/login.do",//url
        url: "/user/login.do",//url
        // data: $('#loginForm').serialize(),
        data: formdata,
        processData: false,   //  告诉jquery不要处理发送的数据，这两项都是使用formdata时需要注意添加的
        contentType: false,   //  告诉jquery不要设置content-Type请求头
        success: function (result) {
            USER_DATA = result.data
            sessionStorage.setItem("USER_DATA", JSON.stringify(USER_DATA))
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                console.log("LOGIN_SUCCESS");
            }
            transToHomePage()

        },
        error: function () {
            alert("异常！");
        }
    });

}


//设置首页的展示内容
function setHomePage(label) {
    //去除已有的li
    $("li").remove();
    var userData = JSON.parse(sessionStorage.getItem("USER_DATA"))
    if (userData != null) {
        var role = userData.role;
        if (role == 0) {
            document.getElementById("contentSelectDiv").style.display = "block"

        }
    }
    getProductInfo(label);
    document.getElementById("homePageBody").style.display = "block"


}

//循环创建商品，label0表示展示所有商品，label1表示只展示未购买内容
function createEachProductView() {
    var userData = JSON.parse(sessionStorage.getItem("USER_DATA"))
    var productContentDivUl = document.getElementById("productContentDiv_ul")
    var productListJson = JSON.parse(sessionStorage.getItem("MANAGE_PRODUCT_LIST"))
    var productList = productListJson.data.list;
    var listLength = productList.length
    for (var i = 0; i < listLength; i++) {
        var li = createLi(userData, productList[i], i)
        productContentDivUl.appendChild(li)

    }

}

//生成商品的li
function createLi(userData, product, i) {
    var name = product.name
    var price = product.price
    var productImgSrc = product.mainImage
    var sold = product.sold;
    var soldPrice = product.soldPrice
    var productId = product.id;
    var cartLabel = product.cartLabel;

    var li = document.createElement("li");
    var id = product.id
    li.setAttribute("id", "li" + id)
    var href = document.createElement("href")
    var imgDiv = createImgDiv(productImgSrc, i)
    var nameDiv = createNameDiv(name, i)
    var priceDiv = createPriceAndDeleteDiv(userData, price, productId, cartLabel, sold, i, href)
    var labelDiv = createLabel(userData, cartLabel, sold, i)
    var liLeft = i % 4 * (40 / 3 + 15) + "%"
    var liTop = (parseInt(i / 4)) * 48 + 3 + "%"
    li.style.left = liLeft
    li.style.top = liTop
    href.setAttribute("id", id)
    href.setAttribute("class", "productHref")
    href.onclick = function () {
        getProudctDetailById(id, this)
    }
    li.appendChild(href)
    href.appendChild(imgDiv)
    href.appendChild(nameDiv)
    href.appendChild(priceDiv)
    href.appendChild(labelDiv)
    return li


}


function createImgDiv(productImgSrc, i) {
    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("id", "imgDiv" + i)
    imgDiv.setAttribute("class", "imgDiv")
    var img = document.createElement("img")
    img.setAttribute("src", productImgSrc)
    img.setAttribute("id", "img" + i)
    img.setAttribute("height", "100%")
    img.setAttribute("width", "100%")
    imgDiv.appendChild(img)
    var imgTop = "0%"
    imgDiv.style.top = imgTop;
    return imgDiv


}


//创建已购买和已出售的标志
function createLabel(userData, cartLabel, sold, i) {
    var labelDiv = document.createElement("div");
    labelDiv.style.display = "none"
    labelDiv.setAttribute("id", "labelDiv" + i)
    labelDiv.setAttribute("class", "labelDiv")
    var h = document.createElement("h")
    if (userData != null && sold == 2) {
        labelDiv.style.display = "block"
        var role = userData.role;
        if (role == 0) {
            h.innerText = "已购买"
        }
        if (role == 1) {
            h.innerText = "已出售"
        }
        labelDiv.appendChild(h)
    }
    if (cartLabel == 1 && userData != null) {//加入购物车但没购买，此时卖家删除商品时要注意提醒
        var role = userData.role;
        labelDiv.style.display = "block"
        if (role == 0) {
            h.innerText = "已加入购物车"
        }
        if (role == 1) {
            h.innerText = "已被加入购物车"
        }
        labelDiv.appendChild(h)
    }

    return labelDiv
}

function createNameDiv(name, i) {
    var nameDiv = document.createElement("div");
    nameDiv.setAttribute("id", "nameDiv" + i)
    nameDiv.setAttribute("class", "nameDiv")
    var h = document.createElement("h")
    h.innerText = name
    var nameTop = "70%"
    nameDiv.style.top = nameTop;
    nameDiv.appendChild(h)
    return nameDiv


}


function createPriceAndDeleteDiv(userData, price, productId, cartLabel, sold, i, href) {
    // console.log(price)
    var role
    if (userData != null) {
        role = userData.role
    }
    var priceTop = (parseInt(i / 4) + 1) * 38 + "%"
    var priceDiv = document.createElement("div");
    priceDiv.style.top = "85%";
    priceDiv.setAttribute("id", "priceDiv" + i)
    priceDiv.setAttribute("class", "priceDiv")
    var span = document.createElement("span");
    span.innerText = "￥" + price
    priceDiv.appendChild(span)
    if (sold == 1 && role == 1) {
        var deleteButton = document.createElement("button")
        deleteButton.setAttribute("productId", productId)
        deleteButton.setAttribute("cartLabel", cartLabel)
        deleteButton.setAttribute("id", "deleteButton" + productId)
        deleteButton.setAttribute("class", "deleteButton")
        deleteButton.style.position = "absolute"
        deleteButton.onclick = function () {
            href.setAttribute("transFlag", 0)//删除时不跳转
            setConfirm("deleteProduct", this)
        }
        deleteButton.innerText = "删除"
        priceDiv.appendChild(deleteButton)
    }
    return priceDiv

}


//删除商品
function delectProduct(e) {
    var cartLabel = e.getAttribute("cartLabel")
    var productId = e.getAttribute("productId")
    if (cartLabel == 1) {
        $.ajax({
            //几个参数需要注意一下
            async: false,//防止重复发送请求
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            // url: " http://localhost:8080/cart/delete_product.do",//url
            url: "cart/delete_product.do",//url
            data: {"productId": productId},
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.status == 0) {
                    console.log("DELETE_CART_PRODUCT_SUCESS");
                }
            },
            error: function () {
                alert("异常！");
            }
        });

    }
    $.ajax({
        //几个参数需要注意一下
        async: false,//防止重复发送请求
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: " http://localhost:8080/manage/product/delete.do",//url
        url: "/manage/product/delete.do",//url
        data: {"productId": productId},
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                console.log("DELETE_SUCESS");
            }
            transToHomePage()

        },
        error: function () {
            console.log(formdata)
            alert("异常！");
        }
    });


}


//点击发布之后发生
function afterReleaseProduct(id) {
    var form = document.getElementById("updateForm")
    var formdata = new FormData(form)
    var fileName = sessionStorage.getItem("FILE_NAME")
    formdata.set("mainImage", fileName)


if (id != -1) {
    var product=JSON.parse(sessionStorage.getItem("SELECT_PRODUCT"))

    formdata.append("id", id)
    formdata.append("cartLabel",product.cartLabel)
    formdata.append("sold",product.sold)
    formdata.append("soldQuantity",product.soldQuantity)

}
$.ajax({
    //几个参数需要注意一下
    type: "POST",//方法类型
    dataType: "json",//预期服务器返回的数据类型
    // url: "http://localhost:8080/manage/product/save.do",//url
    url: "/manage/product/save.do",//url
    data: formdata,
    processData: false,   //  告诉jquery不要处理发送的数据，这两项都是使用formdata时需要注意添加的
    contentType: false,   //  告诉jquery不要设置content-Type请求头
    success: function (result) {
        console.log(result);//打印服务端返回的数据(调试用)
        if (result.status == 0) {
            console.log("RELEASE_SUCCESS");
        }
        transToHomePage()
    },
    error: function () {
        console.log(formdata)
        alert("异常！");
    }
});

}

function showImageFile(){
    document.getElementById("ImageFile_p").style.display="block"
    document.getElementById("ImageURL_p").style.display="none"

}

function showImageURL(){
    document.getElementById("ImageFile_p").style.display="none"
    document.getElementById("ImageURL_p").style.display="block"

}

function upLoadImageToFTP() {
    var imageForm = document.getElementById("updateForm")
    var file = new FormData(imageForm).get("mainImage")
    var imageFormData = new FormData()
    imageFormData.append("upload_file", file)
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: "http://localhost:8080/manage/product/upload.do",//url
        url: "/manage/product/upload.do",//url
        data: imageFormData,
        processData: false,   //  告诉jquery不要处理发送的数据，这两项都是使用formdata时需要注意添加的
        contentType: false,   //  告诉jquery不要设置content-Type请求头
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                console.log("UPLOAD IMAGE TO FTPSERVER SUCESS")
                FILE_NAME = result.data.uri
                sessionStorage.setItem("FILE_NAME", IMAGE_HOST+FILE_NAME)
                console.log(FILE_NAME)
                var img = document.getElementById("updateImage")
                img.setAttribute("src", IMAGE_HOST+FILE_NAME)
                // return JSON.stringify(uri) ajax的return不会获取返回值
            }
        },
        error: function () {
            alert("异常！");
        }
    });


}

function showImageByURL() {
    var inputURL=document.getElementById("productImageURL")
    FILE_NAME = inputURL.value
    sessionStorage.setItem("FILE_NAME", FILE_NAME)
    var img = document.getElementById("updateImage")
    img.setAttribute("src",FILE_NAME)
    
}


//通过点击链接的id获取商品detail
function getProudctDetailById(id, e) {
    var user = JSON.parse(sessionStorage.getItem("USER_DATA"))
    if (user == null) {
        console.log("未登陆点击商品")
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            // url: "http://localhost:8080/manage/product/detail.do",//url
            url: "/manage/product/detail.do",//url
            // data: $('#loginForm').serialize(),
            data: {"productId": id},
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.status == 0) {
                    SELECT_PRODUCT = result.data
                    sessionStorage.setItem("SELECT_PRODUCT", JSON.stringify(SELECT_PRODUCT))
                    console.log("GET PRODUCT DETAIL");
                    transToProductDetailPage()
                }

            },
            error: function () {
                alert("异常！");
            }
        });

    }
    else {
        var role = user.role
        if (role == 1) {
            if (e.getAttribute("transFlag") == 0) {
                e.setAttribute("transFlag", 1)
            }
            else {
                console.log("卖家点击商品")
                $.ajax({
                    //几个参数需要注意一下
                    type: "POST",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    // url: "http://localhost:8080/manage/product/detail.do",//url
                    url: "/manage/product/detail.do",//url
                    // data: $('#loginForm').serialize(),
                    data: {"productId": id},
                    success: function (result) {
                        console.log(result);//打印服务端返回的数据(调试用)
                        if (result.status == 0) {
                            SELECT_PRODUCT = result.data
                            sessionStorage.setItem("SELECT_PRODUCT", JSON.stringify(SELECT_PRODUCT))
                            console.log("GET PRODUCT DETAIL");
                           transToProductDetailPage()
                        }

                    },
                    error: function () {
                        alert("异常！");
                    }
                });
            }

        }
        if (role == 0) {
            console.log("买家点击商品")
            $.ajax({
                //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                // url: "http://localhost:8080/product/detail.do",//url
                url: "/product/detail.do",//url
                // data: $('#loginForm').serialize(),
                data: {"productId": id},
                success: function (result) {
                    console.log(result);//打印服务端返回的数据(调试用)
                    if (result.status == 0) {
                        SELECT_PRODUCT = result.data
                        sessionStorage.setItem("SELECT_PRODUCT", JSON.stringify(SELECT_PRODUCT))
                        console.log("GET PRODUCT DETAIL");
                        transToProductDetailPage()
                    }

                },
                error: function () {
                    alert("异常！");
                }
            });
        }
    }


}


//卖家点击编辑按钮之后
function setFlagAndTrans() {
    UPDATE_FLAG = 1; //代表需要执行以后商品的信息更新
    sessionStorage.setItem("UPDATE_FLAG", UPDATE_FLAG)
    transToUpdateProductPage()

}

//从详情进入编辑时填充数据
function setUpdateProduct() {
    var flag = sessionStorage.getItem("UPDATE_FLAG")
    if (flag == 0) {
        var btRelease = document.getElementById("productReleaseBt")
        btRelease.style.display = "block"
        var btUpdate = document.getElementById("productUpdateBt")
        btUpdate.style.display = "none"
        console.log("发布界面")
    }
    if (flag == 1) {
        console.log("更新界面")
        var productDetail = JSON.parse(sessionStorage.getItem("SELECT_PRODUCT"))
        var name = productDetail.name
        var abstract = productDetail.subtitle
        var price = productDetail.price
        var stock = productDetail.stock
        var mainImage = productDetail.mainImage
        var detail = productDetail.detail
        var cartLabel = productDetail.cartLabel

        var productName = document.getElementById("productName")
        productName.setAttribute("value", name)
        var productAbstract = document.getElementById("productAbstract")
        productAbstract.setAttribute("value", abstract)
        var productPrice = document.getElementById("productPrice")
        productPrice.setAttribute("value", price)
        var productImage = document.getElementById("updateImage")
        productImage.setAttribute("src",mainImage)
        FILE_NAME=mainImage
        sessionStorage.setItem("FILE_NAME",FILE_NAME)
        var productDetail = document.getElementById("productDetail")
        productDetail.innerText = detail
        var img = document.getElementById("updateImage")
        img.setAttribute("src", mainImage)
        sessionStorage.setItem("UPDATE_FLAG", 0)
        var btRelease = document.getElementById("productReleaseBt")
        btRelease.style.display = "none"
        var btUpdate = document.getElementById("productUpdateBt")
        btUpdate.style.display = "block"

    }
}

//点击更新按钮之后调用，调用传送了id的release即可
function afterUpdateProduct() {
    var productDetail = JSON.parse(sessionStorage.getItem("SELECT_PRODUCT"))
    var id = productDetail.id;
    afterReleaseProduct(id)


}


//用户在详情界面点击购买将商品加入购物车
function addToCart() {
    var count = parseInt(document.getElementById("productDetailDiv_count").innerText)
    if (count > 0) {
        var productDetail = JSON.parse(sessionStorage.getItem("SELECT_PRODUCT"))
        var productId = productDetail.id;
        var price = productDetail.price
        var formdata = new FormData()
        formdata.append("productId", productId)
        formdata.append("count", count)
        // formdata.append("price", price)

        $.ajax({
            //几个参数需要注意一下
            async: false,//防止重复发送请求
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            // url: " http://localhost:8080/cart/add.do",//url
            url: "/cart/add.do",//url
            data: formdata,
            processData: false,   //  告诉jquery不要处理发送的数据，这两项都是使用formdata时需要注意添加的
            contentType: false,   //  告诉jquery不要设置content-Type请求头
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.status == 0) {
                    console.log("ADD_TO_CART_SUCCESS");
                }
            },
            error: function () {
                console.log(formdata)
                alert("异常！");
            }
        });
    }
    else {
        alert("请设置购买个数")
        transToProductDetailPage()
    }

}

//设置购买数量
function setCount(e, countLabel) {
    var divId = e.getAttribute("count")
    var countDiv = document.getElementById(divId)
    console.log("setCount")
    var count = countDiv.innerText
    if (countLabel == 0) {
        if (count > 1) {
            count--;
        }

    }
    if (countLabel == 1) {
        count++;
    }
    countDiv.innerText = count


}


//获取购物车信息
function getCartInfo() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: "http://localhost:8080/cart/list.do",//url
        url: "/cart/list.do",//url
        processData: false,   //  告诉jquery不要处理发送的数据，这两项都是使用formdata时需要注意添加的
        contentType: false,   //  告诉jquery不要设置content-Type请求头
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                var cart = result.data
                sessionStorage.setItem("CART", JSON.stringify(cart))
                setCart()
                console.log("GET_CART_INFO");
            }
        },
        error: function () {
            alert("异常！");
        }
    });


}

//获取数据后生成购物车界面
function setCart() {
    // getCartInfo()
    var cart = JSON.parse(sessionStorage.getItem("CART"))
    var cartProductList = cart.cartProductVoList
    var cartTotalPrice = cart.cartTotalPrice
    var noneCartDiv = document.getElementById("noCartShowDiv")
    var cartContentDiv = document.getElementById("cartShowDiv")
    if (cartProductList.length == 0) {
        cartContentDiv.style.display = "none"
        noneCartDiv.style.display = "block"
    }
    else {
        cartContentDiv.style.display = "block"
        noneCartDiv.style.display = "none"
        createCartContent(cartProductList)
        // createCartCountSet(cartProductList)
    }


}

//生成购物车界面
function setCartPage() {
    getCartInfo()
    document.getElementById("cartBodyDiv").style.display = "block"
}


//生成购物车内容
function createCartContent(cartProductList) {
    var cartShowTable = document.getElementById("cartShowDiv_table")
    var btTop
    for (var i = 0; i < cartProductList.length; i++) {
        var cartProduct = cartProductList[i]
        var productId = cartProduct.productId
        var productName = cartProduct.productName
        var productCount = cartProduct.quantity
        var productPrice = cartProduct.productPrice
        var productTotalPrice = cartProduct.productTotalPrice
        var productTr = document.createElement("tr")
        var trTop = (i + 1) * 4.3 + "%"
        productTr.style.top = trTop
        productTr.setAttribute("id", "tr" + productId)
        productTr.setAttribute("class", "cartProductTr")
        var tdArray = creatCartTd(productId, productName, productCount, productPrice, i)
        productTr.appendChild(tdArray[0])
        productTr.appendChild(tdArray[1])
        productTr.appendChild(tdArray[2])


        var delectButton = document.createElement("button")
        delectButton.setAttribute("productId", productId)
        delectButton.setAttribute("id", "cartDelectButton" + productId)
        delectButton.style.position = "absolute"
        delectButton.setAttribute("class", "cartDeleteProductButton")
        delectButton.onclick = function () {
            delectCartProduct(this)
        }
        delectButton.innerText = "删除"
        productTr.appendChild(delectButton)


        cartShowTable.appendChild(productTr)
        btTop = (i + 1) * 4.3 + 4.5 + "%"
    }
    var buyButton = document.createElement("button")
    buyButton.setAttribute("class", "submitButton")
    buyButton.setAttribute("id", "cartBuyButton")
    buyButton.innerText = "购买"
    buyButton.onclick = function () {
        setConfirm("cart", this)
    }
    buyButton.style.top = btTop
    cartShowTable.appendChild(buyButton)

    var cancelButton = document.createElement("button")
    cancelButton.setAttribute("class", "submitButton")
    cancelButton.setAttribute("id", "cartCancelButton")
    cancelButton.innerText = "退出"
    cancelButton.onclick = function () {
        history.go(-1)
    }
    cancelButton.style.top = btTop
    cartShowTable.appendChild(cancelButton)


}

//删除一条购物车记录
function delectCartProduct(e) {
    var productId = e.getAttribute("productId")
    $.ajax({
        //几个参数需要注意一下
        async: false,//防止重复发送请求
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: " http://localhost:8080/cart/delete_product.do",//url
        url: "/cart/delete_product.do",//url
        data: {"productId": productId},
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                console.log("DELETE_CART_PRODUCT_SUCESS");
            }
            transToCartPage()
        },
        error: function () {
            alert("异常！");
        }
    });

}

//生成购物车的数量设置按键,暂时弃用
function createCartCountSet(cartProductList) {
    for (var j = 0; j < cartProductList.length; j++) {
        var cartProduct = cartProductList[j]
        var productId = cartProduct.productId
        var cartProductTr = document.getElementById("tr" + productId)
        var aTop = (j + 1) * 4 + "%"

        var increaseA = document.createElement("a")
        increaseA.setAttribute("id", "increaseAdd" + productId)
        increaseA.setAttribute("class", "cartSetCount")
        increaseA.setAttribute("count", "countTd" + productId)
        increaseA.onclick = function () {
            setCount(this, 1)
        }
        increaseA.innerText = "+"
        increaseA.style.left = "53%"
        increaseA.style.top = aTop
        cartProductTr.appendChild(increaseA)

        var decreaseA = document.createElement("a")
        decreaseA.setAttribute("id", "decreaseAdd" + productId)
        decreaseA.setAttribute("class", "cartSetCount")
        decreaseA.setAttribute("count", "countTd" + productId)
        decreaseA.onclick = function () {
            setCount(this, 0)
        }
        decreaseA.innerText = "-"
        decreaseA.style.left = "43%"
        decreaseA.style.top = aTop
        cartProductTr.appendChild(decreaseA)
    }


}


//得到购物车tr中的三个td
function creatCartTd(productId, productName, productCount, productPrice, i) {
    var tdArray = new Array();
    var nameTd = document.createElement("td")
    nameTd.setAttribute("class", "cartNameTd")
    nameTd.innerText = productName

    var countTd = document.createElement("td")
    countTd.setAttribute("class", "cartCountTd")
    countTd.setAttribute("id", "countTd" + productId)
    countTd.innerText = productCount

    var priceTd = document.createElement("td")
    priceTd.setAttribute("class", "cartPriceTd")
    priceTd.innerText = productPrice

    tdArray.push(nameTd)
    tdArray.push(countTd)
    tdArray.push(priceTd)
    return tdArray


}

//将购物车中的内容放到订单中
function putToOrder() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: " http://localhost:8080/order/add.do",//url
        url: "/order/add.do",//url
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                var cart = result.data
                console.log(cart);
            }
        },
        error: function () {
            alert("异常！");
        }
    });

    transToOrder()
    setCart()

}


//获取订单信息
function getOrderInfo() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        // url: "http://localhost:8080/order/list.do",//url
        url: "/order/list.do",//url
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.status == 0) {
                var order = result.data
                sessionStorage.setItem("ORDER", JSON.stringify(order))
                setOrder()
                console.log("GET_ORDER_INFO");
            }
        },
        error: function () {
            alert("异常！");
        }
    });
}


//获取信息后生成订单界面
function setOrder() {
    // getOrderInfo()
    var order = JSON.parse(sessionStorage.getItem("ORDER"))
    if (order.length == 0) {
        document.getElementById("noOrderDiv").style.display = "block";
        document.getElementById("rderShowDiv").style.display = "none";
    }
    else {
        document.getElementById("noOrderDiv").style.display = "none";
        document.getElementById("orderShowDiv").style.display = "block";
        var orderProductList = order.orderProductList
        var totalPrice = order.totalPrice
        creatOrderContent(totalPrice, orderProductList)
    }

}

//设置订单界面
function setOrderPage() {
    getOrderInfo()
    document.getElementById("orderBodyDiv").style.display = "block"
}

//生成订单内容
function creatOrderContent(totalPrice, orderProductList) {
    var btTop
    var orderShowTable = document.getElementById("orderShowDiv_table")
    for (var i = 0; i < orderProductList.length; i++) {
        var orderProduct = orderProductList[i]
        var productId = orderProduct.productId
        var prdouctImage = orderProduct.mainImage
        var productName = orderProduct.productName
        var productCreateTime = datetimeFormat(orderProduct.createTime)
        var productCount = orderProduct.quantity
        var productPrice = orderProduct.price
        var productTr = document.createElement("tr")
        var trTop = (i + 1) * 6 + "%"
        productTr.style.top = trTop
        productTr.setAttribute("id", "tr" + productId)
        productTr.setAttribute("class", "orderProductTr")
        var tdArray = createOrderTd(productId, prdouctImage, productName, productCreateTime, productCount, productPrice, i)
        productTr.appendChild(tdArray[0])
        productTr.appendChild(tdArray[1])
        productTr.appendChild(tdArray[2])
        productTr.appendChild(tdArray[3])
        productTr.appendChild(tdArray[4])
        orderShowTable.appendChild(productTr)
        btTop = (i + 2) * 6 + "%"
    }


    var totalPriceTr = document.createElement("tr")
    totalPriceTr.setAttribute("id", "totalPriceTr")
    totalPriceTr.setAttribute("class", "totalPriceTr")
    var totalPriceTd = document.createElement("td")
    totalPriceTd.setAttribute("class", "orderPriceTd")
    totalPriceTd.innerText = "总价" + "  " + "￥" + totalPrice
    totalPriceTr.appendChild(totalPriceTd)
    totalPriceTr.style.top = btTop
    orderShowTable.appendChild(totalPriceTr)


}

//得到订单tr中的5个td
function createOrderTd(productId, productImage, productName, productCreateTime, productCount, productPrice, i) {
    var tdArray = new Array();
    var tdTop = (1 + i) * 9 + "%"


    var imageTd = document.createElement("img")
    imageTd.setAttribute("class", "orderImageTd")
    imageTd.setAttribute("src", productImage)

    var nameTd = document.createElement("td")
    nameTd.setAttribute("class", "orderNameTd")
    nameTd.innerText = productName

    var timeTd = document.createElement("td")
    timeTd.setAttribute("class", "orderTimeTd")
    timeTd.innerText = productCreateTime

    var countTd = document.createElement("td")
    countTd.setAttribute("class", "orderCountTd")
    countTd.innerText = productCount


    var priceTd = document.createElement("td")
    priceTd.setAttribute("class", "orderPriceTd")
    priceTd.innerText = "￥" + productPrice

    tdArray.push(imageTd)
    tdArray.push(nameTd)
    tdArray.push(timeTd)
    tdArray.push(countTd)
    tdArray.push(priceTd)
    return tdArray
}

//转换日期
function datetimeFormat(longTypeDate) {
    var datetimeType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    datetimeType += date.getFullYear();   //年
    datetimeType += "-" + getMonth(date); //月
    datetimeType += "-" + getDay(date);   //日
    datetimeType += "  " + getHours(date);   //时
    datetimeType += ":" + getMinutes(date);      //分
    datetimeType += ":" + getSeconds(date);      //分
    return datetimeType;
}

function getMonth(date) {
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
function getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}

//返回小时
function getHours(date) {
    var hours = "";
    hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    return hours;
}

//返回分
function getMinutes(date) {
    var minute = "";
    minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
}

//返回秒
function getSeconds(date) {
    var second = "";
    second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return second;
}





    
