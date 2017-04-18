//引入每一个页面所用的js，其实就是每一个模块
var Home = require("./Home");
var Search = require("./Search");
var Buy = require("./Buy");
var User = require("./User");


//引入我们需要的css文件
require("../css/main.scss");
Home.loadHomeHeader();
Home.loadHomeContent();



//User.loadUserHeader();
//User.loadUserContent();

//User.loadUserContent();

//默认显示我们首页的数据
//Home.loadHomeHeader();
//Home.loadHomeContent();
//点击底部导航显示不同的区域---------路由
$("#footer").find("li").on("tap",function(){
	var $index = $(this).index();
	$(this).addClass("acive").siblings().removeClass("acive");
	switch ($index){
		case 0:
			Home.loadHomeHeader();
			Home.loadHomeContent();
			break;
		case 1:		
			Search.loadSearchHeader();
			Search.loadSearchContent();
			break;
		case 2:
			Buy.loadBuyHeader()
			Buy.loadBuyContent();
			break;
		case 3:
			User.loadUserHeader();
			User.loadUserContent();
			break;
		default:
			break;
	}
});
