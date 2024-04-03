function helloWorld()
{
    return("HelloWorld");
}

console.log(helloWorld());
//************************************************************************** */
function hello(prenom)
{
    return ("hello " + prenom);
}
console.log(hello("marc"));
/***************************************************************************** */
function calculPrixTTC(PHT,tva=0.2){
    return(PHT*tva);
}


console.log(calculPrixTTC(40));
/************************************************************************** */

let testArrow = () => ("Voici le test de la fonction");
console.log(testArrow());

let testArrow2 = () =>  ("Voici le test de la fonction: " + this);

console.log(testArrow2());

let parDix = (x) => (x*10);
console.log(parDix(5));

let multi = (x,y) => (x*y);
console.log(multi(4,5));


/************************************************************************ */

function max(x,y){
     return (x>y)? x : y;
}
console.log(max(6,9));



function max3(x,y,z){
    if(x>y && x>z){
        return x;
    }
    else if(y>x && y>z){
        return y;
    }else
       return z;
}
console.log(max3(56,27,92));



function jour(day){
    switch(day){
        case 1:
            return "lundi";
            break;
        case 2:
            return "mardi";
            break;
        case 3:
            return "mercredi"
            break;
        case 4:
            return "jeudi";
            break;
        case 5:
            return "vendredi";
            break;
        case 6:
            return "samedi";
            break;
        case 7:
            return "dimanche"
            break;
        default:
            return "Choisis un nombre entre 1 et 7";
    }
}
console.log(jour(65));

/*********************************************************** */

function factorielleItFor(nombre){

    if (nombre === 0){
        return 1
    }else{
        let result =1;
        for(i=nombre;i>=1;i--){
          result *=i;
        }
        return result;
    }
}
console.log(factorielleItFor(4));



function factorielleItWhile(nbr){
    if (nbr === 0){
        return 1
    }else{
        let result=1,i=nbr;
       while(i>1){
        result=result*i;
        i--;
       }
       return result;
    }
}
console.log(factorielleItWhile(9));


function exposantRec(x,y){
    if(y==1){
      return x
    }else if(y==0){
        return 1;
    }else{
      return x * exposantRec(x,y-1); 
    }
    
}
console.log(exposantRec(6,0));



function factorielleRec(nbr){
      if (nbr<1){
        return 1;
      }else{
        return nbr * factorielleRec(nbr-1);
      }
}
console.log(factorielleRec(6));



function calcul(...args){
    sum=0; elements=0;
    for (let arg of args) {sum+=arg; elements+=1}
    return sum / elements;
    
}
console.log(calcul(3,3,3));


const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';
console.log(someStack);