module.exports={
	toast:function (str,time) {
		var time=time?time:2000;
		$("#toast").show();
		$("#toast").html(str);
		setTimeout(function () {
			$("#toast").hide()
		},time)
	}
}
