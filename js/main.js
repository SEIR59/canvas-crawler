let game = document.querySelector("#game");
let shrek;
let donkey;
let ctx = game.getContext("2d"); // this creates a 2 dimensional canvas
let score = document.querySelector("#score");
let movement = document.querySelector("#movement");
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);
class Crawler {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.height = height;
        this.width = width; 
        this.alive = true;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// how to put a square on the canvas using Crawler class
// let rambo = new Crawler(10, 20, "yellow", 20, 20);
// console.log(rambo);
// rambo.render();

// (function (){
//     donkey = new Crawler(10, 20, "#870a66", 20, 20);
//     shrek = new Crawler(100, 200, "#bada55", 40, 80);

//     // console.log(donkey, shrek);
// })()

// if DOMContentLoaded works correctly on your browser, you can put the above statement block inside of this event listener:
window.addEventListener("DOMContentLoaded", function (e){
    donkey = new Crawler(10, 20, "#870a66", 20, 20);
    shrek = new Crawler(100, 100, "#bada55", 40, 80);
    
    const runGame = setInterval(gameLoop, 120);
})

// KEYBOARD INTERACTION LOGIC

function movementHandler(e){
    // console.log("the key that was pressed was: " + e.key);

    // if(e.key === "ArrowUp"){

    // } else if(e.key === "ArrowDown"){

    // }

    // basic if/else logic and syntax
    // if (condition){
    //     run this code
    // } else {
    //     run this code
    // }

    // ternary operator basic logic
    // condition ? yes : no

    switch (e.key){
        case "ArrowUp":
            // donkey.y = donkey.y - 10;
            donkey.y > 0 ?  donkey.y -= 10  :  null;
            break
        case "ArrowDown":
            donkey.y < (game.height - donkey.height) ? donkey.y += 10 : null;
            break
        case "ArrowLeft":
            donkey.x > 0 ? donkey.x -= 10 : null;
            break
        case "ArrowRight":
            donkey.x < (game.width - donkey.width) ? donkey.x += 10 : null;
            break
    }

    console.log(donkey);

}

document.addEventListener("keydown", movementHandler)

function gameLoop(){
    ctx.clearRect(0, 0, game.width, game.height);

    movement.textContent = `X: ${donkey.x}\nY: ${donkey.y}`

    if (shrek.alive){
        shrek.render();
        let hit = detectHit(donkey, shrek);
    }

    donkey.render();
}

function detectHit(p1, p2){
    let hitTest =
        p1.y + p1.height > p2.y &&
        p1.y < p2.y + p2.height &&
        p1.x + p1.width > p2.x &&
        p1.x < p2.x + p2.width; // {boolean} : if all are true -> hit

    if (hitTest){
        // add to score
        let gameScore = Number(score.textContent);
        let newScore = gameScore + 100;
        score.textContent = newScore;
        return addNewShrek();
    } else{
        return false;
    }
}

function addNewShrek() {
    shrek.alive = false;
    setTimeout(function(){
        let x = Math.floor(Math.random() * game.width) - 40;
        let y = Math.floor(Math.random() * game.height) - 40;
        shrek = new Crawler(x, y, "#bada55", 40, 80)
    }, 1000)
    return true;
}