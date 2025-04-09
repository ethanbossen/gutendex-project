url = "https://gutendex.com/books/?search="
IDurl = "https://gutendex.com/books/"
save_details_filename = "Save_Details.json"
const PAGE_SIZE = 1000; // Number of characters per page

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
    //Add code to ask the user if they want to receive one of the saved books

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
        console.log("\nResult not available")
        return
    }
    json = await response2.json();
    
    let title = json.title

    const formats = json.formats;
    
    const textURL = formats['text/plain; charset=us-ascii'];
    
    const response3 = await fetch(textURL);
    if (!response3.ok) {
        console.log("Error finding results")
        return
    }
    
    text = await response3.text();
    printBook(text)

    //Might need to change to allow the user to ask for another page
    //console.log(pages[0])
    saveFile(text, title)
}

function saveFile (text, title) {
    //Read in the save_data file
    rawdata = fs.readFileSync(save_details_filename, 'utf8')
    const bookJson  = JSON.parse(rawdata)
    
    //From AI
    const sanitizedTitle = title
        .replace(/[/\\?%*:|"<>]/g, '_') // Replace invalid file characters
        .replace(/\s+/g, '_')          // Replace spaces with underscores
        .substring(0, 100);            // Limit length to avoid issues with long paths
    
    const filename = `${sanitizedTitle}.txt`;

    let bookInfo = {}
    bookInfo.title = title
    bookInfo.filename = filename
    
    // Add book info to the save book json
    bookJson["Saved_Books"].push(bookInfo)
    //Remove the first element if the array is > 10
    if(bookJson["Saved_Books"].length > 10){
        const deletedBook = bookJson["Saved_Books"].shift();
        const deletedPath = deletedBook.filename;
        
        //Delete the file
        fs.unlinkSync(deletedPath);
    }
    try{
        fs.writeFileSync(filename, text)
        fs.writeFileSync(save_details_filename, JSON.stringify(bookJson))
    }catch (error) {
        console.log(error)
    }
}

function printBook (text) {
    let pages = [];
    // Split text into pages of PAGE_SIZE characters
    for (let i = 0; i < text.length; i += PAGE_SIZE) {
        pages.push(text.slice(i, i + PAGE_SIZE));
    }

    let index = 1;
    for (const page of pages){
        console.log(page)
        console.log(`\nPage ${index}\n`)
        index += 1
    }
}

getSearchTerm()