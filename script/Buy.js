
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
				var List=require("./List");
				List.loadListHeader("buy");
				List.loadListContent("buy",classID,'type1');
			});	
			
		});
	}
}