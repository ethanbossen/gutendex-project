url = "https://gutendex.com/books/?search="

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

    const json = await response.json();
    const book_count = json.count;
    console.log(`Found ${book_count} books.`);

    results = json.results;

    for (const book of results) {
        console.log(`${book.title}, ID:${book.id}`);
    }

    const second_term = await promtUser("What id would you like to fetch? ");

    setTimeout(console.log(json), 7000);
}

getSearchTerm();