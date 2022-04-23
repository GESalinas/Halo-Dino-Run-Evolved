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


//creating the Menu Sequence
document.getElementById("startBTN").addEventListener("click", (beginGame)=> {
    startBTN.parentNode.removeChild(startBTN)
    startBTNBG.remove(startBTNBG)
    let zetaHalo = new Howl({
        src: ['sounds/Halo 8Bit - Zeta Halo.mp3']
    });
    zetaHalo.play();
});


//Creating the timer
let interval = null;
let playerTime = 46;


//function for time countdown
let timeCounter = ()=>{
    playerTime--;
    time.innerHTML = `Time left: <b>${playerTime}</b>s`;
    if(playerTime == 10){
        grunt.parentNode.removeChild(grunt)
    }
    if(playerTime == 5){
        pelican.classList.add("pelicanActive")
    }
    if(playerTime == 0){
        victoryText.style.display = "block";
        victoryBG.style.display = "block";
    }
}


//Begin Game
window.addEventListener("keydown", (start)=>{
    if(start.code == "Space")
        {
            gameOverText.style.display = "none";
            gameOverBG.style.display = "none";
            grunt.classList.add("gruntActive");
            terrain.firstElementChild.style.animation ="terrainAnimate 1.5s linear infinite";
            cloud.firstElementChild.style.animation ="cloudAnimate 50s linear infinite";
            
          

            
            
            //timer
            let playerTime = 46;
            interval = setInterval(timeCounter,1000);
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
let result = setInterval(() => {
    let masterChiefBottom = parseInt(getComputedStyle(masterChief).getPropertyValue("bottom"));

    let gruntLeft = parseInt(getComputedStyle(grunt).getPropertyValue("left"));

    if (masterChiefBottom <= 90 && gruntLeft >= 20 && gruntLeft <= 70) {

        gameOverText.style.display = "block";
        gameOverBG.style.display = "block";
        grunt.classList.remove("gruntActive");
        terrain.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        clearInterval(interval);
        playerTime = 46;
    }
}, 10);
 
}