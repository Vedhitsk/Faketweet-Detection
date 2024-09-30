let prev = "-1";
function analyzeArticle() {
    const articleInput = document.getElementById('articleInput').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/count-words');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('resultBox').textContent = response.word_count;

            if(articleInput != prev){
                document.getElementById('score-box').textContent = sentimentScore(response.word_count)*100;
            }

            if(response.word_count == "False"){
                document.getElementById('resultBox').style.backgroundColor = "rgba(255, 99, 99, 0.3)"
            }
            else{
                document.getElementById('resultBox').style.backgroundColor = "rgba(99, 255, 99, 0.3)"
            }

            prev = articleInput;


        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    xhr.send(JSON.stringify({text: articleInput}));
}

function sentimentScore(text){
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
