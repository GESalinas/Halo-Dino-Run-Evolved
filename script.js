window.onload = ()=> {let container = document.querySelector("#container");
let masterChief = document.querySelector("#masterChief");
let grunt = document.querySelector("#grunt");
let terrain = document.querySelector("#terrain");
let cloud = document.querySelector("#cloud");
let time = document.querySelector("#time");
let gameOverText = document.querySelector("#gameOverText");
let gameOverBG = document.querySelector("#gameOverBG")
let victoryText = document.querySelector("#victoryText")
let victoryBG = document.querySelector("#victoryBG")
let pelican = document.querySelector("#pelican")

//Menu Sequence variables
let startBTN = document.querySelector("#startBTN")
let startBTNBG = document.querySelector("#startBTNBG")
let menu = document.querySelector("#menu")
let synopsis = document.querySelector("#synopsis")

//end sequence variables
let epilogue = document.querySelector("#epilogue")

let gameOverSound = new Howl({
    src: ['sounds/Game Over.mp3']
});
let zetaHalo = new Howl({
    src: ['sounds/Halo 8Bit - Zeta Halo.mp3'],
    loop: true,
});
let victorySound = new Howl({
    src: ['sounds/Victory.mp3']
});
let theRoad = new Howl({
    src: ['sounds/Halo 8Bit - The Road.mp3']
});
let KML = new Howl({
    src: ['sounds/Halo 8Bit - KML SPC.mp3'],
    loop: true,
});
let isButtonClicked = false;
let gamePlaying = false;

//creating the Menu Sequence
document.getElementById("startBTN").addEventListener("click", (beginGame)=> {
    startBTN.parentNode.removeChild(startBTN);
    startBTNBG.parentNode.removeChild(startBTNBG);
    setTimeout(()=>{
        menu.parentNode.removeChild(menu)
        isButtonClicked = true;
    },7000);
    zetaHalo.play();                   
});


//Creating the timer
let startInterval
let endInterval
let playerTime = 46;


//function for time countdown
let timeCounter = ()=>{
    //if (!gamePlaying) return
    playerTime -= 1;
    time.innerHTML = `Time left: <b>${playerTime}</b>s`;
    if(playerTime == 30){
        let thirtySecs = new Howl({
            src: ['sounds/30 Seconds Remaining.mp3']
        });
        thirtySecs.play();
    }
    if(playerTime == 10){
        grunt.parentNode.removeChild(grunt)
    }
    if(playerTime == 5){
        pelican.classList.add("pelicanActive")
    }
    if(playerTime == 0){
        victoryText.style.display = "block";
        victoryBG.style.display = "block";
        theRoad.stop()
        victorySound.play();
        KML.play();
    }
    if(playerTime == -5){
        victoryBG.parentNode.removeChild(victoryBG)
        victoryText.parentNode.removeChild(victoryText)
        epilogue.style.display = "block";
    }
}


//Begin Game
window.addEventListener("keydown", (start)=>{
    if(start.code == "Space" && !gamePlaying && isButtonClicked)
        {
            gamePlaying = true;
            //timer
            //let playerTime = 46;
            startInterval = setInterval(timeCounter,1000);
            endInterval = setInterval(checkDeath, 10)
            zetaHalo.stop();
            theRoad.play();
            gameOverText.style.display = "none";
            gameOverBG.style.display = "none";
            grunt.classList.add("gruntActive");
            terrain.firstElementChild.style.animation ="terrainAnimate 1.5s linear infinite";
            cloud.firstElementChild.style.animation ="cloudAnimate 50s linear infinite";
            synopsis.parentNode.removeChild(synopsis);
        }
        
});

//Making Master Chief Jump
window.addEventListener("keydown", (e)=> {

    if (e.key == "ArrowUp")
        if (masterChief.classList != "masterChiefActive") {
                masterChief.classList.add("masterChiefActive");
                    //remove class after 0.5 seconds
                setTimeout(()=>{
                    masterChief.classList.remove("masterChiefActive");
                },500);
            }
});

//Hit detection and death
const checkDeath = () => {
    let masterChiefBottom = parseInt(getComputedStyle(masterChief).getPropertyValue("bottom"));
    let gruntLeft = parseInt(getComputedStyle(grunt).getPropertyValue("left"));

    if (masterChiefBottom <= 90 && gruntLeft >= 20 && gruntLeft <= 70) {
        clearInterval(startInterval);
        clearInterval(endInterval);
        gameOverText.style.display = "block";
        gameOverBG.style.display = "block";
        grunt.classList.remove("gruntActive");
        terrain.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        playerTime = 46;
        gameOverSound.play();
        theRoad.stop();
        gamePlaying = false;
    }
};
 
}