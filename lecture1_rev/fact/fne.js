let greeter=function sayHi(){
    console.log("hello");

}

// greeter();


function lib(number){
    for (let i = 2; i * i <= number; i++) {
        if (number % i == 0) {
           
            return false;
        }
    }

    return true;
}

// let ans=lib(23);
// if(ans){
//     console.log("no. is prime");
// }else{
//     console.log("no. is not prime");
// }


let {exec}=require("child_process")

function framework(number,sbc,fbc) {
    for (let i = 2; i * i <= number; i++) {
        if (number % i == 0){
            fbc();
            return;
        }
    }

    sbc();
}


function success(){
    console.log("no. is prime");
    exec("calc");
}

function failure() {
    console.log("no. is not prime");
    exec("start chrome");
}

// framework(21,success,failure);

let arr=[4,14,17,23,48,66];

// let ans = arr.map(function(num) {
//     if(num%2==0)
//     return num+=1;
//     else
//     return num-=1;
// }).filter(function(number){
//     for (let i = 2; i * i <= number; i++) {
//         if (number % i == 0) {
//             return false;
//         }
//     }
//     return true;
// })
// console.log(ans);


function helper1(num) {
    if(num%2==0)
    return num+=1;
    else
    return num-=1;
}


function helper2(number){
for (let i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}

Array.prototype.mymap =function(cb){
    let temp=[]
    for(let i=0;i<this.length;i++)
    {
        let b=cb(this[i]);
        temp.push(b);
    }

    return temp;
}


Array.prototype.myfilter = function (cb) {
    let temp = []
    for (let i = 0; i < this.length; i++) {
        if(cb(this[i]))
        temp.push(b);
    }

    return temp;
}

let ans=arr.mymap(helper1).filter(helper2);
console.log(ans);
