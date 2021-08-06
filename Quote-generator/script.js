const quoteContainer = document.querySelector('.quote-container')
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const twitterButton = document.querySelector('.twitter-button')
const Newquote = document.querySelector('#new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

//show loading 
const loading = () =>{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading 
const complete = () =>{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
const newQuote = (apiQuotes) =>{
    loading();
    const randomNumber =  Math.floor(Math.random()*1643)+1;

    //if the length of text is larger then change the size 
    if(apiQuotes[randomNumber].text.length > 120){
        quote.classList.add('long-quote');
    }else{
        quote.classList.add('long-quote');
    }
    quote.textContent = apiQuotes[randomNumber].text

    //if author feild is empty replace it with not specified 
    if(apiQuotes[randomNumber].author != null){
        author.textContent = apiQuotes[randomNumber].author
    }else{
        author.textContent = "Unknown Author" 
    }

    //loading complete 
    complete();
}

// get Quotes from API 
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'; 
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(apiQuotes);
    }catch(error){
        // error handeling 
        console.log(error);
    }
}

// onload  
getQuotes()


// new quote 
Newquote.addEventListener('click',()=>{
    getQuotes();
})

//twitter tweet 
const tweetQuote = () =>{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl,'_blank');
}

twitterButton.addEventListener('click',()=>{
    tweetQuote();
})
