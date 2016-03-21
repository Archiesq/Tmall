
$(function(){
//热门品牌加心
	var xin=getClass("xin");
	var hotcenter10=getClass("hotcenter10");
	for (var i=0;i<hotcenter10.length;i++){
		hotcenter10[i].index=i;
		hotcenter10[i].onmouseover=function(){
		xin[this.index].style.display="block";}
		hotcenter10[i].onmouseout=function(){
		xin[this.index].style.display="none";}
	}

//搜索文字预设
	var tex=$("#tex");
	tex.onfocus=function(){//获得焦点
		if(tex.value=="懒人不出门,装修0元包送装"){
			tex.value="";
		}	
	}
	tex.onblur=function(){//失去焦点
		if(tex.value){}
			else{ 
			tex.value="懒人不出门,装修0元包送装";
		}
	}


var texs=$("#texs");
	texs.onfocus=function(){//获得焦点
		if(texs.value=="懒人不出门,装修0元包送装"){
			texs.value="";
		}	
	}
	texs.onblur=function(){//失去焦点
		if(texs.value){}
			else{ 
			texs.value="懒人不出门,装修0元包送装";
		}
	}
//轮播
	var bigbanner=getClass("bigbannerbox");
	var img=getClass("banner-center1");
	var btn=getClass("bannerbtn");
	var num=1;
	var back=["#ee1415","#e8e8e8","#085195","#ececec","#121820"];
	function move(){
		if(num==5){
			num=0;
		}
		for(var i=0;i<img.length;i++){
	
		img[i].style.zIndex=2;
		btn[i].style.background="#888";
		}
		img[num].style.zIndex=3;
		btn[num].style.background="#ccc";
		bigbanner[0].style.background=back[num];
		num++;
	}
	var t=setInterval(move,2000);

	for(var i=0;i<btn.length;i++){
		btn[i].index=i;
	btn[i].onmouseover=function(){
		clearInterval(t);
		for(var j=0;j<img.length;j++){
			img[j].style.zIndex=2;
			btn[j].style.background="#888";
		}
		img[this.index].style.zIndex=3;
		btn[this.index].style.background="#ccc";
		bigbanner[0].style.background=back[this.index];
	}
		btn[i].onmouseout=function(){
			t=setInterval(move,2000);
			num=this.index+1;
		}

	}
//	选项卡
	var repai=getClass("repai")
	var hotcenter=getClass("hotcenter")

	for(var i=0;i<repai.length;i++){//给每一个标题添加单击事件
		repai[i].index=i;  //index,保存相应对象的i的值，index可以自己定的名字
		//alert(i)
		//alert(word[i].index)
		repai[i].onclick=function(){
			//alert(tihs.index)
			for(var j=0;j<hotcenter.length;j++){
				hotcenter[j].style.display="none"; 
				repai[j].style.fontWeight="normal";
				repai[j].style.textDecoration="none";
			}
			hotcenter[this.index].style.display="block";//this表示单击谁指谁
			this.style.fontWeight="bold";
			this.style.textDecoration="underline";

		}
	}
//楼层跳转
	var search=$(".search00")[0];
		var flagdown=true;
		var flagup=true;//0-440  440-5000
		var floors=$(".yi");
		var jump=$(".jumps")[0];
		var btns=$("li",jump);
		//按钮控制滚动条
        for(var i=0;i<btns.length;i++){
        	btns[i].index=i;
        	btns[i].onclick=function(){
                //alert(floors[this.index].t)
                var obj=document.documentElement.scrollTop?document.documentElement:document.body;//获取滚动条的对象
                //var scrollT=getScrollT();
                //obj.scrollTop=floors[this.index].t;
                animate(obj,{scrollTop:floors[this.index].t-100})//当前按钮的对应楼层的top赋值给滚动条
        	}
        }
        var you=$(".you");
		window.onscroll=function(){
			//搜索框的显示与隐藏
			var scrollT=getScrollT();
			if (scrollT>=754){
				if(flagdown){//为了保证页面往下拉时只有一个animate函数执行
					animate(search,{top:0},500);
					animate(you[7],{opacity:1},500);
					flagdown=false;
					flagup=true;
					}
			}else{
				if(flagup){
					animate(search,{top:-50},500);
					animate(you[7],{opacity:0},500);
					flagdown=true;
					flagup=false;
					}
				}
		//楼层跳转
		if(scrollT>=1051){
			jump.style.display="block";
		}else{
			jump.style.display="none";
		}
		//滚动条控制按钮
		for(var i=0;i<floors.length;i++){
			floors[i].t=floors[i].offsetTop;
			if(floors[i].t<=scrollT+100){
				for(var j=0;j<btns.length;j++){
            			btns[j].style.color="#000";
            			btns[j].style.background="#fff";
            		}
            	btns[i].style.color="#fff";
            	btns[i].style.background="red";
				}
			}
			//按需加载
	var floors1=$(".yi");
		var hh=document.documentElement.clientHeight;
		//var oh=floors.offsetTop;
		
		var scrollT1=getScrollT();
		for(i=0;i<floors1.length;i++){
			if(floors1[i].offsetTop<hh+scrollT1){//当前楼层的高度如果小于页面内容超出浏览器部分+浏览器的距离时；
				var imgs=$("img",floors1[i]);
				//获取当前楼层的所有图片
				for(var j=0;j<imgs.length;j++){
					//遍历图片
					imgs[j].src=imgs[j].getAttribute("aa");
					//把每一个图片的aa属性赋值
				}
			}
		}
	
		
		}
//左右轮播
	function lunbo(i){
		
		var bigbox=$(".middlebox",floors[i])[0];
		var lefts=$(".left1",floors[i])[0];
		var rights=$(".right110",floors[i])[0];
		function moveleft(){
		var last=getLast(bigbox);
			var first=getFirst(bigbox);
		animate(bigbox,{left:-200},600,Tween.Linear,function(){
			bigbox.insertAfter(first,last);
			bigbox.style.left=0;
		})
		} 
		
		function moveright(){
			var last=getLast(bigbox);
			var first=getFirst(bigbox);
			bigbox.insertBefore(last,first);
			bigbox.style.left=-200+"px";//注意单位
		animate(bigbox,{left:0},600,Tween.Linear)
		} 
		var t=setInterval(moveleft,2000);

		lefts.onmouseover=function(){
			clearInterval(t)
		}
		lefts.onmouseout=function(){
			t=setInterval(moveleft,2000);
		}
		rights.onmouseover=function(){
			clearInterval(t)
			
		}
		rights.onmouseout=function(){
			t=setInterval(moveleft,2000)
		}	
		lefts.onclick=function(){
			moveleft();
		}
		rights.onclick=function(){
			moveright();
		}
	}
	//var lou=$(".middle1");
	//for(var i=0;i<12;i++){
	 //lunbo(i)
	//}
	lunbo(0);
	lunbo(1);
	lunbo(2);
	lunbo(3);
	lunbo(4);
	lunbo(7);
//左移
function zuoyi(num){
	var youbian=$(".yi-right")[num];
	var img1=$("img",youbian);
	  for(var i=0;i<img1.length;i++){
	   	img1[i].index=i;
	   	img1[i].onmouseover=function(){
	   		img1[this.index].style.cssText="position:relative;left:-5px;box-shadow:1px 5px 0px rgba(0,0,0,0.1);"
	   		  
	   	}
	   	img1[i].onmouseout=function(){
	   		img1[this.index].style.cssText="position:relative;left:0px;box-shadow:1px 0px 0px rgba(0,0,0,0.1);"
	   	 
	   	}
	}

}
for(var i=0;i<12;i++){
	zuoyi(i);
}
/************************************************************************/
//top 下拉
var yiji=$(".yiji");
		var erji=$(".erji");


   		for(var i=0;i<yiji.length;i++){
 			yiji[i].index=i;
 			hover(yiji[i],function(){
  				var lis=$("li",erji[this.index]);
				var h=lis[0].offsetHeight;
 				erji[this.index].style.height=0;
 				yiji[this.index].style.background="#fff";
  				erji[this.index].style.border="1px solid #ddd";
 				// yiji[this.index].style.border="1px solid #ddd";
 				yiji[this.index].style.borderBottom="none";
 				erji[this.index].style.borderTop="none";
 				animate(erji[this.index],{height:lis.length*h},100,Tween.Linear);
 			},function(){
  				yiji[this.index].style.border="none";
 				yiji[this.index].style.background="none";
 				erji[this.index].style.border="none";

   				animate(erji[this.index],{height:0},100,Tween.Linear);
 			})
		}

/***************************************************************************/
//banner 左侧
    var lefts=$('.leftbian');
    var cai=$('.caidans');
    var highlight=$(".highlight");
    var highlight2=$(".highlight2");
    var highlight3=$(".highlight3");
  	// var arrzi=["red","blue","yellow","red","blue","yellow","red","blue","yellow"];
	
	for(var i=0;i<highlight.length;i++){
			highlight[i].style.color="red";
	} 
	for(var i=0;i<highlight2.length;i++){
			highlight2[i].style.color="blue";
	} 
	for(var i=0;i<highlight3.length;i++){
			highlight3[i].style.color="green";
	} 
     for(var i=0;i<lefts.length;i++){
    	lefts[i].index=i;
     	hover(lefts[i],function(){
    		for(var j=0;j<cai.length;j++){
    			cai[j].style.display="none";
    		}
    			cai[this.index].style.display="block";
     	},function(){
    		cai[this.index].style.display="none";
    	})
    	
    }
/*****************************************************************************************/
//右侧
	var huadong=$(".huadong");
	var huadong1=$(".huadong1")[0];
	var erweima=$(".erweima")[0];
	erweima.onmouseover=function(){
		animate(huadong1,{opacity:1},500);
		huadong1.style.display="block";
	}
	erweima.onmouseout=function(){
		animate(huadong1,{opacity:0},500);
		huadong1.style.display="none";
	}
	var you=$(".you");
	for(var i=0;i<you.length;i++){
		you[i].index=i;
		var flag=true;
		
		you[i].onmouseover=function(){
			
			animate(huadong[this.index],{right:35,opacity:1},500);
			huadong[this.index].style.display="block";
			}
	
		you[i].onmouseout=function(){
			animate(huadong[this.index],{right:60,opacity:0},500);
			huadong[this.index].style.display="none";
			}

		you[7].onclick=function(){
			 var obj=document.documentElement.scrollTop?document.documentElement:document.body;
			animate(obj,{scrollTop:0})
		}

	}

    
})