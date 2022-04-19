window.onload = ()=> {let container = document.querySelector("#container");
let masterChief = document.querySelector("#masterChief");
let grunt = document.querySelector("#grunt");
let terrain = document.querySelector("#terrain");
let cloud = document.querySelector("#cloud");
let time = document.querySelector("#time");
let gameOver = document.querySelector("#gameOver");

//Creating the timer
let interval = null;
let playerTime = 60;


//function for time countdown
let timeCounter = ()=>{
    playerTime--;
    time.innerHTML = `Time left: <b>${playerTime}</b>s`;
}


//Begin Game
window.addEventListener("keydown", (start)=>{
    if(start.code == "Space")
        {
            gameOver.style.display = "none";
            grunt.classList.add("gruntActive");
            terrain.firstElementChild.style.animation ="terrainAnimate 1.5s linear infinite";
            cloud.firstElementChild.style.animation ="cloudAnimate 50s linear infinite";
            
            //timer
            let playerTime = 60;
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

}
