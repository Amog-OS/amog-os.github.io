const text = document.getElementById("text")
const button = document.getElementById("butoun")

function randomQuote(){
    fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    text.textContent = data.content;
  });
}

randomQuote();
button.addEventListener('click' , () => {
    randomQuote();
});