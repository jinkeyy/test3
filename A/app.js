//////////////////////A.1///////////////////////
function validTime(time){
    let str = time.split(":")
    let hh = str[0]
    let mm = str[1]
    if(hh[0]==0){
        return false
    }else{
    if( hh>0&&hh<24 && mm>0 && mm<60 ){
        return true
    }else{
        return false
    }
    }
}
console.log(validTime("03:20"))
//////////////////////A.2///////////////////////
function missingNumber(arr){
    let iMin = arr.reduce(function(a, b) {
        return Math.min(a, b);
    });
    let iMax = arr.reduce(function(a, b) {
        return Math.max(a, b);
    });
    a = []
    for(let i = iMin;i<=iMax;i++){
             if(!arr.includes(i)){
                a.push(i)
             }
    }
    console.log(a)
}
missingNumber([5,2,20,0])