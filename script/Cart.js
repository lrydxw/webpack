module.exports = {
	loadHeader: function() {
		$("header").load("html/cart.html #cartheader", function() {
			$("#back").tap(function () {
				var Home=require("./Home");
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
						var AddCart = require("./AddCart");
												
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
				var Home=require("./Home");
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
									var Toast = require("./Toast");
									var AddCart = require("./AddCart");
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
											var Cart = require("./Cart");
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
				var Login = require("./Login");
				Login.loadHeader("cart");
				Login.loadContent("cart");
			};
		})
	}
}