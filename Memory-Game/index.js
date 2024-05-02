var winCount = 0;
var gameState = "ready";

// Define Node class
class Node {
constructor(block) {
this.block = block;
this.children = [];
this.visited = false;
}

addChild(node) {
this.children.push(node);
}

getUnvisitedChild() {
for (let child of this.children) {
    if (!child.visited) {
    return child;
    }
}
return null;
}

markVisited() {
this.visited = true;
}
}

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

// Prompt Window To Ask For Name
let yourName = prompt("Whats Your Name?");

// If Name Is Empty
if (yourName == null || yourName == "") {

// Set Name To Unknown
document.querySelector(".name span").innerHTML = 'Unknown';

// Name Is Not Empty
} else {

// Set Name To Your Name
document.querySelector(".name span").innerHTML = yourName;

}

// Remove Splash Screen
document.querySelector(".control-buttons").remove();
startGame();
};

// Effect Duration
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks"); // Select Blocks Container

let blocks = Array.from(blocksContainer.children); // Create Array From Game Blocks

let orderRange = Array.from(Array(blocks.length).keys()); // Create Range Of Keys

shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
block.style.order = orderRange[index]; // Add CSS Order Property
});

// Flip Block Function
function flipBlock(selectedBlock) {
selectedBlock.classList.add('is-flipped'); // Add Class is-flipped
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
let triesElement = document.querySelector('.tries span');
if (firstBlock.dataset.animals === secondBlock.dataset.animals) {
firstBlock.classList.remove('is-flipped');
secondBlock.classList.remove('is-flipped');
firstBlock.classList.add('has-match');
secondBlock.classList.add('has-match');
winCount++;
if (winCount == 10) {
    alert(`Congratulations, You Win `);
}
document.getElementById('success').play();
} else {
triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
setTimeout(() => {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
}, duration);
document.getElementById('fail').play();
}
}

function startGame() {
gameState = "playing";
let rootNode = new Node(blocks[0]);
DFS(rootNode);
}

// DFS Algorithm
function DFS(node) {
flipBlock(node.block);
node.markVisited();
let nextNode = node.getUnvisitedChild();
if (nextNode) {
let nextBlock = nextNode.block;
setTimeout(() => {
    DFS(nextNode);
}, duration);
} else {
let flippedBlocks = blocks.filter(block => block.classList.contains('is-flipped'));
if (flippedBlocks.length === 2) {
    let firstBlock = flippedBlocks[0];
    let secondBlock = flippedBlocks[1];
    checkMatchedBlocks(firstBlock, secondBlock);
}
let unflippedBlocks = blocks.filter(block => !block.classList.contains('is-flipped'));
if (unflippedBlocks.length > 0) {
    let nextBlockIndex = Math.floor(Math.random() * unflippedBlocks.length);
    let nextBlock = unflippedBlocks[nextBlockIndex];
    let nextNode = new Node(nextBlock);
    node.addChild(nextNode);
    setTimeout(() => {
    DFS(nextNode);
    }, duration);
} else {
    alert("Game Over!");
}
}
}

// Shuffle Function
function shuffle(array) {
// Settings Vars
let current = array.length,
temp,
random;
while (current > 0) {
random = Math.floor(Math.random() * current); // Get Random Number
current--; // Decrease Length By One
temp = array[current]; // [1] Save Current Element in Stash  
array[current] = array[random]; // [2] Current Element = Random Element
array[random] = temp; // [3] Random Element = Get Element From Stash
}
return array;
}