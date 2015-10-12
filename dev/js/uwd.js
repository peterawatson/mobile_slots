(function(window){

 var sB = function()
	 {
		 $("#search-button").click(function(e){
			 e.preventDefault();
			 $("#search-form").show(100);
			 $("#search-button,#middlemen").hide(100);
			});
	 
	  $("#search-icon").click(function(e){
			 e.preventDefault();
			 $("#search-form").hide(100);
			 $(".search-form-input").val('');
			 $('#livesearch').html("").css('border','0');
			 $("#search-button,#middlemen").show(100);
			 
			});		 
	 } 
		   
      
 var pB2 = function(){
	$('.tab-content').on('click', '.gameicon', function(e){
		
		var thisgameicon = $(this);   
		var thisplaybtn = thisgameicon.parent().siblings('a').find('.playbtn');
		thisgameicon.css({'opacity' : 0, 'z-index' : -1});
		thisplaybtn.css({'opacity' : 1});
	
		
		
		setTimeout(function(){
			thisgameicon.css({'opacity' : 1, 'z-index' : 2});
			thisplaybtn.css({'opacity' : 0});
		}, 2000)			
		
			
			e.preventDefault();
			e.stopPropagation();				
		}
	);
	
	

	$('.tab-content').on('click', '.playbtn', function(e){
		
		e.preventDefault();
		e.stopPropagation();
		}
	);
}	


 
var se = function(){
	showResult = function(str) { 
		var xmlhttp;
	  if (str.length==0) {
		document.getElementById("livesearch").innerHTML="";
		document.getElementById("livesearch").style.border="0px";
		return;
	  }
	  if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  } else {  // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		  document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
		  document.getElementById("livesearch").style.border="1px solid #A5ACB2";
		  document.getElementById("livesearch").style.padding="10px 10%";
		}
	  }
	  xmlhttp.open("GET","include/livesearch.php?q="+str,true);
	  xmlhttp.send();
	}
}

var init = function () {
					sB();
					pB2();
					se();
					
				};
				
				window.addEventListener("DOMContentLoaded", init, false);

})(window)

