module.exports={
	addcart:function (userID,goodsID,number,type) {
		var Toast=require("./Toast");
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
