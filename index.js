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
            var id = e.target.dataset.id;
            var content = document.getElementById(id);
            var contentSibling = getSiblings(content);
            for(var i = 0; i < contentSibling.length; i++){
                contentSibling[i].classList.remove('show-content');
            }
            content.classList.add('show-content');

        }
        
    }
    var addSubmitBtn = document.getElementById('add-form-btn');
    addSubmitBtn.onclick = function(e){
        e.preventDefault();
        var oForm = document.getElementById('student-add-form');
        //获取表单中所有数据
        var data = getFormData(oForm);
        //数据校验
        var isValid = isValidForm(data);
        if(!isValid){
            return false;
        }
        var strData = "";
        for(var prop in data){
            if(data.hasOwnProperty(prop)){
                strData += prop + '=' + data[prop]+'&';
            }
        }
        strData += 'appkey=Lucky_1609985096639';
        console.log(strData);
        ajax('get','http://open.duyiedu.com/api/student/addStudent' , strData, function(res){
            if(res.status == 'success'){
                var studentListBtn = document.querySelector('.left-menu dl dd[data-id="student-list"]');
                studentListBtn.click();
            }
        }, true)


    }

}
//获取一个元素的所有兄弟元素
function getSiblings(node){
    //获取该元素的父元素的虽有子元素
    var children = node.parentNode.children;
    var result = [];
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
//表单的规则校验
function isValidForm(data){
    //定义异常对象,两个异常，1.没有填写，2，填写不符合要求
    var errorObj = {
        name: ["请填写学生姓名"],
        sNo: ["请填写学生学号", "学号由4-16位的数字组成"],
        birth: ["请填写出生年份", "仅接收50岁以内的学生"],
        email: ["请填写邮箱", "邮箱格式不正确"],
        sex: [],
        phone: ["请填写手机号", "手机号格式不正确"],
        address: ["请填写住址"]
    };
    for(var prop in data){
        if(data.hasOwnProperty(prop)){
            if(!data[prop]){
                alert(errorObj[prop][0]);
                return false;
            }
        }
    }
    var regSNo = /^\d{4,16}$/;
    // var regBirth = /[6-50]/;

    if(!regSNo.test(data.sNo)){
        alert(errorObj.sNo[1]);
        return false;
    }
    // if(!regBirth.test(data.birth)){
    //     alert(errorObj.birth[1]);
    //     return false;
    // }
    return true;

}

//获取表格中的数据
function getTableData(){
    ajax('get','http://open.duyiedu.com/api/student/findAll', 'appkey=Lucky_1609985096639', function(res){
        if(res.status == 'success'){
            console.log('获取学生信息成功');
            renderTable(res.data);
        }
    })
}
//渲染表格数据
function renderTable(data){
    console.log(data);
    var strData = "";
    data.forEach(function(item){
        strData += `<tr>
            <td>${item.sNo}</td>
            <td>${item.name}</td>
            <td>${item.sex === 0 ? '男' : '女'}</td>
            <td>${item.email}</td>
            <td>${new Date().getFullYear() - item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit">编辑</button>
                <button class="btn remove">删除</button>
            </td>
        </tr>`
    });
    console.log(strData);

    var tbody = document.getElementsByClassName('student-body');
    tbody.innerHTML = strData;
}
bindEvent();
getTableData();



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