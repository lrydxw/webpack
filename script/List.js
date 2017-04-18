module.exports={
	loadListHeader:function(type){
	   $("#header").load("html/list.html #listHeader",function(){
	   	$("#back").tap(function () {
	   		 if(type=='search'){
	   			var Search=require("./Search");
	   			Search.loadSearchHeader('search');
	   			Search.loadSearchContent("search");
	   	   }
	   		 else if(type=="buy"){
	   		 	var Buy=require("./Buy");
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
					var Toast=require("./Toast");
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
						var Detail=require("./Detail");
						Detail.loadDetailHeader('list',classID,type1);
						Detail.loadDetailContent(goodsID,classID);
						Detail.loadDetailFooter();
						$("#detailfooter").show()
					})
					$(".change-listMain-info li").tap(function () {
						var goodsID=$(this).attr("goodsID");
						var Detail=require("./Detail");
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
             		var Search=require("./Search");
             		Search.loadSearchHeader();
             		Search.loadSearchContent();
             	}
            })
		})
	}
}
