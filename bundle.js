/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//引入每一个页面所用的js，其实就是每一个模块
	var Home = __webpack_require__(1);
	var Search = __webpack_require__(4);
	var Buy = __webpack_require__(5);
	var User = __webpack_require__(10);


	//引入我们需要的css文件
	__webpack_require__(13);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = {
		//加载的首页的头部区域
		loadHomeHeader:function(){
			//load()方法去加载我们需要的内容
			$("#header").load("html/home.html #homeHeader",function(){
				//console.log("ok")
			})
		},
		//加载的首页的内容区域
		loadHomeContent:function(){		
			$("#content").load("html/home.html #homeContent",function(){
				$(".list_ul li").tap(function(){
					var $index=$(this).index();	
					$(this).addClass("list_act").siblings().removeClass("list_act");
					$(".list_product>div").eq($index).removeClass("hid").siblings().addClass("hid");
					var classID=$index;			
					$.ajax({
						type:"get",
						url:" http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
						dataType:"jsonp",
						data:{
							"classID":classID	
						},
						success:function(data){
							var len=data.length;
							$(".list_pro").html("");
							for(var i=0;i<len;i++){
								var ImgSrc=data[i].goodsListImg;
								var price=data[i].price;
								var discount=data[i].discount;
								var proName=data[i].goodsName;
								var goodsID=data[i].goodsID;
								var newPrice=0;
								if(discount=="0"){
									discount=""
									newPrice=price;
									price="";
								}else{
									newPrice=(price*discount/10).toFixed(1);
									discount=discount+"折";
									
									price="￥"+price
								}
								$(".list_pro").append('<dl class="proItem" goodsID="'+goodsID+'">'+
									'<dt>'+
									'<img src="'+ImgSrc+'"/>'+
									'</dt>'+
									'<dd>'+
									'<p>'+
									'<i>￥'+newPrice+'</i>'+
									'<del>'+price+'</del>'+
									'<span>'+discount+'</span>'+
									'</p>'+
									'<span class="pro_spa">'+proName+'</span>'+
									'</dd>'+
								'</dl>');	
							}
							$(".proItem").on("tap",function(){
								var goodsID=$(this).attr("goodsID");
								//console.log(goodsID)
								var Detail=__webpack_require__(2);
									Detail.loadDetailHeader("home",goodsID);
									Detail.loadDetailContent(goodsID);
									Detail.loadDetailFooter();
									$("#detailfooter").show()
							})
						}
					});
				});
				$(".list_ul li").eq(0).trigger("tap");
				var swiper=new Swiper(".swiper-container",{
					autoplay:3000,
					loop:true,
					autoplayDisableOnInteraction:false,
					pagination:'.swiper-pagination'
				});	
				setTimeout(function () {
					var a=$(".list_ul").offset().top;
					$(".list_ul").attr("top",a)
				},400)
				
				function timerFunction() {
					var a= $("section").scrollTop();
					var b=$(".list_ul").attr("top")-$(".list_ul").height();
					if(a>b){
						$(".list_ul").addClass("fixed");
					}
					else{
						$(".list_ul").removeClass('fixed')
					}
				}
				
				$("section").scroll(function () {
					timerFunction()
				})			
			})		
			$("#indexfooter").show();
			$("#detailFooter").hide();
			$("#footer li").eq(0).addClass("active").siblings().removeClass("active");
		},
		loadHomeFooter:function(){
			//load()方法去加载我们需要的内容
			$("#footer").load("html/home.html #indexfooter",function(){
				//console.log("ok")
			})
		}
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//var str = "我是首页";
	//module.exports = str;
	var mySwiper, goodsID1;
	module.exports = {
		loadDetailHeader: function(type, classID,type1) {
			$("#header").load("html/detail.html #detailHeader", function() {
				$("#back").on("tap", function() {
					if(type == "home") {
						var Home = __webpack_require__(1);
						Home.loadHomeHeader();
						Home.loadHomeContent();
					}
					else if(type=="list"){
						var List=__webpack_require__(3);
						if(type1=="type1"){
							List.loadListHeader("buy",classID);
							List.loadListContent("buy",classID);	
						}
						else{
							List.loadListHeader("search",classID);
							List.loadListContent("search",classID);						
						}
						$("#indexfooter").show();
						$("#detailfooter").hide();
						
					}
					else if(type=='buy'){
						var Buy=__webpack_require__(5);
						Buy.loadBuyHeader();
						Buy.loadBuyContent();
					}
				})
			})
		},

		loadDetailContent: function(goodsID) {
			$("#content").load("html/detail.html #detailContent", function() {
				goodsID1 = goodsID;
				$.ajax({
					type: "get",
					url: "http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
					dataType: "jsonp",
					data: {
						"goodsID": goodsID
					},
					beforeSend:function(){
						$("#onload").show();
					},
					success: function(data) {
						$("#onload").hide();
						//console.log(data)
						var goodsBenUrl = JSON.parse(data[0].goodsBenUrl);
						var html = "";
						for(var i = 0; i < goodsBenUrl.length; i++) {
							html += '<div class="swiper-slide">' +
								'<img src="' + goodsBenUrl[i] + '"/>' +
								'</div>'
						}
						$("#detail-swiper").html(html);
						var goodsName = data[0].goodsName;
						var price = data[0].price * 1;
						var discount = data[0].discount * 1;
						var newprice;
						if(discount == 0) {
							newprice = price.toFixed(1);
							price = ""
						} else {
							newprice = (price * discount / 10).toFixed(1);
							price = "￥" + price;
						}
						$(".proInfo").html('<p>' + goodsName + '</p>' +
							'<p>' +
							'<span>￥</span>' +
							'<b>' + newprice + '</b>' +
							'<span class="dprm"> 店铺热卖</span>' +
							'</p>' +
							'<p><del>' + price + '</del></p>')
						
						var goodsListImg=data[0].goodsListImg;
						$(".proimg").find("img").attr("src",goodsListImg);
						
						
						var detail=data[0].detail;
						$(".list3").html(detail);
						
						var imgsUrl=JSON.parse(data[0].imgsUrl);
						$(".list4").html("");
						for(var i=0;i<imgsUrl.length;i++){
							$(".list4").append('<img src="'+imgsUrl[i]+'"/>')
						}
						//console.log(imgsUrl)
						var mySwiper = new Swiper('.swiper-container', {
							loop: true,
							pagination: '.swiper-pagination',
							autoplayDisableOnInteraction: false,
						})
					}
				});
				$(".left").tap(function() { //跳转到注册页面
					var Buy = __webpack_require__(5);
					Buy.loadBuyHeader();
					Buy.loadBuyContent();
				});

			})
		},
		loadDetailFooter: function() {
			$("#indexfooter").hide();
			$("#detailfooter").show();
			$("#detailfooter").load("html/detail.html #detailFooter", function() {
				$(".addcart").tap(function() {
					var goodsID = goodsID1;
					if(localStorage.getItem("userID")) {
						var userID = localStorage.getItem("userID");
						var AddCart = __webpack_require__(7);
						var number = 1;
						$.ajax({
							type: "get",
							url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
							dataType: "jsonp",
							data: {
								"userID": userID
							},
							success: function(data) {
								if(data == "0") {
									number = 1;
								} else {
									var len = data.length;
									for(var i = 0; i < len; i++) {
										if(goodsID == data[i].goodsID) {
											var num = data[i].number * 1;
											number += num;
										}
									}
								}
								var type;
								if(number >= 5) {
									number = 5;
									type = "max";
								}
								AddCart.addcart(userID, goodsID, number, type);
							}
						});
					} else {
						var Login = __webpack_require__(8);
						Login.loadLoginHeader("detail",goodsID);
						Login.loadLoginContent("detail",goodsID);
						$("#detailfooter").hide();
						$("#indexfooter").show();
					}
				})
			})
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadListHeader:function(type){
		   $("#header").load("html/list.html #listHeader",function(){
		   	$("#back").tap(function () {
		   		 if(type=='search'){
		   			var Search=__webpack_require__(4);
		   			Search.loadSearchHeader('search');
		   			Search.loadSearchContent("search");
		   	   }
		   		 else if(type=="buy"){
		   		 	var Buy=__webpack_require__(5);
		   		 	Buy.loadBuyHeader();
		   		 	Buy.loadBuyContent();
		   		 }
		   	})	   	  
		   })
		},
		loadListContent:function(type,classID,type1){
			$("#content").load("html/list.html #listContent",function(){
				$(".change-listMain-info").html("");
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
					dataType:"jsonp",
					data:{
						"classID":classID
					},
					success:function(data){
						var Toast=__webpack_require__(6);
						//console.log(typeof data)
						if(data=="0"){
							Toast.toast("暂无商品");
						}
						else{
							var len=data.length;
							$(".listMain-info").html("");
							for(var i=0;i<len;i++){
								var goodsID=data[i].goodsID;
								var goodsListImg=data[i].goodsListImg;
								var goodsName=data[i].goodsName;
								var price=data[i].price*1;
								var discount=data[i].discount*1;
								var newprice;
								if(discount==0){
									newprice=price;
								}
								else{
									newPrice=(price*discount/10).toFixed(1);
								}
							
								$(".listMain-info").append('<li goodsID="'+goodsID+'">'+
									'<p><img src="'+goodsListImg+'" /></p>'+
									'<p>'+goodsName+'</p>'+
									'<p><span>1212</span><span>购物券</span><span>￥</span><span>店铺红包</span></p>'+
										
									'<p><span>￥'+newPrice+'</span><del>￥'+price+'</del></p>'+
										
									'<p><span>月销115</span><span>包邮</span><span>热卖</span></p>'+
										
								'</li>');
								$(".change-listMain-info").append('<li goodsID="'+goodsID+'">'+
									'<div class="left"><img src="'+goodsListImg+'" /></div>'+
									'<div class="right">'+
										'<p>'+goodsName+'</p>'+
										'<p><span>1212</span><span>购物券</span><span>￥</span><span>店铺红包</span></p>'+
											
										'<p><span>￥'+newPrice+'</span><del>￥'+price+'</del></p>'+
										'<p><span>月销115</span><span>包邮</span><span>热卖</span></p>'+
									'</div>'+
									
								'</li>')
								
							}
						}
						$(".listMain-info li").tap(function () {
							var goodsID=$(this).attr("goodsID");
							var Detail=__webpack_require__(2);
							Detail.loadDetailHeader('list',classID,type1);
							Detail.loadDetailContent(goodsID,classID);
							Detail.loadDetailFooter();
							$("#detailfooter").show()
						})
						$(".change-listMain-info li").tap(function () {
							var goodsID=$(this).attr("goodsID");
							var Detail=__webpack_require__(2);
							Detail.loadDetailHeader("list",classID);
							Detail.loadDetailContent(goodsID,classID,type1);
							Detail.loadDetailFooter();
							$("#detailfooter").show()
						})
					}
				});
				
				
				
				
				
				var count=0;
				$("#changeList").on("tap",function(){
					count++;
					if(count%2!=0){
						$(".listMain-info").css("display","none")
						$(".change-listMain-info").css("display","block");
						$(".col").show();
						$(".row").hide()
						
					}else{
						$(".change-listMain-info").css("display","none")
						$(".listMain-info").css("display","flex")
					  	 $(".col").hide();
						$(".row").show()
					}
				});
	            $(".back1").on("tap",function(){
	             	if(type=="search"){
	             		var Search=__webpack_require__(4);
	             		Search.loadSearchHeader();
	             		Search.loadSearchContent();
	             	}
	            })
			})
		}
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//module.exports={
	//	loadSearchHeader:function(){
	//		$("#header").load("html/search.html #searchHeader",function () {
	//			
	//		})
	//	},
	//	loadSearchContent:function(){
	//		$("#footer li").eq(1).addClass("active").siblings().removeClass("active");
	//		$("#content").load("html/search.html #searchContent",function(){
	//			console.log("ok")
	//		})
	//	}
	//}

	module.exports={
		loadSearchHeader:function(){
			$("#header").load("html/search.html #searchHeader",function () {
				
			})
		},	
		loadSearchContent:function(){
			var that=this;
			$("#footer li").eq(1).addClass("active").siblings().removeClass("active");
			$("#content").load("html/search.html #searchContent",function(){		
				$(".list li").tap(function () {
					var classID=$(this).parents(".list").attr("classID");
					//console.log(classID)
					var List=__webpack_require__(3);
					List.loadListHeader("search",classID);
					List.loadListContent("search",classID);
				})
				
				setTimeout(function () {
					$(".list-top").each(function () {
						var a1=$(".list-top").eq(0).offset().top;
						var a= $(this).offset().top;
						$(this).attr("top",a-a1);
					})
				},300)
				
				function timerFunction() {
					var b= $("section").scrollTop();
					var len=$(".list-top").length;
					for(var i=0;i<len;i++){
						var a=$(".list-top").eq(i).attr("top")*1;
						var c=a+$(".list-top").eq(i).siblings(".man").height()*1;
						var d=$(".list-top").eq(i).height();
	//					console.log(d)
						if(b>=a&&b<=c){
							$(".list-top").eq(i).addClass("fixed")
						}
	//					else if(b>c&&b<c+d){
	//						$(".list-top").eq(i).css("bottom",b-c-d)
	//					}
						else{
							$(".list-top").eq(i).removeClass("fixed");
						}
					}
				}			
				$("section").scroll(function () {
					timerFunction()
				})	
			})
		}
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = {
		loadBuyHeader:function(){
			$("#header").load("html/buy.html #buyHeader",function(){
				//console.log("ok")
			})
		},
		
		loadBuyContent:function(){
			$("#indexfooter").show();
			$("#detailFooter").hide();
			$("#indexfooter li").eq(2).addClass("active").siblings().removeClass("active");
			$("#content").load("html/buy.html #buyContent",function(){
				$(".buyImg img").tap(function(){
					var classID=$(this).attr("classID")
					var List=__webpack_require__(3);
					List.loadListHeader("buy");
					List.loadListContent("buy",classID,'type1');
				});	
				
			});
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports={
		toast:function (str,time) {
			var time=time?time:2000;
			$("#toast").show();
			$("#toast").html(str);
			setTimeout(function () {
				$("#toast").hide()
			},time)
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		addcart:function (userID,goodsID,number,type) {
			var Toast=__webpack_require__(6);
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:{
					"userID":userID,
					"goodsID":goodsID,
					"number":number
				},
				beforeSend:function () {

				},
				success:function (data) {
				
					if(data=="1"){
						if(type=="no"){
	//						Toast.toast("加入购物车",1000);
						}
						else if(type=="max"){
							Toast.toast("最多购买5件",1000)
						}
						else if(type=="dete"){
							Toast.toast("商品删除成功",1000)
						}else if(type=="pay"){
							Toast.toast("结算成功",1000)
						}
						else{
							Toast.toast("加入购物车",1000);
						}
					}
				}
			});
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadLoginHeader:function(type,goodsID){
			$("#header").load("html/login.html #loginHeader",function(){
				$("#back").tap(function () {
					if(type=="cart"){
						var Cart=__webpack_require__(9);
						Cart.loadCartHeader();
						Cart.loadCartContent();
					}
					else if(type=="detail"){
						var Detail=__webpack_require__(2);
						Detail.loadDetailHeader("home");
						Detail.loadDetailContent(goodsID);
						Detail.loadDetailFooter();
					}
					else{
						var User=__webpack_require__(10);
						User.loadUserHeader();
						User.loadUserContent();
					}				
				})
			})
		},
		loadLoginContent:function(type,goodsID){
			$("#content").load("html/login.html #loginContent",function(){
				$(".toRegister").tap(function () {
					var Register=__webpack_require__(12);
					Register.loadRegisterHeader();
					Register.loadRegisterContent();
				});
				$(".loginbtn").tap(function () {
					var Toast=__webpack_require__(6);
					var userID=$(".loginname").val();
					var password=$(".loginpass").val();
					if(userID.trim().length==0){
						Toast.toast("用户名不能为空")
					}
					else{
						if(password.trim().length==0){
							Toast.toast("密码不能为空");
						}
						else{
							$.ajax({
								type:"get",
								url:"http://datainfo.duapp.com/shopdata/userinfo.php",
								data:{
									"status":"login",
									"userID":userID,
									"password":password
								},
								success:function (data) {
									if(data=="0"){
										Toast.toast("用户名不存在")
									}
									else if(data=="2"){
										Toast.toast("用户名密码不符")
									}
									else{
										localStorage.setItem("userID",userID);
										if(type=="cart"){
											var Cart=__webpack_require__(9);
											Cart.loadCartHeader();
											Cart.loadCartContent();
										}
										else if(type=="order"){
											var Order=__webpack_require__(11);
											Order.loadHeader("user");
											Order.loadContent("user");
										}
										else if(type=="detail"){
											var Detail=__webpack_require__(2);
											Detail.loadDetailHeader("home");
											Detail.loadDetailContent(goodsID);
											Detail.loadDetailFooter();
										}
										else{
											var User=__webpack_require__(10);
											User.loadUserHeader();
											User.loadUserContent();
										}
									}
								}
							});
						}
					}
				})
			})
		}
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadHeader: function() {
			$("header").load("html/cart.html #cartheader", function() {
				$("#back").tap(function () {
					var Home=__webpack_require__(1);
					Home.loadHeader();
					Home.loadContent();
				})
				$("#toEdit").tap(function() {
					$(".sub").css("display", "inline-block");
					$(".add").css("display", "inline-block");
					$(this).css("visibility","hidden");
					$(".search").html("编辑");
					$("#toPay").hide();
					$("#toComplete").show();
				});
				$("#toComplete").tap(function() {
					$(".sub").hide();
					$(".add").hide();
					$(this).hide();
					$(".search").html("购物车");
					$("#toPay").show();
					$("#toEdit").css("visibility","visible");
				});
				$("#toPay").tap(function() {
					$.ajax({
						type: "get",
						url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
						dataType: "jsonp",
						data: {
							"userID": localStorage.getItem("userID")
						},
						success: function(data) {
							var userID = localStorage.getItem("userID");
							var AddCart = __webpack_require__(7);
													
							//把购买记录存入本地
							var orderList=localStorage.getItem("orderList");
							if(orderList==null){
								orderList = JSON.stringify(data);
								localStorage.setItem("orderList", orderList);
							}
							else{
								var order=JSON.parse(orderList);
								var orderLen=order.length;
								var dataLen=data.length;
								if(orderLen<=dataLen){
									for(var i=0;i<orderLen;i++){
										var goodsID=order[i].goodsID;
										for(var j=0;j<dataLen;j++){
											if(goodsID==data[j].goodsID){
												data[j].number=data[j].number*1+order[i].number*1;
												break;
											}
											else if(goodsID!=data[j].goodsID&&j==dataLen-1){
												data.push(order[i])
											}
										}
									}
									order=data;
								}
								else{
									for(var i=0;i<dataLen;i++){
										var goodsID=data[i].goodsID;
										for(var j=0;j<orderLen;j++){
											if(goodsID==order[j].goodsID){
												order[j].number=order[j].number*1+data[i].number*1;
												break;
											}
											else if(goodsID!=order[j].goodsID&&j==orderLen-1){
												order.push(data[i])
											}
										}
									}
									order=order;
								}
								orderList = JSON.stringify(order);
								localStorage.setItem("orderList", orderList);
							}
							//var a=JSON.parse(localStorage.getItem("orderList"));
							//console.log(a)
							//删除数据库中商品
							var len = data.length;
							for(var i = 0; i < len; i++) {
								var goodsID = data[i].goodsID;
								AddCart.addcart(userID, goodsID, 0, "pay");

							}
							$(".goodsList").remove();
							setTimeout(function () {
								module.exports.loadHeader();
								module.exports.loadContent();
							},300)
							
						}
					});
				})
			})
		},
		loadContent: function() {
			$("section").load("html/cart.html #cartcontent", function() {
				$(".goShopping").tap(function () {
					var Home=__webpack_require__(1);
					Home.loadHomeHeader();
					Home.loadHomeContent();
				});
				if(localStorage.getItem("userID")) {
					var userID = localStorage.getItem("userID");
					$.ajax({
						type: "get",
						url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
						dataType: "jsonp",
						data: {
							"userID": userID
						},
						success: function(data) {
							if(data == "0") {
								$("#toEdit").hide();
								$("#toPay").hide();
								$(".iconfont #back").show();
								$(".emptyCart").css("display","flex");
							} else {
								
								$.ajax({
									type: "get",
									url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
									dataType: "jsonp",
									data: {
										"userID": userID
									},
									success: function(data) {
										var len = data.length;
										var html = "";
										for(var i = 0; i < len; i++) {
											//console.log(data[i]);
											var goodsID = data[i].goodsID;
											var goodsListImg = data[i].goodsListImg;
											var goodsName = data[i].goodsName;
											var className = data[i].className;
											var price = data[i].price * 1;
											var discount = data[i].discount * 1;
											var number = data[i].number * 1;
											var newprice;
											if(discount == 0) {
												newprice = price;
											} else {
												newprice = price * discount / 10;
											}
											html += '<li class="goodsList" goodsID="' + goodsID + '">' +
												'<img class="goodsListImg" src="' + goodsListImg + '"/>' +
												'<div class="goodsInfo">' +
												'<p class="goodsName">' + goodsName +
												'</p>' +
												'<p class="className">' + className +
												'</p>' +
												'<p class="price">' +
												'单价: <span>￥' + newprice + '</span>' +
												'</p>' +
												'<p class="goodsCount">' +
												'数量: ' +
												'<button class="sub">-</button>' +
												'<span class="number" goodsID="' + goodsID + '">' + number + '</span>' +
												'<button class="add">+</button>' +
												'</p>' +
												'</div>' +
												'<div class="deteGoods" goodsID="' + goodsID + '">删除</div>' +
												'</li>'
										}
										$("#cartcontent").html(html);
										$(".goodsList").swipeLeft(function() {
											$(this).animate({
												"left": "-1.2rem"
											}, 200).siblings().animate({
												"left": "0rem"
											}, 300);
										});
										$(".goodsList").swipeRight(function() {
											$(this).animate({
												"left": "0rem"
											}, 200);
										});
										$("#toEdit").tap(function () {
											$(".goodsList").trigger("swipeRight")
										})
										//加减商品
										var Toast = __webpack_require__(6);
										var AddCart = __webpack_require__(7);
										$(".sub").tap(function() {
											var number = $(this).siblings(".number").html() * 1;
											var goodsID = $(this).siblings(".number").attr("goodsID");
											//							alert(userID)
											if(number == 1) {
												Toast.toast("数量不能小于1", 1000)
											} else {
												number--;
												$(this).siblings(".number").html(number);
											}
											AddCart.addcart(userID, goodsID, number, "no");
										});
										$(".add").tap(function() {
											var number = $(this).siblings(".number").html() * 1;
											var goodsID = $(this).siblings(".number").attr("goodsID");
											//							alert(userID)
											if(number == 5) {
												Toast.toast("最多购买5件", 1000)
											} else {
												number++;
												$(this).siblings(".number").html(number);
											}
											AddCart.addcart(userID, goodsID, number, "no");
										});

										//删除商品
										$(".deteGoods").tap(function() {
											var goodsID = $(this).attr("goodsID");
											AddCart.addcart(userID, goodsID, 0, "dete");
											$(this).parents(".goodsList").remove();
											if($(".goodsList").length==0){
												var Cart = __webpack_require__(9);
												Cart.loadHeader();
												Cart.loadContent();
											}

										})
									}
								});
							}
						}
					});

				} 
				else {
					var Login = __webpack_require__(8);
					Login.loadHeader("cart");
					Login.loadContent("cart");
				};
			})
		}
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadUserHeader:function(){
			$("#header").load("html/user.html #userHeader",function () {
				if(localStorage.getItem("userID")){
					$("#exit").show()
				}
				$("#exit").tap(function () {
					var Toast=__webpack_require__(6);
					Toast.toast("当前账号已退出")
					localStorage.setItem("userID","");
					var User=__webpack_require__(10);
					User.loadUserHeader();
					User.loadUserContent();
				})
			})
		},
		loadUserContent:function(){
			$("#footer li").eq(3).addClass("active").siblings().removeClass("active");
			$("#content").load("html/user.html #userContent",function(){
				$(".sex").tap(function () {
					$(".sexs").animate({"left":"0"});
				})
				$(".sexs>div").tap(function () {
					for(var i=0;i<$(".sexs>div").length;i++){
						var img=$(".sexs>div").eq(i).find("img").attr("src");
						if(img.indexOf("1")!=-1){
							var img1=img.replace("1.png",".png");
							$(".sexs>div").eq(i).find("img").attr("src",img1);
						}
					}
					var img=$(this).find("img").attr("src");
					var img1=img.replace(".png","1.png")
					$(this).find("img").attr("src",img1)
					$(this).addClass("active").siblings("div").removeClass("active");
					setTimeout(function () {
						$(".sexs").animate({"left":"100%"});
					},300)				
					$(".sex b").html($(this).find("span").html())
				})
				$(".close").tap(function () {
					$(".sexs").animate({"left":"100%"});
				})
				
				$(".mycart").tap(function () {
					if(localStorage.getItem("userID")){
						var Cart=__webpack_require__(9);
						Cart.loadHeader("cart");
						Cart.loadContent("cart");
					}
					else{
						var Login=__webpack_require__(8);
						Login.loadLoginHeader();
						Login.loadLoginContent();
					}
				})
				$(".myorder").tap(function () {
					if(localStorage.getItem("userID")){
						var Order=__webpack_require__(11);
						Order.loadHeader("user");
						Order.loadContent("user");
					}
					else{
						var Login=__webpack_require__(8);
						Login.loadLoginHeader("order");
						Login.loadLoginContent("order");
					}
					
				})
				$(".updata").tap(function () {
					var Toast=__webpack_require__(6);
					Toast.toast("暂无更新内容")
				})
			})
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadHeader:function(type){
			$("header").load("html/order.html #orderheader",function(){
				$("#back").tap(function () {
					if(type=="user"){
						var User=__webpack_require__(10);
						User.loadUserHeader();
						User.loadUserContent();
					}
					else{
						var User=__webpack_require__(10);
						User.loadUserHeader();
						User.loadUserContent();
					}
				})
				
			})
		},
		loadContent:function(){
			$("section").load("html/order.html #ordercontent",function(){
				if(localStorage.getItem("userID")){	
					//console.log(localStorage.getItem("orderList"))
					var cartListArr=JSON.parse(localStorage.getItem("orderList"));
					var len=cartListArr.length;
					//console.log(cartListArr)
					$("#ordercontent #prolist").html("");
					for(var i=0;i<len;i++){
						var goodsID=cartListArr[i].goodsID;
						var goodsListImg=cartListArr[i].goodsListImg;
						var goodsName=cartListArr[i].goodsName;
						var className=cartListArr[i].className;
						var price=cartListArr[i].price*1;
						var discount=cartListArr[i].discount*1;
						discount=discount!=0?discount:10;
						var newprice=(price*discount/10).toFixed(1);
						var number=cartListArr[i].number*1;
						$("#ordercontent #prolist").append(
							'<li class="goodsList">'+
								'<img class="goodsListImg" src="'+goodsListImg+'"/>'+
								'<div class="goodsInfo">'+
									'<p class="goodsName">'+goodsName+
									'</p>'+
									'<p class="className">'+className+
									'</p>'+
									'<p class="price">'+
										'单价:<span>￥'+newprice+'</span>'+
									'</p>'+
									'<p class="goodsCount">'+
										'数量:'+
										'<span class="number">'+number+'</span>'+
									'</p>'+
									'<p class="detebtn" goodsID="'+goodsID+'">'+
										'删除订单'+
									'</p>'+
								'</div>'+
							'</li>'
						)
					}
					$(".detebtn").tap(function () {
						var goodsID=$(this).attr("goodsID");
						for(var i=0;i<len;i++){
							if(goodsID==cartListArr[i].goodsID){
								cartListArr.splice(i,1);
								$(this).parents(".goodsList").remove();
								localStorage.setItem("orderList",JSON.stringify(cartListArr))
								break;
							}
						}
					})
				}
				else{
					var Login=__webpack_require__(8);
					Login.loadLoginHeader("user");
					Login.loadLoginContent("user");
				}
				
				
			})
		}
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadRegisterHeader:function(type){
			$("#header").load("html/register.html #registerHeader",function(){
				$("#back").tap(function () {
					var Login=__webpack_require__(8);
					Login.loadLoginHeader();
					Login.loadLoginContent();
				})
			})
		},
		loadRegisterContent:function(){
			$("#content").load("html/register.html #registerContent",function(){
				//验证注册
				$(".registerbtn").tap(function () {
					var Toast=__webpack_require__(6);
					var userID=$(".registername").val();
					var password=$(".registerpass1").val();
					var password1=$('.registerpass2').val();
					if(userID.trim().length==0){
						Toast.toast("用户名不能为空");
					}
					else if(userID.trim().length<6||userID.trim().length>20){
						Toast.toast("用户名长度需为6-20位");
					}
					else if(userID.charAt(0).match(/[0-9]/)){
						Toast.toast("用户名不能以数字开头")	
					}
					else if(!(userID.match(/^[\d\w\_]{6,20}$/))){
						Toast.toast("用户名不合法")
					}
					else{
						if(password.trim().length==0){
							Toast.toast("密码不能为空")
						}
						else if(password.trim().length<6||password.trim().length>20){
							Toast.toast("密码长度需为6-20位")
						}
						else{
							if(password1!=password){
								Toast.toast("两次输入密码不一致")
							}
							else{
								$.ajax({
									type:"get",
									url:"http://datainfo.duapp.com/shopdata/userinfo.php",
									data:{
										"status":"register",
										"userID":userID,
										"password":password
									},
									success:function(data){
										if(data=="0"){
											Toast.toast("用户名已被注册")
										}
										else{
											Toast.toast("注册成功,请登录",1000);
											setTimeout(function () {
												var Login=__webpack_require__(8);
												Login.loadLoginHeader();
												Login.loadLoginContent();
											},1000)										
										}
									}
								});
							}
						}
					}
					
				})
			})
		}
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.0.2@sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.0.2@sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 12px;\n  line-height: 1.5;\n  font-family: arial; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0;\n  display: block;\n  width: 100%; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nhtml {\n  font-size: 100px;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden; }\n\nbody {\n  font-size: 12px;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n  flex-direction: column;\n  overflow-x: hidden;\n  position: relative; }\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale; }\n\n@font-face {\n  font-family: 'iconfont';\n  /* project id 195312 */\n  src: url(\"//at.alicdn.com/t/font_lbfn857ilaqbyb9.eot\");\n  src: url(\"//at.alicdn.com/t/font_lbfn857ilaqbyb9.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_lbfn857ilaqbyb9.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_lbfn857ilaqbyb9.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_lbfn857ilaqbyb9.svg#iconfont\") format(\"svg\"); }\n\n@font-face {\n  font-family: font2;\n  src: url(" + __webpack_require__(16) + "); }\n\n#toast {\n  position: fixed;\n  width: 70%;\n  height: 0.8rem;\n  bottom: 2rem;\n  left: 15%;\n  z-index: 99;\n  border-radius: 0.1rem;\n  background: #e9704f;\n  line-height: 0.8rem;\n  color: #fff;\n  text-align: center;\n  font-size: 0.4rem;\n  display: none; }\n\n#onload {\n  width: 100%;\n  height: 100%;\n  z-index: 9999999;\n  position: absolute;\n  display: none;\n  background: #eee; }\n  #onload img {\n    width: 30%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    margin: auto; }\n\n#header, #detailHeader, #listHeader, #userHeader, #cartheader, #orderheader {\n  width: 100%;\n  height: 0.86rem;\n  background-color: #e9704f;\n  display: flex;\n  align-items: center;\n  position: relative; }\n  #header #registerHeader, #header #loginHeader, #detailHeader #registerHeader, #detailHeader #loginHeader, #listHeader #registerHeader, #listHeader #loginHeader, #userHeader #registerHeader, #userHeader #loginHeader, #cartheader #registerHeader, #cartheader #loginHeader, #orderheader #registerHeader, #orderheader #loginHeader {\n    position: relative; }\n    #header #registerHeader #back, #header #loginHeader #back, #detailHeader #registerHeader #back, #detailHeader #loginHeader #back, #listHeader #registerHeader #back, #listHeader #loginHeader #back, #userHeader #registerHeader #back, #userHeader #loginHeader #back, #cartheader #registerHeader #back, #cartheader #loginHeader #back, #orderheader #registerHeader #back, #orderheader #loginHeader #back {\n      position: absolute;\n      left: 0;\n      top: 0;\n      color: #fff;\n      font-size: 0.4rem;\n      line-height: 0.8rem;\n      left: 0.2rem; }\n  #header #buyHeader, #detailHeader #buyHeader, #listHeader #buyHeader, #userHeader #buyHeader, #cartheader #buyHeader, #orderheader #buyHeader {\n    width: 100%;\n    height: 0.88rem;\n    background: #e9704f;\n    color: #fff;\n    border-bottom: 1px solid #c6c6c6; }\n  #header #buyImg1Header, #detailHeader #buyImg1Header, #listHeader #buyImg1Header, #userHeader #buyImg1Header, #cartheader #buyImg1Header, #orderheader #buyImg1Header {\n    display: flex;\n    width: 100%;\n    height: 0.88rem;\n    background: #e9704f;\n    color: #fff;\n    border-bottom: 1px solid #c6c6c6;\n    line-height: 0.88rem;\n    font-size: 0.4rem;\n    position: relative; }\n    #header #buyImg1Header #back, #detailHeader #buyImg1Header #back, #listHeader #buyImg1Header #back, #userHeader #buyImg1Header #back, #cartheader #buyImg1Header #back, #orderheader #buyImg1Header #back {\n      position: absolute;\n      margin-left: 0.2rem;\n      font-size: 0.4rem; }\n    #header #buyImg1Header #header-main, #detailHeader #buyImg1Header #header-main, #listHeader #buyImg1Header #header-main, #userHeader #buyImg1Header #header-main, #cartheader #buyImg1Header #header-main, #orderheader #buyImg1Header #header-main {\n      text-align: center;\n      width: 100%; }\n  #header .logo, #detailHeader .logo, #listHeader .logo, #userHeader .logo, #cartheader .logo, #orderheader .logo {\n    width: 2rem;\n    color: #fff;\n    font-size: 0.4rem;\n    font-weight: 900;\n    text-indent: 0.2rem;\n    text-shadow: -0.02rem 0.02rem 0.03rem #000;\n    font-style: italic;\n    display: flex;\n    align-items: center;\n    position: absolute;\n    left: 0;\n    height: 100%; }\n    #header .logo .iconfont, #detailHeader .logo .iconfont, #listHeader .logo .iconfont, #userHeader .logo .iconfont, #cartheader .logo .iconfont, #orderheader .logo .iconfont {\n      font-size: 0.4rem;\n      height: 100%;\n      line-height: 0.88rem; }\n      #header .logo .iconfont span, #detailHeader .logo .iconfont span, #listHeader .logo .iconfont span, #userHeader .logo .iconfont span, #cartheader .logo .iconfont span, #orderheader .logo .iconfont span {\n        display: block;\n        width: 1.08rem;\n        height: 0.56rem;\n        font-size: 0.2rem;\n        line-height: 0.56rem;\n        text-indent: 0.33rem;\n        font-style: normal;\n        background: -webkit-linear-gradient(top, #f8618a, #d7114f);\n        border-radius: 0.15rem;\n        box-shadow: 0 0 0.01rem 0.01rem #ccc;\n        margin-left: 0.2rem; }\n      #header .logo .iconfont em, #detailHeader .logo .iconfont em, #listHeader .logo .iconfont em, #userHeader .logo .iconfont em, #cartheader .logo .iconfont em, #orderheader .logo .iconfont em {\n        font-style: normal;\n        display: none; }\n      #header .logo .iconfont#exit, #detailHeader .logo .iconfont#exit, #listHeader .logo .iconfont#exit, #userHeader .logo .iconfont#exit, #cartheader .logo .iconfont#exit, #orderheader .logo .iconfont#exit {\n        display: none;\n        width: 2rem;\n        font-size: 0.3rem; }\n  #header .search, #detailHeader .search, #listHeader .search, #userHeader .search, #cartheader .search, #orderheader .search {\n    display: flex;\n    width: 100%;\n    align-items: center;\n    justify-content: center;\n    color: #fff;\n    font-size: 0.4rem;\n    flex: 1; }\n    #header .search > div, #detailHeader .search > div, #listHeader .search > div, #userHeader .search > div, #cartheader .search > div, #orderheader .search > div {\n      display: flex;\n      flex: 1;\n      height: 0.5rem;\n      border-radius: 0.25rem;\n      background: #fff;\n      margin: 0 0.3rem;\n      align-items: center;\n      padding-left: 0.15rem; }\n      #header .search > div .iconfont, #detailHeader .search > div .iconfont, #listHeader .search > div .iconfont, #userHeader .search > div .iconfont, #cartheader .search > div .iconfont, #orderheader .search > div .iconfont {\n        color: #000;\n        font-size: 0.3rem;\n        margin-top: 0.02rem;\n        margin-right: 0.1rem; }\n      #header .search > div .searchText, #detailHeader .search > div .searchText, #listHeader .search > div .searchText, #userHeader .search > div .searchText, #cartheader .search > div .searchText, #orderheader .search > div .searchText {\n        width: 80%;\n        height: 80%;\n        border: 0;\n        outline: none;\n        color: #999;\n        font-size: 0.25rem; }\n      #header .search > div span, #detailHeader .search > div span, #listHeader .search > div span, #userHeader .search > div span, #cartheader .search > div span, #orderheader .search > div span {\n        color: #999;\n        font-size: 0.25rem; }\n  #header > i, #detailHeader > i, #listHeader > i, #userHeader > i, #cartheader > i, #orderheader > i {\n    font-size: 0.5rem;\n    color: #fff;\n    margin-right: 0.3rem; }\n    #header > i span, #detailHeader > i span, #listHeader > i span, #userHeader > i span, #cartheader > i span, #orderheader > i span {\n      display: block;\n      width: 1.08rem;\n      height: 0.56rem;\n      font-size: 0.2rem;\n      line-height: 0.56rem;\n      text-align: center;\n      font-style: normal;\n      background: -webkit-linear-gradient(top, #e9704f, #f37c5b);\n      border-radius: 0.15rem;\n      box-shadow: 0 0 0.01rem 0.01rem #ccc;\n      margin-left: 0.2rem; }\n    #header > i #toHide, #detailHeader > i #toHide, #listHeader > i #toHide, #userHeader > i #toHide, #cartheader > i #toHide, #orderheader > i #toHide {\n      display: none; }\n    #header > i #toComplete, #detailHeader > i #toComplete, #listHeader > i #toComplete, #userHeader > i #toComplete, #cartheader > i #toComplete, #orderheader > i #toComplete {\n      display: none; }\n  #header > div, #detailHeader > div, #listHeader > div, #userHeader > div, #cartheader > div, #orderheader > div {\n    width: 100%;\n    height: 0.88rem; }\n    #header > div #header-main, #detailHeader > div #header-main, #listHeader > div #header-main, #userHeader > div #header-main, #cartheader > div #header-main, #orderheader > div #header-main {\n      width: 100%;\n      height: 100%;\n      text-align: center;\n      color: #fff;\n      font-size: 0.4rem;\n      line-height: 0.88rem; }\n\nsection {\n  flex: 1;\n  width: 100%;\n  overflow-x: hidden; }\n  section #homeContent {\n    position: relative;\n    background: #eee; }\n    section #homeContent i {\n      font-style: normal; }\n    section #homeContent .swiper-container {\n      width: 100%;\n      height: 3rem; }\n      section #homeContent .swiper-container .swiper-slide {\n        width: 100%; }\n    section #homeContent .list_img {\n      background: #fff;\n      width: 100%;\n      height: 1.5rem;\n      margin-bottom: 0.1rem; }\n      section #homeContent .list_img ul {\n        width: 100%;\n        height: 100%;\n        display: flex; }\n        section #homeContent .list_img ul li {\n          width: 23%;\n          height: 100%;\n          margin: 0 1%; }\n          section #homeContent .list_img ul li i {\n            margin: 0.1rem auto;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 60%;\n            height: 60%;\n            background: mediumpurple;\n            border-radius: 50%;\n            font-size: 0.4rem;\n            color: #fff; }\n          section #homeContent .list_img ul li span {\n            display: block;\n            text-align: center;\n            font-size: 0.28rem; }\n          section #homeContent .list_img ul li:nth-child(2) i {\n            background: orange; }\n          section #homeContent .list_img ul li:nth-child(3) i {\n            background: red; }\n          section #homeContent .list_img ul li:nth-child(4) i {\n            background: darkcyan; }\n    section #homeContent .recommend {\n      margin-top: 0.1rem;\n      background: #fff;\n      width: 100%;\n      height: 3.2rem;\n      display: flex; }\n      section #homeContent .recommend .rec_left {\n        border-bottom: 0.03rem solid #fff;\n        background: #fff;\n        flex: 1;\n        height: 100%; }\n        section #homeContent .recommend .rec_left p {\n          width: 80%;\n          margin: 10% 10%; }\n          section #homeContent .recommend .rec_left p i {\n            color: red;\n            font-size: 0.25rem; }\n          section #homeContent .recommend .rec_left p span {\n            display: block;\n            font-size: 0.18rem;\n            color: gray; }\n        section #homeContent .recommend .rec_left .recleft_img {\n          width: 80%;\n          margin: 0 10%; }\n      section #homeContent .recommend .rec_right {\n        height: 100%;\n        display: flex;\n        flex: 2;\n        flex-wrap: wrap; }\n        section #homeContent .recommend .rec_right li {\n          background: #fff;\n          width: 49%;\n          height: 1.6rem;\n          border-left: 0.01rem solid #eee;\n          border-bottom: 0.01rem solid #eee;\n          overflow: hidden; }\n          section #homeContent .recommend .rec_right li p {\n            width: 80%;\n            margin: 0 10%;\n            margin-top: 2%; }\n            section #homeContent .recommend .rec_right li p i {\n              color: red;\n              font-size: 0.25rem;\n              padding: 0;\n              margin: 0; }\n            section #homeContent .recommend .rec_right li p span {\n              display: block;\n              font-size: 0.18rem;\n              color: gray; }\n          section #homeContent .recommend .rec_right li:nth-child(3) {\n            border-bottom: 0.01rem solid #fff; }\n          section #homeContent .recommend .rec_right li:nth-child(4) {\n            border-bottom: 0.01rem solid #fff; }\n          section #homeContent .recommend .rec_right li .recright_img {\n            width: 80%;\n            margin: 0 10%; }\n            section #homeContent .recommend .rec_right li .recright_img img {\n              width: 45%;\n              margin-left: 40%; }\n    section #homeContent .list_act {\n      border-bottom: 0.01rem solid red;\n      color: red; }\n    section #homeContent .list_ul {\n      margin-bottom: 0.1rem;\n      margin-top: 0.1rem;\n      background: #fff;\n      width: 100%;\n      height: 0.8rem;\n      display: flex;\n      position: absolute;\n      top: 7.8rem; }\n      section #homeContent .list_ul li {\n        display: flex;\n        flex: 1;\n        justify-content: center;\n        align-items: center;\n        font-size: 0.3rem; }\n      section #homeContent .list_ul.fixed {\n        position: fixed;\n        margin: 0;\n        padding: 0;\n        top: 0.82rem;\n        left: 0; }\n    section #homeContent .list_product {\n      width: 100%;\n      height: auto;\n      margin-top: 0.95rem; }\n      section #homeContent .list_product .list_pro {\n        width: 100%;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: space-around; }\n        section #homeContent .list_product .list_pro dl {\n          width: 49%;\n          margin-bottom: 1%;\n          background: #fff;\n          padding: 1% 0; }\n          section #homeContent .list_product .list_pro dl dt {\n            width: 90%;\n            height: 2.8rem;\n            overflow: hidden;\n            margin: 0 5%; }\n          section #homeContent .list_product .list_pro dl dd {\n            width: 90%;\n            margin: 0 5%; }\n            section #homeContent .list_product .list_pro dl dd p {\n              width: 100%;\n              display: flex;\n              justify-content: space-between; }\n              section #homeContent .list_product .list_pro dl dd p i {\n                color: red;\n                font-size: 0.25rem; }\n              section #homeContent .list_product .list_pro dl dd p del {\n                font-size: 0.2rem; }\n              section #homeContent .list_product .list_pro dl dd p span {\n                font-size: 0.2rem; }\n            section #homeContent .list_product .list_pro dl dd .pro_spa {\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n        section #homeContent .list_product .list_pro.hid {\n          display: none; }\n  section #cartcontent, section #ordercontent {\n    width: 100%;\n    height: 100%;\n    overflow-x: hidden;\n    position: relative;\n    background: #f7f7f7; }\n    section #cartcontent .goodsList, section #ordercontent .goodsList {\n      width: 100%;\n      height: 2rem;\n      position: relative;\n      left: 0;\n      align-items: center;\n      font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n      display: flex; }\n      section #cartcontent .goodsList:after, section #ordercontent .goodsList:after {\n        content: \"\";\n        position: absolute;\n        width: 100%;\n        height: 1px;\n        bottom: 0;\n        left: 0;\n        background-color: #000;\n        transform-origin: 0 0;\n        transform: scaleY(0.5); }\n      section #cartcontent .goodsList .goodsListImg, section #ordercontent .goodsList .goodsListImg {\n        width: 1.72rem;\n        height: 1.72rem;\n        margin: 0 0.29rem; }\n      section #cartcontent .goodsList .goodsInfo, section #ordercontent .goodsList .goodsInfo {\n        flex: 1;\n        height: 1.72rem;\n        font-size: 0.30rem;\n        line-height: 0.42rem;\n        color: #333;\n        position: relative; }\n        section #cartcontent .goodsList .goodsInfo .goodsName, section #ordercontent .goodsList .goodsInfo .goodsName {\n          display: -webkit-box;\n          overflow: hidden;\n          white-space: normal !important;\n          text-overflow: ellipsis;\n          word-wrap: break-word;\n          -webkit-line-clamp: 1;\n          -webkit-box-orient: vertical; }\n        section #cartcontent .goodsList .goodsInfo .price span, section #ordercontent .goodsList .goodsInfo .price span {\n          color: #E4366B; }\n        section #cartcontent .goodsList .goodsInfo .goodsCount, section #ordercontent .goodsList .goodsInfo .goodsCount {\n          width: 100%;\n          height: 0.4rem; }\n          section #cartcontent .goodsList .goodsInfo .goodsCount .sub, section #cartcontent .goodsList .goodsInfo .goodsCount .add, section #ordercontent .goodsList .goodsInfo .goodsCount .sub, section #ordercontent .goodsList .goodsInfo .goodsCount .add {\n            width: 0.56rem;\n            height: 0.4rem;\n            border: none;\n            border-radius: 0.1rem;\n            background: -webkit-linear-gradient(top, #aeaeae, #4f4f4f);\n            display: none;\n            position: relative;\n            top: -0.04rem;\n            color: #fff;\n            font-size: 0.3rem; }\n          section #cartcontent .goodsList .goodsInfo .goodsCount .number, section #ordercontent .goodsList .goodsInfo .goodsCount .number {\n            width: 0.6rem;\n            height: 0.4rem;\n            text-align: center;\n            font-size: 0.3rem;\n            line-height: 0.4rem;\n            display: inline-block; }\n        section #cartcontent .goodsList .goodsInfo .detebtn, section #ordercontent .goodsList .goodsInfo .detebtn {\n          position: absolute;\n          width: 1rem;\n          height: 0.5rem;\n          border-radius: 0.1rem;\n          right: 0.5rem;\n          color: #fff;\n          bottom: 0.1rem;\n          box-shadow: 0 -0.01rem 0.01rem 0.01rem #ccc;\n          background: -webkit-linear-gradient(bottom, #a20c3c, #fcb1c6);\n          font-size: 0.22rem;\n          text-align: center;\n          line-height: 0.45rem; }\n      section #cartcontent .goodsList .deteGoods, section #ordercontent .goodsList .deteGoods {\n        width: 1.2rem;\n        background: #E4366B;\n        height: 100%;\n        position: absolute;\n        right: -1.2rem;\n        color: #fff;\n        font-size: 0.4rem;\n        text-align: center;\n        line-height: 2rem; }\n    section #cartcontent .emptyCart, section #ordercontent .emptyCart {\n      width: 100%;\n      height: 100%;\n      display: none;\n      flex-direction: column;\n      align-items: center; }\n      section #cartcontent .emptyCart .info, section #ordercontent .emptyCart .info {\n        height: 1.5rem;\n        line-height: 1.5rem;\n        font-size: 0.4rem; }\n      section #cartcontent .emptyCart img, section #ordercontent .emptyCart img {\n        width: 3.5rem; }\n      section #cartcontent .emptyCart .goShopping, section #ordercontent .emptyCart .goShopping {\n        width: 3.9rem;\n        height: 0.7rem;\n        margin: 0.4rem;\n        border: 0;\n        background: -webkit-linear-gradient(top, #e9704f, #ea502d);\n        color: #fff;\n        border-radius: 0.1rem;\n        font-size: 0.3rem; }\n  section #buyContent {\n    display: flex;\n    flex: 3;\n    width: 100%;\n    height: 100%;\n    background: #fff; }\n    section #buyContent .buyImg {\n      flex: 3; }\n      section #buyContent .buyImg img {\n        width: 2rem;\n        height: 2.2rem;\n        float: left;\n        margin-top: 0.1rem;\n        margin-left: 0.1rem; }\n  section #searchContent {\n    width: 100%;\n    height: 100%;\n    background: #eee; }\n    section #searchContent #searchMain {\n      width: 100%;\n      height: 0.6rem;\n      background: #eee;\n      position: fixed;\n      left: 0;\n      top: 0.84rem;\n      z-index: 9999; }\n      section #searchContent #searchMain .secrch {\n        width: 90%;\n        background: #ddd;\n        margin-left: 5%;\n        border-radius: 0.15rem;\n        text-indent: 0.2rem; }\n        section #searchContent #searchMain .secrch i {\n          line-height: 0.6rem; }\n        section #searchContent #searchMain .secrch input {\n          height: 80%;\n          width: 80%;\n          border: 0;\n          background: none;\n          outline: none; }\n    section #searchContent #woman {\n      margin-top: 0.6rem; }\n    section #searchContent .list {\n      overflow-y: auto;\n      width: 100%;\n      position: relative;\n      padding-top: 0.7rem; }\n      section #searchContent .list .list-top {\n        width: 100%;\n        height: 0.7rem;\n        line-height: 0.7rem;\n        font-size: 0.25rem;\n        background: #fff;\n        border-bottom: 10x soild #999;\n        font-weight: bold;\n        position: absolute;\n        top: 0; }\n        section #searchContent .list .list-top .iconfont {\n          font-size: 0.4rem;\n          margin: 0 0.2rem;\n          color: red; }\n        section #searchContent .list .list-top.fixed {\n          position: fixed;\n          top: 1.43rem;\n          z-index: 999; }\n      section #searchContent .list .list-main {\n        background: #eee;\n        width: 100%;\n        display: flex;\n        flex-wrap: wrap; }\n        section #searchContent .list .list-main li {\n          width: 1.4rem;\n          margin: 0.1rem;\n          height: 1.8rem; }\n          section #searchContent .list .list-main li img {\n            width: 100%;\n            height: 1.2rem; }\n          section #searchContent .list .list-main li span {\n            display: block;\n            width: 100%;\n            text-align: center;\n            height: 0.4rem;\n            line-height: 0.4rem;\n            display: -webkit-box;\n            overflow: hidden;\n            white-space: normal !important;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical; }\n      section #searchContent .list .man {\n        background: #eee;\n        width: 100%;\n        display: flex;\n        flex-wrap: wrap;\n        height: auto; }\n        section #searchContent .list .man li {\n          width: 1.4rem;\n          margin: 0.1rem; }\n          section #searchContent .list .man li img {\n            width: 100%; }\n          section #searchContent .list .man li span {\n            display: block;\n            width: 100%;\n            text-align: center;\n            height: 0.4rem;\n            line-height: 0.4rem;\n            display: -webkit-box;\n            overflow: hidden;\n            white-space: normal !important;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical; }\n  section #listContent {\n    width: 100%;\n    height: 100%;\n    background: #ddd; }\n    section #listContent #changeList {\n      position: fixed;\n      left: 0.1rem;\n      bottom: 2rem;\n      height: 0.8rem;\n      width: 0.8rem;\n      background: rgba(0, 0, 0, 0.6);\n      border-radius: 50%;\n      color: #fff;\n      font-size: 0.34rem;\n      line-height: 0.8rem;\n      text-align: center; }\n      section #listContent #changeList .iconfont {\n        width: 100%;\n        height: 100%;\n        font-size: 0.4rem;\n        font-weight: 100; }\n        section #listContent #changeList .iconfont.col {\n          display: none; }\n    section #listContent .listSearch {\n      width: 100%;\n      height: 0.7rem;\n      background: #ddd;\n      display: flex;\n      text-indent: 0.2rem;\n      line-height: 0.7rem;\n      font-size: 0.3rem;\n      border-bottom: 1px solid #ddd;\n      position: fixed;\n      left: 0;\n      top: 0.84rem; }\n      section #listContent .listSearch span {\n        display: block; }\n        section #listContent .listSearch span:nth-child(1) {\n          font-size: 0.5rem; }\n        section #listContent .listSearch span:nth-child(2) {\n          margin-left: 2.3rem; }\n    section #listContent #listMain {\n      width: 100%;\n      overflow: hidden; }\n      section #listContent #listMain .searchInfo {\n        width: 100%;\n        height: 0.8rem;\n        border-bottom: 1px solid #ddd;\n        text-indent: 0.1rem;\n        line-height: 0.8rem;\n        position: fixed;\n        left: 0;\n        display: flex;\n        background: #eee;\n        top: 0.8rem;\n        align-items: center; }\n        section #listContent #listMain .searchInfo .searchInfo-main {\n          width: 60%;\n          height: 0.5rem;\n          border: 1px solid #999;\n          background: #eee;\n          display: flex;\n          margin-left: 0.4rem;\n          line-height: 0.6rem; }\n          section #listContent #listMain .searchInfo .searchInfo-main i {\n            display: block;\n            font-size: 0.24rem; }\n          section #listContent #listMain .searchInfo .searchInfo-main input {\n            display: block;\n            height: 60%;\n            width: 200rem;\n            text-indent: 0.2rem;\n            border: 0;\n            margin-top: 0.1rem;\n            background: #eee;\n            outline: none; }\n        section #listContent #listMain .searchInfo p {\n          height: 100%;\n          text-align: center;\n          width: 1rem; }\n          section #listContent #listMain .searchInfo p:nth-child(1) {\n            margin-left: 0.3rem;\n            margin-right: 0.3rem; }\n      section #listContent #listMain .listMain-menu {\n        width: 100%;\n        height: 1rem;\n        border-bottom: 1px solid #ddd;\n        display: flex;\n        margin-top: 0.7rem;\n        position: fixed;\n        left: 0;\n        background: #eee; }\n        section #listContent #listMain .listMain-menu li {\n          height: 0.5rem;\n          width: 1.3rem;\n          background: #ddd;\n          margin-right: 0.2rem;\n          font-size: 0.24rem;\n          line-height: 0.5rem;\n          text-align: center;\n          margin-top: 0.25rem; }\n          section #listContent #listMain .listMain-menu li:nth-child(1) {\n            margin-left: 0.2rem; }\n      section #listContent #listMain .listMain-info {\n        width: 100%;\n        display: flex;\n        overflow: auto;\n        flex-wrap: wrap;\n        margin-top: 1.7rem;\n        background: #fff; }\n        section #listContent #listMain .listMain-info li {\n          height: 4.6rem;\n          width: 2.9rem;\n          margin-top: 0.2rem;\n          margin-left: 0.2rem;\n          background: #eee; }\n          section #listContent #listMain .listMain-info li p {\n            width: 100%; }\n            section #listContent #listMain .listMain-info li p:nth-child(1) {\n              height: 2.5rem; }\n              section #listContent #listMain .listMain-info li p:nth-child(1) img {\n                height: 2.5rem;\n                width: 2.9rem; }\n            section #listContent #listMain .listMain-info li p:nth-child(2) {\n              height: 0.5rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical;\n              line-height: 0.5rem; }\n            section #listContent #listMain .listMain-info li p:nth-child(3) {\n              display: flex;\n              height: 0.5rem; }\n              section #listContent #listMain .listMain-info li p:nth-child(3) span {\n                display: block;\n                margin: 0 0.05rem; }\n                section #listContent #listMain .listMain-info li p:nth-child(3) span:nth-child(1) {\n                  height: 0.3rem;\n                  font-size: 0.03rem;\n                  margin-top: 0.1rem;\n                  line-height: 0.3rem;\n                  background: tomato;\n                  border-radius: 0.05rem; }\n                section #listContent #listMain .listMain-info li p:nth-child(3) span:nth-child(2) {\n                  height: 0.24rem;\n                  font-size: 0.03rem;\n                  border: 1px solid tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.24rem;\n                  border-radius: 0.05rem;\n                  color: tomato; }\n                section #listContent #listMain .listMain-info li p:nth-child(3) span:nth-child(3) {\n                  height: 0.26rem;\n                  font-size: 0.03rem;\n                  background: tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.24rem;\n                  border-radius: 0.05rem;\n                  color: #fff; }\n                section #listContent #listMain .listMain-info li p:nth-child(3) span:nth-child(4) {\n                  height: 0.26rem;\n                  font-size: 0.03rem;\n                  border: 1px solid tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.24rem;\n                  border-radius: 0.05rem;\n                  color: tomato; }\n            section #listContent #listMain .listMain-info li p:nth-child(4) {\n              height: 0.5rem;\n              border-bottom: 1px solid #ddd;\n              line-height: 0.5rem; }\n              section #listContent #listMain .listMain-info li p:nth-child(4) span {\n                font-size: 0.34rem;\n                color: tomato; }\n              section #listContent #listMain .listMain-info li p:nth-child(4) del {\n                color: #999; }\n            section #listContent #listMain .listMain-info li p:nth-child(5) {\n              height: 0.5rem;\n              line-height: 0.5rem;\n              display: flex; }\n              section #listContent #listMain .listMain-info li p:nth-child(5) span {\n                display: block; }\n                section #listContent #listMain .listMain-info li p:nth-child(5) span:nth-child(1) {\n                  width: 1rem;\n                  margin-right: 0.5rem; }\n                section #listContent #listMain .listMain-info li p:nth-child(5) span:nth-child(2) {\n                  width: 0.5rem;\n                  height: 0.3rem;\n                  background: green;\n                  margin-top: 0.1rem;\n                  line-height: 0.3rem;\n                  border-radius: 0.1rem;\n                  text-align: center;\n                  line-height: 0.3rem; }\n                section #listContent #listMain .listMain-info li p:nth-child(5) span:nth-child(3) {\n                  width: 0.6rem;\n                  height: 0.25rem;\n                  border: 1px solid tomato;\n                  color: tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.25rem;\n                  border-radius: 0.1rem;\n                  text-align: center;\n                  line-height: 0.25rem; }\n      section #listContent #listMain .change-listMain-info {\n        width: 100%;\n        margin-top: 1.7rem;\n        display: none;\n        background: #fff; }\n        section #listContent #listMain .change-listMain-info li {\n          width: 100%;\n          height: 2rem;\n          border-bottom: 1px solid #ddd;\n          background: #eee;\n          margin-top: 0.1rem; }\n          section #listContent #listMain .change-listMain-info li .left {\n            float: left;\n            width: 2rem;\n            height: 2rem; }\n            section #listContent #listMain .change-listMain-info li .left img {\n              width: 2rem;\n              height: 2rem; }\n          section #listContent #listMain .change-listMain-info li .right {\n            float: left;\n            margin-left: 0.3rem; }\n            section #listContent #listMain .change-listMain-info li .right p:nth-child(1) {\n              height: 0.5rem;\n              width: 4rem;\n              line-height: 0.5rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            section #listContent #listMain .change-listMain-info li .right p:nth-child(2) {\n              display: flex;\n              height: 0.5rem; }\n              section #listContent #listMain .change-listMain-info li .right p:nth-child(2) span {\n                margin: 0 0.05rem;\n                display: block; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(2) span:nth-child(1) {\n                  height: 0.3rem;\n                  font-size: 0.03rem;\n                  margin-top: 0.1rem;\n                  line-height: 0.3rem;\n                  background: tomato;\n                  border-radius: 0.05rem; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(2) span:nth-child(2) {\n                  height: 0.24rem;\n                  font-size: 0.03rem;\n                  border: 1px solid tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.24rem;\n                  border-radius: 0.05rem;\n                  color: tomato; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(2) span:nth-child(3) {\n                  height: 0.26rem;\n                  font-size: 0.03rem;\n                  background: tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.24rem;\n                  border-radius: 0.05rem;\n                  color: #fff; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(2) span:nth-child(4) {\n                  height: 0.26rem;\n                  font-size: 0.03rem;\n                  border: 1px solid tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.24rem;\n                  border-radius: 0.05rem;\n                  color: tomato; }\n            section #listContent #listMain .change-listMain-info li .right p:nth-child(3) {\n              height: 0.5rem;\n              line-height: 0.5rem; }\n              section #listContent #listMain .change-listMain-info li .right p:nth-child(3) span {\n                font-size: 0.34rem;\n                color: tomato; }\n              section #listContent #listMain .change-listMain-info li .right p:nth-child(3) del {\n                color: #999; }\n            section #listContent #listMain .change-listMain-info li .right p:nth-child(4) {\n              height: 0.5rem;\n              line-height: 0.5rem;\n              display: flex; }\n              section #listContent #listMain .change-listMain-info li .right p:nth-child(4) span {\n                display: block; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(4) span:nth-child(1) {\n                  width: 1rem;\n                  margin-right: 0.5rem; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(4) span:nth-child(2) {\n                  width: 0.5rem;\n                  height: 0.3rem;\n                  background: green;\n                  margin-top: 0.1rem;\n                  line-height: 0.3rem;\n                  border-radius: 0.1rem;\n                  text-align: center;\n                  line-height: 0.3rem; }\n                section #listContent #listMain .change-listMain-info li .right p:nth-child(4) span:nth-child(3) {\n                  width: 0.6rem;\n                  height: 0.25rem;\n                  border: 1px solid tomato;\n                  color: tomato;\n                  margin-top: 0.1rem;\n                  line-height: 0.25rem;\n                  border-radius: 0.1rem;\n                  text-align: center;\n                  line-height: 0.25rem; }\n  section #detailContent {\n    width: 100%;\n    height: auto; }\n    section #detailContent .swiper-container {\n      width: 100%;\n      height: auto; }\n      section #detailContent .swiper-container .swiper-wrapper {\n        height: auto; }\n        section #detailContent .swiper-container .swiper-wrapper .swiper-slide {\n          height: auto;\n          display: flex;\n          align-items: center;\n          justify-content: center; }\n    section #detailContent #proList {\n      width: 100%;\n      overflow-x: hidden; }\n      section #detailContent #proList li {\n        border-bottom: 0.15rem solid #f4f4f4; }\n      section #detailContent #proList .list1 {\n        width: 100%;\n        background-color: #fff;\n        display: flex;\n        position: relative; }\n        section #detailContent #proList .list1 .proInfo {\n          flex: 1;\n          margin-top: 0.14rem;\n          position: relative;\n          margin-right: 0.2rem; }\n          section #detailContent #proList .list1 .proInfo p {\n            width: 100%; }\n            section #detailContent #proList .list1 .proInfo p:nth-child(1) {\n              font-size: 0.28rem;\n              line-height: 0.34rem;\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 2;\n              -webkit-box-orient: vertical; }\n            section #detailContent #proList .list1 .proInfo p:nth-child(2) {\n              margin-top: 0.12rem; }\n              section #detailContent #proList .list1 .proInfo p:nth-child(2) span {\n                color: #e9704f;\n                font-size: 0.36rem; }\n              section #detailContent #proList .list1 .proInfo p:nth-child(2) b {\n                color: #e9704f;\n                font-size: 0.42rem; }\n              section #detailContent #proList .list1 .proInfo p:nth-child(2) .dprm {\n                font-size: 0.1rem;\n                background: red;\n                color: #fff; }\n            section #detailContent #proList .list1 .proInfo p:nth-child(3) {\n              margin-top: 0.08rem;\n              color: #999;\n              font-size: 0.26rem; }\n      section #detailContent #proList .list2 {\n        width: 100%;\n        background-color: #fff;\n        position: relative;\n        padding-bottom: 0.3rem; }\n        section #detailContent #proList .list2 .proimg {\n          width: 100%;\n          height: 1rem;\n          margin: 0.1rem;\n          display: flex; }\n          section #detailContent #proList .list2 .proimg img {\n            width: 1rem;\n            height: 1rem;\n            border: 1px solid #c8c8c8; }\n          section #detailContent #proList .list2 .proimg .p1 {\n            font-size: 0.3rem; }\n        section #detailContent #proList .list2 .proInfo2 {\n          flex: 1;\n          margin-top: 0.14rem;\n          position: relative;\n          margin-right: 0.2rem; }\n          section #detailContent #proList .list2 .proInfo2 .p2 {\n            margin-top: 0.2rem;\n            font-size: 0.2rem;\n            color: #999999;\n            margin-left: 0.4rem; }\n            section #detailContent #proList .list2 .proInfo2 .p2 span {\n              color: darkgreen;\n              margin-right: 0.4rem; }\n        section #detailContent #proList .list2 .shop {\n          display: flex; }\n          section #detailContent #proList .list2 .shop .allshop {\n            display: flex;\n            margin-top: 0.1rem;\n            margin-left: 0.1rem;\n            display: block;\n            width: 2.9rem;\n            height: 0.7rem;\n            line-height: 0.7rem;\n            border: 1px solid #999999;\n            border-radius: 0.1rem; }\n            section #detailContent #proList .list2 .shop .allshop img {\n              display: block;\n              float: left;\n              width: 0.5rem;\n              height: 0.5rem;\n              margin: 0.1rem 0.1rem 0 0.4rem; }\n      section #detailContent #proList .list3 {\n        font-size: 0.26rem;\n        line-height: 140%;\n        padding: 0.1rem; }\n      section #detailContent #proList .list4 {\n        margin-top: 0.1rem; }\n  section #userContent {\n    width: 100%;\n    overflow-x: hidden;\n    height: 100%; }\n    section #userContent .top {\n      width: 100%;\n      height: 1.7rem;\n      background: deepskyblue;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      color: #fff;\n      font-size: 0.4rem; }\n      section #userContent .top .iconfont {\n        font-size: 0.5rem;\n        margin: 0.1rem 0.2rem 0 0.2rem; }\n    section #userContent .classfiy {\n      width: 95%;\n      height: 1.3rem;\n      margin: 0.3rem auto;\n      background: #ccc;\n      display: flex;\n      justify-content: space-between; }\n      section #userContent .classfiy li {\n        width: 24.7%;\n        height: 100%;\n        background: #eee;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        flex-direction: column;\n        font-size: 0.3rem; }\n        section #userContent .classfiy li .iconfont {\n          font-size: 0.5rem; }\n    section #userContent .sex {\n      width: 95%;\n      margin: 0 auto;\n      border: 0.02rem solid #ccc;\n      height: 1rem;\n      line-height: 1rem;\n      text-indent: 0.4rem;\n      font-size: 0.4rem;\n      position: relative;\n      margin-bottom: 0.3rem; }\n      section #userContent .sex b {\n        position: absolute;\n        right: 0.7rem;\n        font-weight: 100; }\n      section #userContent .sex > span {\n        position: absolute;\n        transform: scaleX(0.5);\n        right: 0.2rem; }\n    section #userContent .sexs {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      background: -webkit-linear-gradient(bottom, #ee4585, #ecb4c9);\n      left: 0;\n      top: 0;\n      left: 100%;\n      z-index: 9999; }\n      section #userContent .sexs p {\n        color: #fff; }\n        section #userContent .sexs p:nth-child(1) {\n          margin-top: 0.4rem;\n          text-align: center;\n          font-size: 0.45rem; }\n        section #userContent .sexs p:nth-child(2) {\n          text-align: center;\n          font-size: 0.36rem;\n          margin-bottom: 1rem; }\n      section #userContent .sexs .active {\n        color: #fff; }\n      section #userContent .sexs .girls {\n        position: absolute;\n        width: 2.3rem;\n        left: 0.3rem;\n        height: 2.3rem; }\n        section #userContent .sexs .girls .girl,\n        section #userContent .sexs .girls .girl1 {\n          position: absolute;\n          left: 0;\n          top: 0;\n          width: 100%; }\n        section #userContent .sexs .girls span {\n          position: absolute;\n          left: 0.72rem;\n          bottom: -0.6rem;\n          font-size: 0.4rem; }\n      section #userContent .sexs .moms {\n        position: absolute;\n        width: 2.3rem;\n        right: 0.3rem;\n        height: 2.3rem; }\n        section #userContent .sexs .moms .mom,\n        section #userContent .sexs .moms .mom1 {\n          width: 100%;\n          position: absolute;\n          left: 0;\n          top: 0; }\n        section #userContent .sexs .moms span {\n          position: absolute;\n          left: 0.72rem;\n          bottom: -0.6rem;\n          font-size: 0.4rem; }\n      section #userContent .sexs .boys {\n        position: absolute;\n        width: 2.3rem;\n        left: 2rem;\n        top: 5rem;\n        height: 2.3rem; }\n        section #userContent .sexs .boys .boy,\n        section #userContent .sexs .boys .boy1 {\n          width: 100%;\n          position: absolute;\n          left: 0;\n          top: 0; }\n        section #userContent .sexs .boys span {\n          position: absolute;\n          left: 0.72rem;\n          bottom: -0.6rem;\n          font-size: 0.4rem; }\n      section #userContent .sexs .close {\n        position: absolute;\n        bottom: 0.2rem;\n        left: 37%; }\n    section #userContent .tab {\n      width: 95%;\n      margin: 0 auto;\n      border: 0.02rem solid #ccc;\n      height: 1rem;\n      line-height: 1rem;\n      text-indent: 0.4rem;\n      font-size: 0.4rem;\n      position: relative; }\n      section #userContent .tab > span {\n        position: absolute;\n        transform: scaleX(0.5);\n        right: 0.2rem; }\n  section #loginContent, section #registerContent {\n    width: 100%;\n    height: 100%;\n    background: whitesmoke; }\n    section #loginContent .logintip, section #registerContent .logintip {\n      width: 100%;\n      height: 0.6rem;\n      line-height: 0.6rem;\n      font-size: 0.23rem;\n      margin-bottom: 0.2rem;\n      text-indent: 0.2rem; }\n    section #loginContent .namebox, section #loginContent .passbox, section #registerContent .namebox, section #registerContent .passbox {\n      width: 100%;\n      height: 0.8rem;\n      background: #fff;\n      display: flex;\n      align-items: center;\n      text-indent: 0.1rem;\n      font-size: 0.25rem;\n      margin-bottom: 0.05rem; }\n      section #loginContent .namebox span, section #loginContent .passbox span, section #registerContent .namebox span, section #registerContent .passbox span {\n        width: 20%; }\n      section #loginContent .namebox .loginname, section #loginContent .namebox .loginpass, section #loginContent .namebox .registername, section #loginContent .namebox .registerpass1, section #loginContent .namebox .registerpass2, section #loginContent .passbox .loginname, section #loginContent .passbox .loginpass, section #loginContent .passbox .registername, section #loginContent .passbox .registerpass1, section #loginContent .passbox .registerpass2, section #registerContent .namebox .loginname, section #registerContent .namebox .loginpass, section #registerContent .namebox .registername, section #registerContent .namebox .registerpass1, section #registerContent .namebox .registerpass2, section #registerContent .passbox .loginname, section #registerContent .passbox .loginpass, section #registerContent .passbox .registername, section #registerContent .passbox .registerpass1, section #registerContent .passbox .registerpass2 {\n        flex: 1;\n        border: 0;\n        height: 100%;\n        outline: none; }\n    section #loginContent .loginbtn, section #loginContent .registerbtn, section #registerContent .loginbtn, section #registerContent .registerbtn {\n      display: block;\n      width: 95%;\n      margin: 0 auto;\n      height: 0.8rem;\n      border-radius: 0.1rem;\n      border: 0;\n      background: -webkit-linear-gradient(top, #e9704f, #ea502d);\n      color: #ccc;\n      line-height: 0.8rem;\n      text-align: center;\n      margin: 0.3rem 2.5%;\n      font-size: 0.3rem; }\n    section #loginContent .loginonther, section #registerContent .loginonther {\n      width: 95%;\n      margin: 0 auto;\n      display: flex;\n      justify-content: space-between;\n      color: red;\n      font-size: 0.23rem; }\n\nfooter {\n  width: 100%;\n  height: 1rem;\n  background-color: #333; }\n  footer ul {\n    width: 100%;\n    height: 100%;\n    display: flex; }\n    footer ul li {\n      flex: 1;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      box-sizing: border-box;\n      border-top: 0.06rem solid transparent;\n      color: #fff; }\n      footer ul li i.iconfont {\n        display: block;\n        font-size: 0.4rem; }\n      footer ul li p {\n        font-size: 0.20rem; }\n      footer ul li.active {\n        border-top: 0.06rem solid #e9704f;\n        color: #e9704f; }\n  footer #detailFooter {\n    width: 100%;\n    height: 1rem;\n    background-color: #fff; }\n    footer #detailFooter ul {\n      display: flex; }\n      footer #detailFooter ul li:nth-child(1) {\n        flex: 2;\n        color: #999999; }\n        footer #detailFooter ul li:nth-child(1) img {\n          width: 0.5rem;\n          height: 0.5rem; }\n      footer #detailFooter ul li.acive {\n        border: 0; }\n      footer #detailFooter ul li:nth-child(2) {\n        flex: 2;\n        color: #999999; }\n        footer #detailFooter ul li:nth-child(2) img {\n          width: 0.5rem;\n          height: 0.5rem; }\n      footer #detailFooter ul li:nth-child(3) {\n        flex: 2;\n        color: #999999; }\n        footer #detailFooter ul li:nth-child(3) img {\n          width: 0.5rem;\n          height: 0.5rem; }\n      footer #detailFooter ul li:nth-child(4) {\n        background: orange;\n        flex: 3;\n        color: #fff; }\n      footer #detailFooter ul li:nth-child(5) {\n        background: red;\n        flex: 3;\n        color: #fff; }\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "Fontin_Sans_BI_45b.otf";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);