url = "https://gutendex.com/books/?search="
IDurl = "https://gutendex.com/books/"

const PAGE_SIZE = 1000; // Number of characters per page
let pages = [];

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function promtUser(promt){
    return new Promise(resolve => {
        rl.question(promt, answer => {
            resolve(answer);
        })
    })
}

async function getSearchTerm() {
    const term = await promtUser("What would you like to search for? ");

    const response = await fetch(url + "" + term)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    let json = await response.json();
    const book_count = json.count;
    console.log(`Found ${book_count} books.`);

    results = json.results;
    
    for (const book of results) {
        console.log(`${book.title}, ID:${book.id}`);
    }

    const second_term = await promtUser("What id would you like to fetch? ");
    const response2 = await fetch(IDurl + "" + second_term)
    if (!response2.ok) {
        throw new Error(`Response status: ${response2.status}`);
    }
    json = await response2.json();
    
    let title = json.title

    const formats = json.formats;
    
    const textURL = formats['text/plain; charset=us-ascii'];
    
    const response3 = await fetch(textURL);
    if (!response3.ok) {
        throw new Error(`Response status: ${response2.status}`);
    }
    
    text = await response3.text();
    //Add code to save this text
    
    // Split text into pages of PAGE_SIZE characters
    for (let i = 0; i < text.length; i += PAGE_SIZE) {
        pages.push(text.slice(i, i + PAGE_SIZE));
    }
    console.log(pages[0])
    saveFile(text, title)
}

function saveFile (text, title) {
    //From AI
    const sanitizedTitle = title
        .replace(/[/\\?%*:|"<>]/g, '_') // Replace invalid file characters
        .replace(/\s+/g, '_')          // Replace spaces with underscores
        .substring(0, 100);            // Limit length to avoid issues with long paths
    
    const filename = `${sanitizedTitle}.txt`;
    try{
        fs.writeFileSync(filename, text)
    }catch (error) {
        console.log(error)
    }
}
getSearchTerm();