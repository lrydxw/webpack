module.exports={
	loadUserHeader:function(){
		$("#header").load("html/user.html #userHeader",function () {
			if(localStorage.getItem("userID")){
				$("#exit").show()
			}
			$("#exit").tap(function () {
				var Toast=require("./Toast");
				Toast.toast("当前账号已退出")
				localStorage.setItem("userID","");
				var User=require("./User");
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
					var Cart=require("./Cart");
					Cart.loadHeader("cart");
					Cart.loadContent("cart");
				}
				else{
					var Login=require("./Login");
					Login.loadLoginHeader();
					Login.loadLoginContent();
				}
			})
			$(".myorder").tap(function () {
				if(localStorage.getItem("userID")){
					var Order=require("./Order");
					Order.loadHeader("user");
					Order.loadContent("user");
				}
				else{
					var Login=require("./Login");
					Login.loadLoginHeader("order");
					Login.loadLoginContent("order");
				}
				
			})
			$(".updata").tap(function () {
				var Toast=require("./Toast");
				Toast.toast("暂无更新内容")
			})
		})
	}
}
