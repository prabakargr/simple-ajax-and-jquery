var fromchan="";
var tochan="";
var datechan="";
var props="";
var route="";
$(document).ready(function(){
	$.ajax({
		type:"GET",
		url:"http://59f0485ace72350012bebf99.mockapi.io/buslist",
		dataType:"json",
		success:function(result){
			var fromcity="<option  value=''>"+"select city"+"</option>";
			var tocity="<option value=''>"+"select city"+"</option>";
			var date="<option value=''>"+"Date"+"</option>";
            props=result;
			for (var i = 0; i < result.length; i++) {
				fromcity+="<option>"+result[i].from+"</option>";
				tocity+="<option>"+result[i].to+"</option>";
				date+="<option>"+result[i].date+"</option>";
		}
		$("#fromcity").html(fromcity);
		$("#tocity").html(tocity);
		$("#date").html(date);
	}
	});
    $("#fromcity").change(function(){
     fromchan=$("#fromcity").val();
	});
	$("#tocity").change(function(){
     tochan=$("#tocity").val();
	});
	$("#date").change(function(){
     datechan=$("#date").val();
	});
	$("button").click(function(){
		 route={
              from:fromchan,
              to:tochan,
              date:datechan,
		}
		$.post("http://59f05eecce72350012bebfa9.mockapi.io/route",route,function(){
			$("#fromcity").val("");
			$("#tocity").val("");
			$("#date").val("");
		})

		console.log(route);
		for (var i = 0; i < props.length; i++) {
			if (props[i].from==route.from && props[i].to==route.to
				&& props[i].date==route.date) {
				$.ajax({
                    type:"GET",
                    url:"http://59f18593a118a000126fbe0d.mockapi.io/buses",
                    dataType:"json",
                    success:function(result){
                    	var aa='';
                    	for ( i = 0; i < result.length; i++) {
                    		aa+="<tr><td>"+result[i].id+"</td><td>"+result[i].busname+"</td><td>"+result[i].time+
		                 "</td><td>"+result[i].fare+"</td></tr>"

                    	}
                 		$("#tbody").html(aa);  

                    }
				});
			}else{
				$("#tbody").html("");

			}
		}
		
	});
});









