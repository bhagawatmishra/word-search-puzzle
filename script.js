// // Constants
// const GRID_SIZE = 10; // Define grid size
// const MIN_WORDS = 2;  // Minimum number of words to place
// const MAX_WORDS = 5;  // Maximum number of words to place

// let wordList = []; // Cached word list
// let isResetting = false; // Flag to check if reset is in progress

// // Directions for word placement
// const DIRECTIONS = [
//   { name: 'horizontal', row: 0, col: 1 },
//   { name: 'vertical', row: 1, col: 0 },
//   { name: 'diagonal-down-right', row: 1, col: 1 },
//   { name: 'diagonal-down-left', row: 1, col: -1 },
//   { name: 'diagonal-up-right', row: -1, col: 1 },
//   { name: 'diagonal-up-left', row: -1, col: -1 },
//   { name: 'reverse-horizontal', row: 0, col: -1 },
//   { name: 'reverse-vertical', row: -1, col: 0 },
//   { name: 'reverse-diagonal-down-right', row: -1, col: -1 },
//   { name: 'reverse-diagonal-down-left', row: -1, col: 1 },
//   { name: 'reverse-diagonal-up-right', row: 1, col: -1 },
//   { name: 'reverse-diagonal-up-left', row: 1, col: 1 }
// ];

// // Fetch the word list from the text file (only once)
// async function loadWordList() {
//   try {
//     const response = await fetch('assets/wordlist.txt');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const text = await response.text();
//     wordList = text.split(',').map(word => word.trim().toUpperCase());
//   } catch (error) {
//     console.error('Error fetching word list:', error);
//     wordList = []; // Fallback to empty list on error
//   }
// }

// // Create an empty grid
// function createGrid(size) {
//   return Array.from({ length: size }, () => Array(size).fill(''));
// }

// // Check if a word can be placed in the grid at a specific location and direction
// function canPlaceWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || (grid[row][col] !== '' && grid[row][col] !== word[i])) {
//       return false;
//     }
//     row += direction.row;
//     col += direction.col;
//   }
//   return true;
// }

// // Place a word in the grid at a specific location and direction
// function placeWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     grid[row][col] = word[i];
//     row += direction.row;
//     col += direction.col;
//   }
// }

// // Insert words into the grid
// function insertWordsIntoGrid(grid, words) {
//   words.forEach(word => {
//     let placed = false;
//     while (!placed) {
//       const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//       const startRow = Math.floor(Math.random() * grid.length);
//       const startCol = Math.floor(Math.random() * grid[0].length);
//       if (canPlaceWord(grid, word, startRow, startCol, direction)) {
//         placeWord(grid, word, startRow, startCol, direction);
//         placed = true;
//       }
//     }
//   });
// }

// // Fill the grid with random letters
// function fillGridWithRandomLetters(grid) {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       if (grid[row][col] === '') {
//         grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
//       }
//     }
//   }
// }

// // Render the grid into the HTML table using DocumentFragment
// function renderGrid(grid) {
//   const table = document.getElementById('wordSearchGrid');
//   const fragment = document.createDocumentFragment();
  
//   grid.forEach((row, rowIndex) => {
//     const tr = document.createElement('tr');
//     row.forEach((cell, colIndex) => {
//       const td = document.createElement('td');
//       td.textContent = cell;
//       td.dataset.row = rowIndex;
//       td.dataset.col = colIndex;
//       tr.appendChild(td);
//     });
//     fragment.appendChild(tr);
//   });
  
//   table.innerHTML = ''; // Clear existing content
//   table.appendChild(fragment); // Add new content
// }

// // Update the word list display
// function updateWordList(words) {
//   const wordListElement = document.getElementById('wordList');
//   const fragment = document.createDocumentFragment();
  
//   words.forEach(word => {
//     const li = document.createElement('li');
//     li.textContent = word;
//     fragment.appendChild(li);
//   });
  
//   wordListElement.innerHTML = ''; // Clear existing content
//   wordListElement.appendChild(fragment); // Add new content
// }

// // Initialize the game
// function initializeGame() {
//   const grid = createGrid(GRID_SIZE);
//   const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//   insertWordsIntoGrid(grid, wordsToInsert);
//   fillGridWithRandomLetters(grid);
//   renderGrid(grid);
//   updateWordList(wordsToInsert);
// }

// // Get a random subset of words from the list
// function getRandomWords(minWords, maxWords) {
//   const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
//   const shuffledList = wordList.slice().sort(() => 0.5 - Math.random());
//   return shuffledList.slice(0, numWords);
// }

// // Debounce function to limit how often a function can be called
// function debounce(func, wait) {
//   let timeout;
//   return function(...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// // Reset the game
// async function resetGame() {
//   if (isResetting) return; // Prevent multiple resets at the same time
//   isResetting = true;

//   try {
//     const grid = createGrid(GRID_SIZE);
//     const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//     insertWordsIntoGrid(grid, wordsToInsert);
//     fillGridWithRandomLetters(grid);
//     renderGrid(grid);
//     updateWordList(wordsToInsert);
//   } catch (error) {
//     console.error('Error resetting game:', error);
//   } finally {
//     // Ensure flag is reset after operation completes
//     isResetting = false;
//   }
// }

// // Initialize the game on DOM content loaded
// document.addEventListener('DOMContentLoaded', async () => {
//   await loadWordList(); // Load word list once
//   initializeGame();

//   // Set up reset button with debounce
//   const resetButton = document.getElementById('resetButton');
//   resetButton.addEventListener('click', debounce(() => {
//     resetGame();
//   }, 300)); // Debounce delay of 300ms
// });




// // Constants
// const GRID_SIZE = 10; // Define grid size
// const MIN_WORDS = 2;  // Minimum number of words to place
// const MAX_WORDS = 5;  // Maximum number of words to place

// // Constants for selection
// const SELECTION_COLOR = 'pink'; // Default color for selection
// const VALID_COLORS = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2']; // Example valid colors

// let wordList = []; // Cached word list
// let isResetting = false; // Flag to check if reset is in progress
// let startRow, startCol;
// let selectedCells = [];
// let isSelecting = false;

// // Directions for word placement
// const DIRECTIONS = [
//   { name: 'horizontal', row: 0, col: 1 },
//   { name: 'vertical', row: 1, col: 0 },
//   { name: 'diagonal-down-right', row: 1, col: 1 },
//   { name: 'diagonal-down-left', row: 1, col: -1 },
//   { name: 'diagonal-up-right', row: -1, col: 1 },
//   { name: 'diagonal-up-left', row: -1, col: -1 },
//   { name: 'reverse-horizontal', row: 0, col: -1 },
//   { name: 'reverse-vertical', row: -1, col: 0 },
//   { name: 'reverse-diagonal-down-right', row: -1, col: -1 },
//   { name: 'reverse-diagonal-down-left', row: -1, col: 1 },
//   { name: 'reverse-diagonal-up-right', row: 1, col: -1 },
//   { name: 'reverse-diagonal-up-left', row: 1, col: 1 }
// ];

// // Fetch the word list from the text file (only once)
// async function loadWordList() {
//   try {
//     const response = await fetch('assets/wordlist.txt');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const text = await response.text();
//     wordList = text.split(',').map(word => word.trim().toUpperCase());
//   } catch (error) {
//     console.error('Error fetching word list:', error);
//     wordList = []; // Fallback to empty list on error
//   }
// }

// // Create an empty grid
// function createGrid(size) {
//   return Array.from({ length: size }, () => Array(size).fill(''));
// }

// // Check if a word can be placed in the grid at a specific location and direction
// function canPlaceWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || (grid[row][col] !== '' && grid[row][col] !== word[i])) {
//       return false;
//     }
//     row += direction.row;
//     col += direction.col;
//   }
//   return true;
// }

// // Place a word in the grid at a specific location and direction
// function placeWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     grid[row][col] = word[i];
//     row += direction.row;
//     col += direction.col;
//   }
// }

// // Insert words into the grid
// function insertWordsIntoGrid(grid, words) {
//   words.forEach(word => {
//     let placed = false;
//     while (!placed) {
//       const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//       const startRow = Math.floor(Math.random() * grid.length);
//       const startCol = Math.floor(Math.random() * grid[0].length);
//       if (canPlaceWord(grid, word, startRow, startCol, direction)) {
//         placeWord(grid, word, startRow, startCol, direction);
//         placed = true;
//       }
//     }
//   });
// }

// // Fill the grid with random letters
// function fillGridWithRandomLetters(grid) {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       if (grid[row][col] === '') {
//         grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
//       }
//     }
//   }
// }

// // Render the grid into the HTML table using DocumentFragment
// function renderGrid(grid) {
//   const table = document.getElementById('wordSearchGrid');
//   const fragment = document.createDocumentFragment();
  
//   grid.forEach((row, rowIndex) => {
//     const tr = document.createElement('tr');
//     row.forEach((cell, colIndex) => {
//       const td = document.createElement('td');
//       td.textContent = cell;
//       td.dataset.row = rowIndex;
//       td.dataset.col = colIndex;
//       tr.appendChild(td);
//     });
//     fragment.appendChild(tr);
//   });
  
//   table.innerHTML = ''; // Clear existing content
//   table.appendChild(fragment); // Add new content
// }

// // Update the word list display
// function updateWordList(words) {
//   const wordListElement = document.getElementById('wordList');
//   const fragment = document.createDocumentFragment();
  
//   words.forEach(word => {
//     const li = document.createElement('li');
//     li.textContent = word;
//     fragment.appendChild(li);
//   });
  
//   wordListElement.innerHTML = ''; // Clear existing content
//   wordListElement.appendChild(fragment); // Add new content
// }

// // Update word list with strikethrough for found words
// function strikeThroughWord(word) {
//   const li = Array.from(document.querySelectorAll('#wordList li'))
//     .find(li => li.textContent === word);
//   if (li) {
//     li.style.textDecoration = 'line-through';
//   }
// }

// // Get a random subset of words from the list
// function getRandomWords(minWords, maxWords) {
//   const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
//   const shuffledList = wordList.slice().sort(() => 0.5 - Math.random());
//   return shuffledList.slice(0, numWords);
// }

// // Debounce function to limit how often a function can be called
// function debounce(func, wait) {
//   let timeout;
//   return function(...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// // Reset the game
// async function resetGame() {
//   if (isResetting) return; // Prevent multiple resets at the same time
//   isResetting = true;

//   try {
//     const grid = createGrid(GRID_SIZE);
//     const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//     insertWordsIntoGrid(grid, wordsToInsert);
//     fillGridWithRandomLetters(grid);
//     renderGrid(grid);
//     updateWordList(wordsToInsert);
//   } catch (error) {
//     console.error('Error resetting game:', error);
//   } finally {
//     // Ensure flag is reset after operation completes
//     isResetting = false;
//   }
// }

// // Initialize the game
// function initializeGame() {
//   const grid = createGrid(GRID_SIZE);
//   const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//   insertWordsIntoGrid(grid, wordsToInsert);
//   fillGridWithRandomLetters(grid);
//   renderGrid(grid);
//   updateWordList(wordsToInsert);
// }

// // Drag-to-select functionality
// function startSelection(event) {
//   if (event.button !== 0) return; // Only handle left mouse button
//   isSelecting = true;
//   const cell = getCellFromEvent(event);
//   if (cell) {
//     startRow = parseInt(cell.dataset.row);
//     startCol = parseInt(cell.dataset.col);
//     selectedCells = [[startRow, startCol]];
//     updateCellHighlight(cell, SELECTION_COLOR);
//   }
// }

// function selectCells(event) {
//   if (!isSelecting) return;
//   const cell = getCellFromEvent(event);
//   if (cell) {
//     const row = parseInt(cell.dataset.row);
//     const col = parseInt(cell.dataset.col);
//     if (!selectedCells.some(([r, c]) => r === row && c === col)) {
//       selectedCells.push([row, col]);
//       updateCellHighlight(cell, SELECTION_COLOR);
//     }
//   }
// }

// function endSelection(event) {
//   if (!isSelecting) return;
//   isSelecting = false;
//   const word = getSelectedWord();
//   if (word) {
//     validateAndHighlightWord(word);
//   } else {
//     clearSelection();
//   }
// }

// function getCellFromEvent(event) {
//   const cell = event.target.closest('td');
//   return cell;
// }

// function updateCellHighlight(cell, color) {
//   cell.style.backgroundColor = color;
// }

// function getSelectedWord() {
//   return selectedCells.map(([row, col]) => grid[row][col]).join('');
// }

// function validateAndHighlightWord(word) {
//   const isValid = wordList.includes(word);
//   if (isValid) {
//     const randomColor = VALID_COLORS[Math.floor(Math.random() * VALID_COLORS.length)];
//     selectedCells.forEach(([row, col]) => {
//       document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.backgroundColor = randomColor;
//     });
//     strikeThroughWord(word); // Add strikethrough to found word in list
//     clearSelection(); // Clear the selection after validation
//   } else {
//     clearSelection(); // Clear the selection if the word is invalid
//   }
// }

// // Initialize the game on DOM content loaded
// document.addEventListener('DOMContentLoaded', async () => {
//   await loadWordList(); // Load word list once
//   initializeGame();

//   // Set up reset button with debounce
//   const resetButton = document.getElementById('resetButton');
//   resetButton.addEventListener('click', debounce(() => {
//     resetGame();
//   }, 300)); // Debounce delay of 300ms

//   // Set up drag-to-select functionality
//   document.getElementById('wordSearchGrid').addEventListener('mousedown', startSelection);
//   document.getElementById('wordSearchGrid').addEventListener('touchstart', startSelection);
//   document.addEventListener('mousemove', selectCells);
//   document.addEventListener('touchmove', selectCells);
//   document.addEventListener('mouseup', endSelection);
//   document.addEventListener('touchend', endSelection);
// });



// // Constants
// const GRID_SIZE = 10; // Define grid size
// const MIN_WORDS = 2;  // Minimum number of words to place
// const MAX_WORDS = 5;  // Maximum number of words to place

// // Constants for selection
// const SELECTION_COLOR = 'pink'; // Default color for selection
// const VALID_COLORS = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2']; // Example valid colors

// let wordList = []; // Cached word list
// let isResetting = false; // Flag to check if reset is in progress
// let startRow, startCol;
// let selectedCells = [];
// let isSelecting = false;
// let grid = createGrid(GRID_SIZE); // Initialize grid

// // Directions for word placement
// const DIRECTIONS = [
//   { name: 'horizontal', row: 0, col: 1 },
//   { name: 'vertical', row: 1, col: 0 },
//   { name: 'diagonal-down-right', row: 1, col: 1 },
//   { name: 'diagonal-down-left', row: 1, col: -1 },
//   { name: 'diagonal-up-right', row: -1, col: 1 },
//   { name: 'diagonal-up-left', row: -1, col: -1 },
//   { name: 'reverse-horizontal', row: 0, col: -1 },
//   { name: 'reverse-vertical', row: -1, col: 0 },
//   { name: 'reverse-diagonal-down-right', row: -1, col: -1 },
//   { name: 'reverse-diagonal-down-left', row: -1, col: 1 },
//   { name: 'reverse-diagonal-up-right', row: 1, col: -1 },
//   { name: 'reverse-diagonal-up-left', row: 1, col: 1 }
// ];

// // Fetch the word list from the text file (only once)
// async function loadWordList() {
//   try {
//     const response = await fetch('assets/wordlist.txt');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const text = await response.text();
//     wordList = text.split(',').map(word => word.trim().toUpperCase());
//   } catch (error) {
//     console.error('Error fetching word list:', error);
//     wordList = []; // Fallback to empty list on error
//   }
// }

// // Create an empty grid
// function createGrid(size) {
//   return Array.from({ length: size }, () => Array(size).fill(''));
// }

// // Check if a word can be placed in the grid at a specific location and direction
// function canPlaceWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || (grid[row][col] !== '' && grid[row][col] !== word[i])) {
//       return false;
//     }
//     row += direction.row;
//     col += direction.col;
//   }
//   return true;
// }

// // Place a word in the grid at a specific location and direction
// function placeWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     grid[row][col] = word[i];
//     row += direction.row;
//     col += direction.col;
//   }
// }

// // Insert words into the grid
// function insertWordsIntoGrid(grid, words) {
//   words.forEach(word => {
//     let placed = false;
//     while (!placed) {
//       const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//       const startRow = Math.floor(Math.random() * grid.length);
//       const startCol = Math.floor(Math.random() * grid[0].length);
//       if (canPlaceWord(grid, word, startRow, startCol, direction)) {
//         placeWord(grid, word, startRow, startCol, direction);
//         placed = true;
//       }
//     }
//   });
// }

// // Fill the grid with random letters
// function fillGridWithRandomLetters(grid) {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       if (grid[row][col] === '') {
//         grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
//       }
//     }
//   }
// }

// // Render the grid into the HTML table using DocumentFragment
// function renderGrid(grid) {
//   const table = document.getElementById('wordSearchGrid');
//   const fragment = document.createDocumentFragment();
  
//   grid.forEach((row, rowIndex) => {
//     const tr = document.createElement('tr');
//     row.forEach((cell, colIndex) => {
//       const td = document.createElement('td');
//       td.textContent = cell;
//       td.dataset.row = rowIndex;
//       td.dataset.col = colIndex;
//       tr.appendChild(td);
//     });
//     fragment.appendChild(tr);
//   });
  
//   table.innerHTML = ''; // Clear existing content
//   table.appendChild(fragment); // Add new content
// }

// // Update the word list display
// function updateWordList(words) {
//   const wordListElement = document.getElementById('wordList');
//   const fragment = document.createDocumentFragment();
  
//   words.forEach(word => {
//     const li = document.createElement('li');
//     li.textContent = word;
//     fragment.appendChild(li);
//   });
  
//   wordListElement.innerHTML = ''; // Clear existing content
//   wordListElement.appendChild(fragment); // Add new content
// }

// // Update word list with strikethrough for found words
// function strikeThroughWord(word) {
//   const li = Array.from(document.querySelectorAll('#wordList li'))
//     .find(li => li.textContent === word);
//   if (li) {
//     li.style.textDecoration = 'line-through';
//   }
// }

// // Get a random subset of words from the list
// function getRandomWords(minWords, maxWords) {
//   const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
//   const shuffledList = wordList.slice().sort(() => 0.5 - Math.random());
//   return shuffledList.slice(0, numWords);
// }

// // Debounce function to limit how often a function can be called
// function debounce(func, wait) {
//   let timeout;
//   return function(...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// // Reset the game
// async function resetGame() {
//   if (isResetting) return; // Prevent multiple resets at the same time
//   isResetting = true;

//   try {
//     grid = createGrid(GRID_SIZE);
//     const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//     insertWordsIntoGrid(grid, wordsToInsert);
//     fillGridWithRandomLetters(grid);
//     renderGrid(grid);
//     updateWordList(wordsToInsert);
//   } catch (error) {
//     console.error('Error resetting game:', error);
//   } finally {
//     // Ensure flag is reset after operation completes
//     isResetting = false;
//   }
// }

// // Initialize the game
// function initializeGame() {
//   grid = createGrid(GRID_SIZE);
//   const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//   insertWordsIntoGrid(grid, wordsToInsert);
//   fillGridWithRandomLetters(grid);
//   renderGrid(grid);
//   updateWordList(wordsToInsert);
// }

// // Drag-to-select functionality
// function startSelection(event) {
//   if (event.button !== 0) return; // Only handle left mouse button
//   isSelecting = true;
//   const cell = getCellFromEvent(event);
//   if (cell) {
//     startRow = parseInt(cell.dataset.row);
//     startCol = parseInt(cell.dataset.col);
//     selectedCells = [[startRow, startCol]];
//     updateCellHighlight(cell, SELECTION_COLOR);
//   }
// }

// function selectCells(event) {
//   if (!isSelecting) return;
//   const cell = getCellFromEvent(event);
//   if (cell) {
//     const row = parseInt(cell.dataset.row);
//     const col = parseInt(cell.dataset.col);
//     if (!selectedCells.some(([r, c]) => r === row && c === col)) {
//       selectedCells.push([row, col]);
//       updateCellHighlight(cell, SELECTION_COLOR);
//     }
//   }
// }

// function endSelection(event) {
//   if (!isSelecting) return;
//   isSelecting = false;
//   const word = getSelectedWord();
//   if (word) {
//     validateAndHighlightWord(word);
//   } else {
//     clearSelection(); // Clear selection if no valid word
//   }
// }

// function getCellFromEvent(event) {
//   const cell = event.target.closest('td');
//   return cell;
// }

// function updateCellHighlight(cell, color) {
//   cell.style.backgroundColor = color;
// }

// function clearSelection() {
//   selectedCells.forEach(([row, col]) => {
//     document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.backgroundColor = '';
//   });
//   selectedCells = [];
// }

// function getSelectedWord() {
//   return selectedCells.map(([row, col]) => grid[row][col]).join('');
// }

// function validateAndHighlightWord(word) {
//   const isValid = wordList.includes(word);
//   if (isValid) {
//     const randomColor = VALID_COLORS[Math.floor(Math.random() * VALID_COLORS.length)];
//     selectedCells.forEach(([row, col]) => {
//       document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.backgroundColor = randomColor;
//     });
//     strikeThroughWord(word); // Add strikethrough to found word in list
//   } else {
//     clearSelection(); // Clear the selection if the word is invalid
//   }
// }

// // Initialize the game on DOM content loaded
// document.addEventListener('DOMContentLoaded', async () => {
//   await loadWordList(); // Load word list once
//   initializeGame();

//   // Set up reset button with debounce
//   const resetButton = document.getElementById('resetButton');
//   resetButton.addEventListener('click', debounce(() => {
//     resetGame();
//   }, 300)); // Debounce delay of 300ms

//   // Set up drag-to-select functionality
//   document.getElementById('wordSearchGrid').addEventListener('mousedown', startSelection);
//   document.getElementById('wordSearchGrid').addEventListener('touchstart', startSelection);
//   document.addEventListener('mousemove', selectCells);
//   document.addEventListener('touchmove', selectCells);
//   document.addEventListener('mouseup', endSelection);
//   document.addEventListener('touchend', endSelection);
// });


// // Constants
// const GRID_SIZE = 10; // Define grid size
// const MIN_WORDS = 2;  // Minimum number of words to place
// const MAX_WORDS = 5;  // Maximum number of words to place

// // Constants for selection
// const SELECTION_COLOR = 'pink'; // Default color for selection
// const VALID_COLORS = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2']; // Example valid colors

// let wordList = []; // Cached word list
// let isResetting = false; // Flag to check if reset is in progress
// let startRow, startCol;
// let selectedCells = [];
// let isSelecting = false;
// let grid = createGrid(GRID_SIZE); // Initialize grid

// // Directions for word placement
// const DIRECTIONS = [
//   { name: 'horizontal', row: 0, col: 1 },
//   { name: 'vertical', row: 1, col: 0 },
//   { name: 'diagonal-down-right', row: 1, col: 1 },
//   { name: 'diagonal-down-left', row: 1, col: -1 },
//   { name: 'diagonal-up-right', row: -1, col: 1 },
//   { name: 'diagonal-up-left', row: -1, col: -1 },
//   { name: 'reverse-horizontal', row: 0, col: -1 },
//   { name: 'reverse-vertical', row: -1, col: 0 },
//   { name: 'reverse-diagonal-down-right', row: -1, col: -1 },
//   { name: 'reverse-diagonal-down-left', row: -1, col: 1 },
//   { name: 'reverse-diagonal-up-right', row: 1, col: -1 },
//   { name: 'reverse-diagonal-up-left', row: 1, col: 1 }
// ];

// // Fetch the word list from the text file (only once)
// async function loadWordList() {
//   try {
//     const response = await fetch('assets/wordlist.txt');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const text = await response.text();
//     wordList = text.split(',').map(word => word.trim().toUpperCase());
//   } catch (error) {
//     console.error('Error fetching word list:', error);
//     wordList = []; // Fallback to empty list on error
//   }
// }

// // Create an empty grid
// function createGrid(size) {
//   return Array.from({ length: size }, () => Array(size).fill(''));
// }

// // Check if a word can be placed in the grid at a specific location and direction
// function canPlaceWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || (grid[row][col] !== '' && grid[row][col] !== word[i])) {
//       return false;
//     }
//     row += direction.row;
//     col += direction.col;
//   }
//   return true;
// }

// // Place a word in the grid at a specific location and direction
// function placeWord(grid, word, startRow, startCol, direction) {
//   let row = startRow;
//   let col = startCol;

//   for (let i = 0; i < word.length; i++) {
//     grid[row][col] = word[i];
//     row += direction.row;
//     col += direction.col;
//   }
// }

// // Insert words into the grid
// function insertWordsIntoGrid(grid, words) {
//   words.forEach(word => {
//     let placed = false;
//     while (!placed) {
//       const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//       const startRow = Math.floor(Math.random() * grid.length);
//       const startCol = Math.floor(Math.random() * grid[0].length);
//       if (canPlaceWord(grid, word, startRow, startCol, direction)) {
//         placeWord(grid, word, startRow, startCol, direction);
//         placed = true;
//       }
//     }
//   });
// }

// // Fill the grid with random letters
// function fillGridWithRandomLetters(grid) {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       if (grid[row][col] === '') {
//         grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
//       }
//     }
//   }
// }

// // Render the grid into the HTML table using DocumentFragment
// function renderGrid(grid) {
//   const table = document.getElementById('wordSearchGrid');
//   const fragment = document.createDocumentFragment();
  
//   grid.forEach((row, rowIndex) => {
//     const tr = document.createElement('tr');
//     row.forEach((cell, colIndex) => {
//       const td = document.createElement('td');
//       td.textContent = cell;
//       td.dataset.row = rowIndex;
//       td.dataset.col = colIndex;
//       tr.appendChild(td);
//     });
//     fragment.appendChild(tr);
//   });
  
//   table.innerHTML = ''; // Clear existing content
//   table.appendChild(fragment); // Add new content
// }

// // Update the word list display
// function updateWordList(words) {
//   const wordListElement = document.getElementById('wordList');
//   const fragment = document.createDocumentFragment();
  
//   words.forEach(word => {
//     const li = document.createElement('li');
//     li.textContent = word;
//     li.dataset.word = word; // Store word for easy reference
//     fragment.appendChild(li);
//   });
  
//   wordListElement.innerHTML = ''; // Clear existing content
//   wordListElement.appendChild(fragment); // Add new content
// }

// // Update word list with strikethrough and color for found words
// function updateWordInList(word, color) {
//   const li = Array.from(document.querySelectorAll('#wordList li'))
//     .find(li => li.dataset.word === word);
//   if (li) {
//     li.style.textDecoration = 'line-through';
//     li.style.color = color; // Apply color to the word in the list
//   }
// }

// // Get a random subset of words from the list
// function getRandomWords(minWords, maxWords) {
//   const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
//   const shuffledList = wordList.slice().sort(() => 0.5 - Math.random());
//   return shuffledList.slice(0, numWords);
// }

// // Debounce function to limit how often a function can be called
// function debounce(func, wait) {
//   let timeout;
//   return function(...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// // Reset the game
// async function resetGame() {
//   if (isResetting) return; // Prevent multiple resets at the same time
//   isResetting = true;

//   try {
//     grid = createGrid(GRID_SIZE);
//     const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//     insertWordsIntoGrid(grid, wordsToInsert);
//     fillGridWithRandomLetters(grid);
//     renderGrid(grid);
//     updateWordList(wordsToInsert);
//   } catch (error) {
//     console.error('Error resetting game:', error);
//   } finally {
//     // Ensure flag is reset after operation completes
//     isResetting = false;
//   }
// }

// // Initialize the game
// function initializeGame() {
//   grid = createGrid(GRID_SIZE);
//   const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
//   insertWordsIntoGrid(grid, wordsToInsert);
//   fillGridWithRandomLetters(grid);
//   renderGrid(grid);
//   updateWordList(wordsToInsert);
// }

// // Drag-to-select functionality
// function startSelection(event) {
//   if (event.button !== 0) return; // Only handle left mouse button
//   isSelecting = true;
//   const cell = getCellFromEvent(event);
//   if (cell) {
//     startRow = parseInt(cell.dataset.row);
//     startCol = parseInt(cell.dataset.col);
//     selectedCells = [[startRow, startCol]];
//     updateCellHighlight(cell, SELECTION_COLOR);
//   }
// }

// function selectCells(event) {
//   if (!isSelecting) return;
//   const cell = getCellFromEvent(event);
//   if (cell) {
//     const row = parseInt(cell.dataset.row);
//     const col = parseInt(cell.dataset.col);
//     if (!selectedCells.some(([r, c]) => r === row && c === col)) {
//       selectedCells.push([row, col]);
//       updateCellHighlight(cell, SELECTION_COLOR);
//     }
//   }
// }

// function endSelection(event) {
//   if (!isSelecting) return;
//   isSelecting = false;
//   const word = getSelectedWord();
//   if (word) {
//     validateAndHighlightWord(word);
//   } else {
//     clearSelection(); // Clear selection if no valid word
//   }
// }

// // Clear cell highlights
// function clearSelection() {
//   selectedCells.forEach(([row, col]) => {
//     updateCellHighlight(document.querySelector(`[data-row="${row}"][data-col="${col}"]`), '');
//   });
//   selectedCells = [];
// }

// // Update cell highlight
// function updateCellHighlight(cell, color) {
//   if (cell) {
//     cell.style.backgroundColor = color;
//   }
// }

// // Get the cell from the event
// function getCellFromEvent(event) {
//   const target = event.target;
//   if (target.tagName === 'TD') {
//     return target;
//   }
//   return null;
// }

// // Get the selected word from the grid
// function getSelectedWord() {
//   return selectedCells
//     .sort(([row1, col1], [row2, col2]) => row1 - row2 || col1 - col2)
//     .map(([row, col]) => grid[row][col])
//     .join('');
// }

// // Validate and highlight the word
// function validateAndHighlightWord(word) {
//   const isValid = wordList.includes(word);
//   if (isValid) {
//     const randomColor = VALID_COLORS[Math.floor(Math.random() * VALID_COLORS.length)];
//     selectedCells.forEach(([row, col]) => {
//       updateCellHighlight(document.querySelector(`[data-row="${row}"][data-col="${col}"]`), randomColor);
//     });
//     updateWordInList(word, randomColor); // Add strikethrough to found word in list
//   } else {
//     clearSelection(); // Clear the selection if the word is invalid
//   }
// }

// // Initialize the game on DOM content loaded
// document.addEventListener('DOMContentLoaded', async () => {
//   await loadWordList(); // Load word list once
//   initializeGame();

//   // Set up reset button with debounce
//   const resetButton = document.getElementById('resetButton');
//   resetButton.addEventListener('click', debounce(() => {
//     resetGame();
//   }, 300)); // Debounce delay of 300ms

//   // Set up drag-to-select functionality
//   document.getElementById('wordSearchGrid').addEventListener('mousedown', startSelection);
//   document.getElementById('wordSearchGrid').addEventListener('touchstart', startSelection);
//   document.addEventListener('mousemove', selectCells);
//   document.addEventListener('touchmove', selectCells);
//   document.addEventListener('mouseup', endSelection);
//   document.addEventListener('touchend', endSelection);
// });



// Constants
const GRID_SIZE = 10; // Define grid size
const MIN_WORDS = 2;  // Minimum number of words to place
const MAX_WORDS = 5;  // Maximum number of words to place

// Constants for selection
const SELECTION_COLOR = 'pink'; // Default color for selection
const VALID_COLORS = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2']; // Example valid colors

let wordList = []; // Cached word list
let isResetting = false; // Flag to check if reset is in progress
let startRow, startCol;
let selectedCells = [];
let isSelecting = false;
let grid = createGrid(GRID_SIZE); // Initialize grid

// Directions for word placement
const DIRECTIONS = [
  { name: 'horizontal', row: 0, col: 1 },
  { name: 'vertical', row: 1, col: 0 },
  { name: 'diagonal-down-right', row: 1, col: 1 },
  { name: 'diagonal-down-left', row: 1, col: -1 },
  { name: 'diagonal-up-right', row: -1, col: 1 },
  { name: 'diagonal-up-left', row: -1, col: -1 },
  { name: 'reverse-horizontal', row: 0, col: -1 },
  { name: 'reverse-vertical', row: -1, col: 0 },
  { name: 'reverse-diagonal-down-right', row: -1, col: -1 },
  { name: 'reverse-diagonal-down-left', row: -1, col: 1 },
  { name: 'reverse-diagonal-up-right', row: 1, col: -1 },
  { name: 'reverse-diagonal-up-left', row: 1, col: 1 }
];

// Fetch the word list from the text file (only once)
async function loadWordList() {
  try {
    const response = await fetch('assets/wordlist.txt');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const text = await response.text();
    wordList = text.split(',').map(word => word.trim().toUpperCase());
  } catch (error) {
    console.error('Error fetching word list:', error);
    wordList = []; // Fallback to empty list on error
  }
}

// Create an empty grid
function createGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(''));
}

// Check if a word can be placed in the grid at a specific location and direction
function canPlaceWord(grid, word, startRow, startCol, direction) {
  let row = startRow;
  let col = startCol;

  for (let i = 0; i < word.length; i++) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || (grid[row][col] !== '' && grid[row][col] !== word[i])) {
      return false;
    }
    row += direction.row;
    col += direction.col;
  }
  return true;
}

// Place a word in the grid at a specific location and direction
function placeWord(grid, word, startRow, startCol, direction) {
  let row = startRow;
  let col = startCol;

  for (let i = 0; i < word.length; i++) {
    grid[row][col] = word[i];
    row += direction.row;
    col += direction.col;
  }
}

// Insert words into the grid
function insertWordsIntoGrid(grid, words) {
  words.forEach(word => {
    let placed = false;
    while (!placed) {
      const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const startRow = Math.floor(Math.random() * grid.length);
      const startCol = Math.floor(Math.random() * grid[0].length);
      if (canPlaceWord(grid, word, startRow, startCol, direction)) {
        placeWord(grid, word, startRow, startCol, direction);
        placed = true;
      }
    }
  });
}

// Fill the grid with random letters
function fillGridWithRandomLetters(grid) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
      }
    }
  }
}

// Render the grid into the HTML table using DocumentFragment
function renderGrid(grid) {
  const table = document.getElementById('wordSearchGrid');
  const fragment = document.createDocumentFragment();
  
  grid.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell, colIndex) => {
      const td = document.createElement('td');
      td.textContent = cell;
      td.dataset.row = rowIndex;
      td.dataset.col = colIndex;
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  
  table.innerHTML = ''; // Clear existing content
  table.appendChild(fragment); // Add new content
}

// Update the word list display
function updateWordList(words) {
  const wordListElement = document.getElementById('wordList');
  const fragment = document.createDocumentFragment();
  
  words.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    fragment.appendChild(li);
  });
  
  wordListElement.innerHTML = ''; // Clear existing content
  wordListElement.appendChild(fragment); // Add new content
}

// Update word list with strikethrough and color for found words
function strikeThroughWord(word, color) {
  const li = Array.from(document.querySelectorAll('#wordList li'))
    .find(li => li.textContent === word);
  if (li) {
    li.style.textDecoration = 'line-through';
    li.style.color = color; // Highlight with the same color
  }
}

// Get a random subset of words from the list
function getRandomWords(minWords, maxWords) {
  const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const shuffledList = wordList.slice().sort(() => 0.5 - Math.random());
  return shuffledList.slice(0, numWords);
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Reset the game
async function resetGame() {
  if (isResetting) return; // Prevent multiple resets at the same time
  isResetting = true;

  try {
    grid = createGrid(GRID_SIZE);
    const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
    insertWordsIntoGrid(grid, wordsToInsert);
    fillGridWithRandomLetters(grid);
    renderGrid(grid);
    updateWordList(wordsToInsert);
  } catch (error) {
    console.error('Error resetting game:', error);
  } finally {
    // Ensure flag is reset after operation completes
    isResetting = false;
  }
}

// Initialize the game
function initializeGame() {
  grid = createGrid(GRID_SIZE);
  const wordsToInsert = getRandomWords(MIN_WORDS, MAX_WORDS);
  insertWordsIntoGrid(grid, wordsToInsert);
  fillGridWithRandomLetters(grid);
  renderGrid(grid);
  updateWordList(wordsToInsert);
}

// Drag-to-select functionality
function startSelection(event) {
  if (event.button !== 0) return; // Only handle left mouse button
  isSelecting = true;
  const cell = getCellFromEvent(event);
  if (cell) {
    startRow = parseInt(cell.dataset.row);
    startCol = parseInt(cell.dataset.col);
    selectedCells = [[startRow, startCol]];
    updateCellHighlight(cell, SELECTION_COLOR);
  }
}

function selectCells(event) {
  if (!isSelecting) return;
  const cell = getCellFromEvent(event);
  if (cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (!selectedCells.some(([r, c]) => r === row && c === col)) {
      selectedCells.push([row, col]);
      updateCellHighlight(cell, SELECTION_COLOR);
    }
  }
}

function endSelection(event) {
  if (!isSelecting) return;
  isSelecting = false;
  const word = getSelectedWord();
  if (word) {
    validateAndHighlightWord(word);
  } else {
    clearSelection(); // Clear selection if no valid word
  }
}

function getCellFromEvent(event) {
  const cell = event.target.closest('td');
  return cell;
}

function updateCellHighlight(cell, color) {
  cell.style.backgroundColor = color;
}

function clearSelection() {
  selectedCells.forEach(([row, col]) => {
    document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.backgroundColor = '';
  });
  selectedCells = [];
}

function getSelectedWord() {
  return selectedCells.map(([row, col]) => grid[row][col]).join('');
}

function validateAndHighlightWord(word) {
  const isValid = wordList.includes(word);
  if (isValid) {
    // Generate a random color for highlighting
    const randomColor = VALID_COLORS[Math.floor(Math.random() * VALID_COLORS.length)];

    // Highlight the word in the grid
    selectedCells.forEach(([row, col]) => {
      document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.backgroundColor = randomColor;
    });

    // Strike through and highlight the word in the list with the same color
    strikeThroughWord(word, randomColor);
  } else {
    clearSelection(); // Clear the selection if the word is invalid
  }
}

// Initialize the game on DOM content loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadWordList(); // Load word list once
  initializeGame();

  // Set up reset button with debounce
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', debounce(() => {
    resetGame();
  }, 300)); // Debounce delay of 300ms

  // Set up drag-to-select functionality
  document.getElementById('wordSearchGrid').addEventListener('mousedown', startSelection);
  document.getElementById('wordSearchGrid').addEventListener('touchstart', startSelection);
  document.addEventListener('mousemove', selectCells);
  document.addEventListener('touchmove', selectCells);
  document.addEventListener('mouseup', endSelection);
  document.addEventListener('touchend', endSelection);
});

