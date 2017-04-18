
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
							var Detail=require("./Detail");
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
