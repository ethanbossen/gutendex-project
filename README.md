Using the Gutendex API to Search Project Gutenberg’s Catalog

Project Overview

Using the Gutendex API, develop a tool that allows users to search Project Gutenberg’s catalog of books. The program should:

Requirements
	•	Be a command-line application written in Node.js (does not rely on a web browser). However, if you want to create an Electron App instead, that is allowed.
	•	Allow users to search for a book by a word in the title or by author name.
	•	Fetch the full-text (not images) of a book once the user selects one from the search results and display it for reading.
	•	Be sure to select the text format, as working with images is more complex.
	•	Display books in pages:
	•	Book text is not pre-paged from Project Gutenberg.
	•	Determine what constitutes a “page” depending on how the text is displayed.
	•	If using the command-line, divide the text by a fixed number of characters or words rather than relying on line numbers (since paragraphs vary in length).
	•	Keep track of the last ten books the user read and provide a menu that allows them to select those books directly without searching again.
	•	Handle user input errors and network errors gracefully to prevent crashes.

Project Difficulty

This is not as hard as the C++ project, but it is still challenging. Working with a partner is strongly encouraged.

You may use ChatGPT to assist with development, but note any AI-generated code in the comments. The code should be primarily your own, and you must be able to explain every part of it.

Concepts to Understand Before Coding

Before starting, make sure you fully understand:
	1.	What Project Gutenberg is
	2.	The Gutendex API
	3.	How JavaScript handles asynchronous code
	4.	How to fetch a remote resource using the fetch function
	•	Do not use Axios or other libraries; stick with the built-in fetch function.
	5.	JSON format and data handling

Workflow for Fetching a Book
	1.	Prompt the user for a search term
	2.	Fetch the results from the Gutendex API
	3.	Show the user the results and allow them to select a book
	4.	Fetch the full-text of the selected book using its ID:
	•	Request /book/{id} (e.g., if the book’s ID is 42, fetch /book/42).
	•	The response includes different formats—find the plain text format URL.
	•	Download the plain text content, which will be the book’s text.

⸻

This document provides the necessary details for building the Node.js tool. Happy coding!
