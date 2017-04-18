module.exports = {
	loadHeader:function(type){
		$("header").load("html/order.html #orderheader",function(){
			$("#back").tap(function () {
				if(type=="user"){
					var User=require("./User");
					User.loadUserHeader();
					User.loadUserContent();
				}
				else{
					var User=require("./User");
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
				var Login=require("./Login");
				Login.loadLoginHeader("user");
				Login.loadLoginContent("user");
			}
			
			
		})
	}
}