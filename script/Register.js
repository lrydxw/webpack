module.exports={
	loadRegisterHeader:function(type){
		$("#header").load("html/register.html #registerHeader",function(){
			$("#back").tap(function () {
				var Login=require("./Login");
				Login.loadLoginHeader();
				Login.loadLoginContent();
			})
		})
	},
	loadRegisterContent:function(){
		$("#content").load("html/register.html #registerContent",function(){
			//验证注册
			$(".registerbtn").tap(function () {
				var Toast=require("./Toast");
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
											var Login=require("./Login");
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
