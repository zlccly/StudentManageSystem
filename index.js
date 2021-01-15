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

}
function getSiblings(node){
    var children = node.parentNode.children;
    var result = [];
    for(var i = 0; i < children.length; i++){
        if(children[i] != node){
            result.push(children[i]);
        }
    }
    return result;

}
bindEvent();