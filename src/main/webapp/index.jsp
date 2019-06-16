<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<html>
<body id="homePageBody" style="display: none">
<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="css/homePage.css">
<script src="lib/jquery/jquery-2.1.4.min.js"></script>
<script src="lib/jquery/jquery-form.js"></script>
<script src="js/common.js"></script>
<script type="text/javascript">
    window.onload = function ()//用window的onload事件
    {
        setFunctionBar();
        console.log("set functionbar")
        setHomePage(0)
        console.log("set homepage，刷新一篇才有效？？")



    }
</script>

<div id="functionBar" class="functionBarClass">
    <div id="loginDiv" class="myDiv">
        <span id="loginDiv_span">请</span>
        <a id="loginDiv_href" href="/login.html">[登录]</a>
    </div>

    <div id="cartDiv" class="myDiv" style="display: none">
        <a id=cartDiv_herf" href="/cart.html">购物车</a>
    </div>

    <div id="orderDiv" class="myDiv" style="display: none">
        <a id="orderDiv_herf" href="/order.html">财务</a>
    </div>

    <div id="updateDiv" class="myDiv" style="display: none">
        <a id="updateDiv_herf" href="/updateProduct.html">发布</a>
    </div>


    <div id="homePageDiv" class="myDiv">
        <a id="homePageDiv_herf" href="/">首页</a>
    </div>
</div>

<div id="contentSelectDiv" style="display: none;">
    <a href="#" onclick=setHomePage(0)>所有内容</a>
    <a href="#" onclick=setHomePage(1) style="left: 60%; position: absolute">未购买内容</a>

</div>
<hr style="height:1px;border:none;border-top:1px solid #555555;position: absolute;width: 100%;top:17%"/>
<div id="productContentDiv" class="productContent">
    <ul id="productContentDiv_ul">
    </ul>

</div>



<div class="wrap-dialog hide">
    <div class="dialog">
        <div class="dialog-header">
            <span class="dialog-title">确认删除</span>
        </div>
        <div class="dialog-body">
            <span class="dialog-message">你确认要删除该商品吗？</span>
        </div>
        <div class="dialog-footer">
            <input type="button" class="btn" id="confirm" value="确认"/>
            <input type="button" class="btn ml50" id="cancel" value="取消"/>
        </div>
    </div>
</div>


</body>
</html>
