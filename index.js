function bindEvent(){
    var oDL = document.querySelector('.left-menu > dl');
    oDL.onclick = function(e){
        //方法1:
        // if(e.target.tagName == 'DD'){
        //     var active = document.getElementsByClassName('active');
        //     for(var i = 0; i < active.length; i++){
        //        active[i].classList.remove('active') 
        //     }
        //     e.target.classList.add('active')
        // }
        //方法2:
        if(e.target.tagName = 'DD'){
            var siblings = getSiblings(e.target);
            for(var i = 0; i < siblings.length; i++){
                siblings[i].classList.remove('active')
            }
            e.target.classList.add('active');

        }
        
    }
    var addSubmitBtn = document.getElementById('add-form-btn');
    addSubmitBtn.onclick = function(e){
        e.preventDefault();
        var oForm = document.getElementById('student-add-form');
        var data = getFormData(oForm);
        console.log(data);
        var strData = "";
        for(var prop in data){
            if(data.hasOwnProperty(prop)){
                strData += prop + '=' + data[prop]+'&';
            }
        }
        strData += 'Lucky_1609985096639';
        console.log(strData);


    }

}
//获取一个元素的所有兄弟元素
function getSiblings(node){
    //获取该元素的父元素的虽有子元素
    var children = node.parentNode.children;
    var result = [];
    //
    for(var i = 0; i < children.length; i++){
        if(children[i] != node){
            result.push(children[i]);
        }
    }
    return result;
}
//获取表单所有数据
function getFormData(form){
    return{
        name: form.name.value,
        sex: form.sex.value,
        email: form.email.value,
        sNo: form.sNo.value,
        birth: form.birth.value,
        phone: form.phone.value,
        address: form.address.value

    }

}
bindEvent();



/**
 * 
 * @param {String} method 请求方式  需要大写
 * @param {String} url    请求地址  协议（http）+ 域名+ 端口号 + 路径
 * @param {String} data   请求数据  key=value&key1=value1
 * @param {Function} cb     成功的回调函数
 * @param {Boolean} isAsync 是否异步 true
 */
function ajax(method, url, data, cb, isAsync) {
    console.log(data)
    // get   url + '?' + data
    // post 
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // xhr.readyState    1 - 4  监听是否有响应
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(JSON.parse(xhr.responseText))
            }
        }
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, isAsync);
        // key=value&key1=valu1
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }


}