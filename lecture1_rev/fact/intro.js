console.log("Hello all");

let varName;
varName=1;
varName=true;
varName=[1,2,3,4,5];
console.log(varName);

let number=23;
for(let i=2;i*i<=number;i++){
    if(number%i==0){
        console.log("no. is not prime");
        return ;
    }
}

console.log("no. is prime");