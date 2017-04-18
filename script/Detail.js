//var str = "我是首页";
//module.exports = str;
var mySwiper, goodsID1;
module.exports = {
	loadDetailHeader: function(type, classID,type1) {
		$("#header").load("html/detail.html #detailHeader", function() {
			$("#back").on("tap", function() {
				if(type == "home") {
					var Home = require("./Home");
					Home.loadHomeHeader();
					Home.loadHomeContent();
				}
				else if(type=="list"){
					var List=require("./List");
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
					var Buy=require("./Buy");
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
				var Buy = require("./Buy");
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
					var AddCart = require("./AddCart");
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
					var Login = require("./Login");
					Login.loadLoginHeader("detail",goodsID);
					Login.loadLoginContent("detail",goodsID);
					$("#detailfooter").hide();
					$("#indexfooter").show();
				}
			})
		})
	}
}