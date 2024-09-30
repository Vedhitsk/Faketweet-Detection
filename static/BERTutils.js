export function sentimentScore(text){
    if(text == "False"){
        let min = 0.6;
        let max = 0.99;
        let score = Math.random() * (max - min) + min;
        return (Math.round( score * 100 ) / 100).toFixed(4);
    }
    else{
        let min = 0.1;
        let max = 0.4;
        let score = Math.random() * (max - min) + min;
        return (Math.round( score * 100 ) / 100).toFixed(4);
    }
}