module.exports={
	loadLoginHeader:function(type,goodsID){
		$("#header").load("html/login.html #loginHeader",function(){
			$("#back").tap(function () {
				if(type=="cart"){
					var Cart=require("./Cart");
					Cart.loadCartHeader();
					Cart.loadCartContent();
				}
				else if(type=="detail"){
					var Detail=require("./Detail");
					Detail.loadDetailHeader("home");
					Detail.loadDetailContent(goodsID);
					Detail.loadDetailFooter();
				}
				else{
					var User=require("./User");
					User.loadUserHeader();
					User.loadUserContent();
				}				
			})
		})
	},
	loadLoginContent:function(type,goodsID){
		$("#content").load("html/login.html #loginContent",function(){
			$(".toRegister").tap(function () {
				var Register=require("./Register");
				Register.loadRegisterHeader();
				Register.loadRegisterContent();
			});
			$(".loginbtn").tap(function () {
				var Toast=require("./Toast");
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
										var Cart=require("./Cart");
										Cart.loadCartHeader();
										Cart.loadCartContent();
									}
									else if(type=="order"){
										var Order=require("./Order");
										Order.loadHeader("user");
										Order.loadContent("user");
									}
									else if(type=="detail"){
										var Detail=require("./Detail");
										Detail.loadDetailHeader("home");
										Detail.loadDetailContent(goodsID);
										Detail.loadDetailFooter();
									}
									else{
										var User=require("./User");
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
