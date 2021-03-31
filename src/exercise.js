/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function changeNumber(){
    var view = document.getElementById('view');
    var n = document.getElementById('n').value;
    //remove all appended childs in view
    view.innerHTML='';
    for(var i=0;i<n;i++){
        var jump = document.createElement("br")
        for(var j=0;j<n;j++){
            var newButton = document.createElement("button");
            newButton.innerHTML='.';
            newButton.value = '.';
            if(j!==0 || i!==0){
                newButton.onclick = function(){
                    if(this.value==='.'){
                        this.value='#';
                        this.innerHTML = '#';
                    }else{
                        this.value='.';
                        this.innerHTML = '.';
                    }
                };
            }
            view.appendChild(newButton);
        }
        view.appendChild(jump);
    }
}

function check(){
    var n = document.getElementById('n').value;
    var max = document.getElementById('max').value;
    var view = document.getElementById('view');
    var output = document.getElementById('output');
    var tmp = [];
    
    if(n<=1){
        output.innerHTML="YES";
    }else if(n*2-2>max){
        output.innerHTML="NO";
    }else{
        //tmp true para camino, false para pared
        for(var i=0;i<n;i++){
            tmp[i]=[];
            for(var j=0;j<n;j++){
                var child = view.childNodes[i*n+j+i];
                tmp[i][j]=false;
                if(child.value==='.'){
                    tmp[i][j]=true;
                }
            }
        }
        max++;
        if(resolver(tmp,0,0,n,max)){
            output.innerHTML="YES";
            return;
        }else{
            output.innerHTML="NO";
            return;
        }
    }
}

function resolver(tmp,x,y,n,max,memo={}){
    //console.log(memo);
    memo[x]=memo[x]||{};
    if(x in memo&&y in memo[x]){
        return false;
    }
    //terminar recursividad
    if(y<0||y>n-1||x<0||x>n-1||max===0){
        return false;
    }
    
    if(!tmp[x][y]){
        return false;
    }
    if(tmp[x][y]&&x===n-1&&y===n-1){
        return true;
    }
    
    memo[x][y]=max;
    
    //checamos abajo
    if(resolver(tmp,x,y+1,n,max-1,memo)){
        return true;
    }
    //checamos derecha
    if(resolver(tmp,x+1,y,n,max-1,memo)){
        return true;
    }
    //checamos arriba
    if(resolver(tmp,x,y-1,n,max-1,memo)){
        return true;
    }
    
    //checamos izquierda
    if(resolver(tmp,x-1,y,n,max-1,memo)){
        return true;
    }
    
    return false;
}