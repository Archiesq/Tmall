//兼容函数1
//1.函数功能：解决IE8里不能使用getElementsByClassName的问题
//变量说明	
	//obj 选定范围需要的名字 如div span等 
	//classname 为想寻找的类名
	function getClass(classname,obj){
		var obj=obj||document;
	//判断是否w3c浏览器
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);

		}else{
			//ie8
			var arr=[]
			var all=obj.getElementsByTagName("*");//将标签名都选取出来
			for(var i=0;i<all.length;i++){//遍历以选取classname
				if(checkrel(all[i].className,classname)){//判断all的第i个元素的className是否与classname相等
					arr.push(all[i]);
				}
			}
			return arr;
		}
	}
	//str 多个类名的集合   ； val 想找的类名；
	function checkrel(str,val){
		var newarr=[];
		 newarr=str.split(" ");

		for( var i=0;i<newarr.length;i++){
			if(newarr[i]==val){
				return true;
			}
		}return false;
	}
/*****************************************************************/
/*2.可以解决IE与W3C提取纯文本不同的兼容问题*/
//val 接收第二个文本实参，表示设置一个文本 obj为想放东西的对象
function getText(obj,val){
	if(val==undefined){//如果val为undefined，表示只有一个参数，这个函数实现的功能为获取文本
		if(obj.innerText){//如果为真是IE8浏览器
			return obj.innerText;
			}else{//w3c浏览器
			return obj.textContent;
			}
		
}else{
	if (obj.innerText||obj.innerText==""){//IE8 浏览器有innerText属性或当对象的内容为空字符串时，都可以给这个对象设置文本
		obj.innerText=val;
		}else{
		obj.textContent=val;
		}
	}
}
/**************************************************************************/
//3.获取样式
//obj  那个对象  attr哪个属性
function getStyle(obj,attr){
	if (obj.currentStyle){//如果为真是IE8浏览器
		return obj.currentStyle[attr];
		}else{//w3c浏览器
		return getComputedStyle(obj,null)[attr]; 
		}
}
/***************************************************************************/
//4.
function $(select,obj){
		var obj=obj||document;
	if(typeof select=="string"){
		select=select.replace(/^\s*|\s*$/g,"");//去前后的空格
		if(select.charAt(0)=="."){
			return getClass(select.slice(1),obj);
		}else if(select.charAt(0)=="#"){
			return document.getElementById(select.slice(1));

		}else if(/^[a-z|1-6]{1,10}$/g.test(select)){
			return obj.getElementsByTagName(select);
		}
	}else if(typeof select=="function"){
 	window.onload=function(){
 		select();
 	}
 }
}
//var one=$("   .box  ")[0];
//var two=$("#box");
//var first=$("div")[0];
//alert(getText(first));
/***********************************************************************/
//5.getChilds(parent);
//type为"a"获取元素子节点的兼容函数;
//"b"获取元素加文本；
//原理：先获取所有的儿子，然后根据节点的类型判断 如果为1，为元素节点 保存到数组里
function getChilds(parent,type){
	var type=type||"a";
	var childs=parent.childNodes//所有儿子
	var arr=[];
	for(var i=0;i<childs.length;i++){
	  if(type=="a"){
		if (childs[i].nodeType==1){
			arr.push(childs[i]);
		}
	  }else if (type="b"){
	  	if (childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
			arr.push(childs[i]);
		}
	  }
	}
	return arr;
}
/***************************************************************/
//6.获得第一个子节点
function getFirst(parent){
	return getChilds(parent)[0];
}
/*******************************************************************/
//7.获得最后一个子节点
function getLast(parent){
	return getChilds(parent)[getChilds(parent).length-1];
}
/*******************************************************************/
//8.获得一个指点子节点
function getNum(parent,num){
	return getChilds(parent)[num];
}
/*******************************************************************/
//9.获得下一个兄弟节点
function getNext(obj){
	var next=obj.nextSibling;//null
	if(next==null){
			return false;
		}
	while(next.nodeType==3||next.nodeType==8){
		
			next=next.nextSibling;
		if(next==null){
			return false;
		}
		
	}
	return next;
}
/*******************************************************************/
//10.获得上一个兄弟节点
function getUp(obj){
	var up=obj.previousSibling;//所有儿子
	if(up==null){
			return false;
		}
	while(up.nodeType==3||up.nodeType==8){
		up=up.previousSibling;
	  if(up==null){
        return false;
      }
	}
	return up;
}
/***********************************************************************/
//11.插入到某个对象之后
/*对象.insertAfter(obj,obj1)*/
//重点：给对象的圆型添加此方法
//原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（
//插入到下一个对象前）
// obj1 :要插入的参数   obj2:插入哪个之前
Object.prototype.insertAfter=function(obj1,obj2){
	var nextobj=getNext(obj2);
	if(nextobj){
		this.insertBefore(obj1,nextobj);
	}else{
		this.appendChild(obj1);
	}
}
/**********************************************************************************/
//获取滚动条走了的距离
//12.获取滚动条走了的距离
function getScrollT(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  var scrollT=obj.scrollTop;
  return scrollT;
}
	/*window.onscroll=function(){
		var c=getScrollT();
		document.title=c;
	}*/
/**********************************************************************************/
//13.同一个事件绑定多个事件处理程序:添加
//obj:给哪个对象添加
//ev什么事件
//fun：事件处理程序
function addEvent(obj,ev,fun){
	if(obj.addEventListener){
		return obj.addEventListener(ev,function(){
			fun.call(obj);
		},false);//ff
	}else{
		return obj.attachEvent("on"+ev,function(){
			fun.call(obj);
		});//ie8中this不指当前对象，指的是window
	}
}
/**********************************************************************************/
//14.同一个事件绑定多个事件处理程序：删除
//obj:给哪个对象添加
//ev什么事件
//fun：事件处理程序
function removeEvent(obj,ev,fun){
	if(obj.removeEventListener){
		return obj.removeEventListener(ev,function(){
			fun.call(obj);
		},false);//ff
	}else{
		return obj.detachEvent("on"+ev,function(){
			fun.call(obj);
		});//ie8中this不指当前对象，指的是window
	}
}
/***************************************************************************************/
//15.
function getCW(){
	return document.documentElement.clientWidth;
}
function getCH(){
	return document.documentElement.clientHeight;
}
/********************************************************************************************/
//16.
//obj 哪个对象添加滚轮事件
//upfun：
//downfun
	function mouseWheel(obj,upfun,downfun){
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
		}else if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
		//chrome,safari -webkit-
			obj.addEventListener("DOMMouseScroll",scrollFn,false);
		//firefox -moz-
		}
		function scrollFn(e){
		var ev=e||window.event;
		if (ev.preventDefault ){
		ev.preventDefault(); //阻止默认浏览器动作(W3C)
	    }else{ev.returnValue = false;
	//IE中阻止函数器默认动作的方式
		}

	var num=ev.detail||ev.wheelDelta;
	if(num==-3||num==120){
		if(upfun){
			upfun()
		}
	}
	if(num==3||num==-120){	
		if(downfun){
			downfun()
		}
	}
	}
	
} 
/****************************************************************/
//17.hover
//判断某个元素是否包含有另外一个元素
//可以解决下拉二级菜单不能点的问题
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/