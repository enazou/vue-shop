export function formatTime(time,fmt){
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(time.getFullYear() + '').substring(4-RegExp.$1.length));
	}
	let d = {
		'M+': time.getMonth()+1,
		'd+': time.getDate(),
		'h+': time.getHours(),
		'm+': time.getMinutes(),
		's+': time.getSeconds()
	}
	for(let k in d){
		if(new RegExp(`(${k})`).test(fmt)){
			let v = d[k] + '';
			fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? v : twoZore(v));
		}
	}
	return fmt;
}

function twoZore(str){
	return ('00'+ str ).substring(str.length);
}


/*
	解析url参数
	example  "?id=1232&a=bbb"
	return Object {id:1232,a:bbb}
*/
export function urlParse(){
	let str = window.location.search;
	let arr = [];
	let obj = {};

	arr = str.substring(1).split('&');

	if(arr){
		arr.forEach((item) => {
			var temp = item.split('=');
			var key = decodeURIComponent(temp[0]);
			var val = decodeURIComponent(temp[1]);
			obj[key] = val;
		});	
	}
	return obj;
}


/*本地存储数据*/
export function saveToLocal(id,key,val){
	let seller = window.localStorage.__seller__;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		//localStorage -> string
		seller = JSON.parse(seller);
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = val;
	window.localStorage.__seller__ = JSON.stringify(seller);
}

/*读取本地存储数据*/
export function loadFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	if(!seller){
		return def;
	};
	seller = JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret = seller[key];
	return ret || def;
}