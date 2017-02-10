var ShowImg=function(cfg,type,container){
	//根据类型 选择 相应的css样式
	cfg.forEach(function(item){
		$(container).addClass(type)
		$(container).append('<div class="show-item show-item-'+type+'"><img src='+item.imgSrc+'><div class="text">'+item.text+'</div><div class="backface">'+item.backText+'</div></div>');
	})
	
	//输入每张图片的信息;
	var imgArr=[];
	for(var i=0;i<$(".show-item").length;i++){
		imgArr[i]={}
		imgArr[i].img=$(".show-item")[i];
		imgArr[i].zIndex=i;
	}

	//根据总的图片数量计算差值;
	
	$(".horrible").click(function(){
		position=400;
		rotate("Y");
		$("body").css("background","#aaa")
	})
	$(".vetical").click(function(){
		position=300;
		rotate("X")
		$("body").css("background","#abc")
	})
	$(".focus").click(function(){
		transform()
		$("body").css("background","#bca")
	})
	$(".stack").click(function(){
		stack()
		$("body").css("background","#eee")
	})
	$(".random").click(function(){
		random()
		$("body").css("background","#ccc")
	})
	$(".rehearse").click(function(){
		rehearse()
		$("body").css("background","#caa")
	})
	var rowStart=$(imgArr[1].img).width()*30;
	function rehearse(){
		$(".turn").css("left",400)
		var width=$(imgArr[1].img).width()+10;
		var column=3;
		var height=$(imgArr[1].img).height()+10;
		var rowWidth=column*width;
		imgArr.forEach(function(elem,index){
			var translateX=(rowStart+width*index)%(width*imgArr.length);  //计算每个块本应该的位移距离;
			var translateY=isNextRow(translateX).y-170;
			translateX=isNextRow(translateX).x
			var transform="translateX("+translateX+"px) translateY("+translateY+"px) "
			$(imgArr[index].img).css({
				transform:transform
			});
			
		})
		function isNextRow(translateX){
			var data={x:0,y:0}
			if(translateX>rowWidth-1){
				var row=parseInt(translateX/rowWidth)
				data.x=translateX-rowWidth*row;
				data.y=row*height
			}else{
				data.x=translateX;
				data.y=0
			}
			
			return data;
		}
		rowStart+=width;
	}

	//旋转
	var difference=360/imgArr.length;
	var degStart=2000;
	var position=2000
	function rotate(X){
		$(".turn").css("left",700)
		imgArr.forEach(function(elem,index){
			var deg=(degStart+difference*index);
			var transform="rotate"+X+"("+deg+"deg) translateZ("+position+"px)"
			$(imgArr[index].img).css({
				transform:transform
			});
		})
		degStart+=difference;
	}
	//轮播;
	var transXBegin=0;
	var transZBegin=0;
	function transform(){
		$(".turn").css("left",100)
		var marginX=100;
		var marginZ=120;
		var paddingX=70
		imgArr.forEach(function(elem,index){
			var translateX=(transXBegin+index*marginX)%((imgArr.length)*marginX);
			var translateZ=(transZBegin+index*marginZ)%((imgArr.length)*marginZ);
			
			if(translateZ>4*marginZ){
				translateZ=(imgArr.length-1)*marginZ-translateZ;
			}
			if(translateX>4*marginX){
				translateX=translateX+(translateX-4*marginX)/marginX*paddingX
			}
			var transform="translateX("+translateX+"px) translateZ("+translateZ+"px)"
			$(imgArr[index].img).css({
				transform:transform
			});
		})
		transXBegin+=marginX;
		transZBegin+=marginZ;
	}
	//叠放;
	function stack(){
		$(".turn").css("left",700)
		imgArr.forEach(function(elem,index){
			$(imgArr[index].img).css({
				transform:"none"
			});
		})
	}
	//打乱;
	function random(){
		$(".turn").css("left",200)
		imgArr.forEach(function(elem,index){
			var translateX=Math.random()*1200-200;
			var translateY=Math.random()*500-200;
			$(imgArr[index].img).css({
				transform:"translateX("+translateX+"px) translateY("+translateY+"px)"
			});
		})

	}
	this.initial=function(){
		rehearse()
	}
}
