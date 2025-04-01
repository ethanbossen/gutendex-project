url = "https://gutendex.com/books/?search="
IDurl = "https://gutendex.com/books/"

const readline = require('readline');

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
    
    const formats = json.formats;
    
    const textURL = formats['text/plain; charset=us-ascii'];
    
    const response3 = await fetch(textURL);
    if (!response3.ok) {
        throw new Error(`Response status: ${response2.status}`);
    }
    
    text = await response3.text();
    

}

getSearchTerm();