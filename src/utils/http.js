const BASE_URL='http://43.143.44.182/admin'//基础请求路径  http://172.16.235.16:8888

//拼接路径参数
const json2url = (json)=>{
    let arr = [];
    for(let name in json){
        arr.push(name+'='+json[name]); //"id=1&name=admin&pwd=123"
    }
    return arr.join('&')
}
//如果没传method默认get,没传params默认空{}
const http = ({url,method = "get", params={},data={}})=>{ 
    if(!url) return; //如果没有传递请求路径，直接return
    const token = sessionStorage.getItem('token') || ''; //发请求前，先获取token
    //请求方式，请求头设置
    let options = {
    method, //method:method简写
    headers: {
            token
       }
    }
    if(method === 'post'){
    options.body = JSON.stringify(data)
}
    return fetch(BASE_URL+url+'?'+json2url(params),options)
    .then(response=>response.json())

}

export default http;


/*
* http({
*   url:"",
*   method:"",
*   params:{}   |   data:{}          -------get请求params      post---data:{}
*
* }).then(res=>{
*   //在这里直接拿到数据结果
* })
* 使用 token 的内容页封装进去
*
* */