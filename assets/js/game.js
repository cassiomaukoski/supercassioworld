
var start = false;

let playerX = 0;
let playerY = 235;
let cloudX = 300;
let cloudY = 200;
let luckyX = 2000;
var luckyCollected = false;
let divInfoX = 1910;
var animationLeft = false;
var animationRight = false;
var lastDirection = false;
var jump = false;
var jumpForce = 15;
var jumpDirection = false;

var infoPtBr = ['Me chamo Cassio Maukoski', 'Sou desenvolvedor Full-Stack!', 'Minha linguagem favorita é Java', 'Porém já trabalhei/estudei com 4 linguagens diferentes', 'Trabalho com desenvolvimento desde os 17 anos', 'Estudo TI desde os 10 anos!', 'Além de desenvolvedor, sou professor', 'Trabalho/trabalhei em sistemas educacionais, sendo um dos principais desenvolvedores!', 'Clique no Mario para acessar o meu LinkedIn!'];
var infoEn = ['My name is Cassio Maukoski', 'I\'m Full-Stack developer', 'My favorite language is Java', 'However, I have already worked/studied with 4 different languages!', 'I have worked in development since I was 17', 'I have studied IT since I was 10 years old', 'In addition to being a developer, I am a teacher', 'I work/worked in educational systems, being one of the main developers!', 'Click on to Mario for access my LinkedIn!'];
var infoLevel = 0;
const groundsQuantity = 17;

const keyMap = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right'
};

const keysPressed = {};

const GRAVITY = 0.6;
const MAX_JUMP_HEIGHT = 150; // Adjust this value to limit the jump height

function update() {
    const player = document.getElementById('player');
    const cloud = document.getElementById('cloud');
    const lucky = document.getElementById('lucky');
    const divInfo = document.getElementById('divInfo');
    const info = document.getElementById('info');
    const ground = document.getElementsByClassName('ground');
    const groundX = [];
    var lastGround = 0;
    var firstGround = 2600;
    for (i = 0; i < groundsQuantity; i++) {
        groundX.push(ground[i].offsetLeft);
        if(groundX[i]>lastGround){
            lastGround = groundX[i];
        }
        if(groundX[i]<firstGround){
            firstGround = groundX[i];
        }
    }

    if (keysPressed.up && !jump) {
        jump = true;
        jumpForce = 12;
        jumpDirection = true;
    }
    

    if (jump) {
        playerY += jumpForce;
        jumpForce -= GRAVITY;
        if (jumpForce <= 0) {
            jumpDirection = false;
        }
        
        if((jumpForce <= 0.1 && jumpForce >=-0.1) && (playerX >= luckyX-60 && playerX <= luckyX+60) && !luckyCollected){
                luckyCollected = true;
                lucky.src = 'assets/images/luckycolected.png';
                if(languageSelect==='ptBr'){
                    info.textContent = infoPtBr[infoLevel];
                }else{
                    info.textContent = infoEn[infoLevel];
                }
                infoLevel++;
            }
        
        if (jumpDirection) {
            if (lastDirection) {
                player.src = 'assets/images/jumpleft.png';
            } else {
                player.src = 'assets/images/jumpright.png';
            }
        } else {
            if (lastDirection) {
                player.src = 'assets/images/fallleft.png';
            } else {
                player.src = 'assets/images/fallright.png';
            }
        }

        if (playerY < 235) {
            playerY = 235;
            jump = false;
            if (keysPressed.left && !keysPressed.right) {
                player.src = 'assets/images/walkleft.gif';
            }
            if (keysPressed.right && !keysPressed.left) {
                player.src = 'assets/images/walkright.gif';
            }
            if ((keysPressed.right && keysPressed.left) || (!keysPressed.right && !keysPressed.left)) {
                if (lastDirection) {
                    player.src = 'assets/images/idleleft.png';
                } else {
                    player.src = 'assets/images/idleleft.png';
                }
            }
        }
    }

    if (keysPressed.left && playerX > 0) {
        playerX -= 10;
        lastDirection = true;
        if (!keysPressed.right && !animationLeft) {
            animationLeft = true;
            animationRight = false;
            player.src = 'assets/images/walkleft.gif';
        }
    }
    
    if (keysPressed.right) {
        if (playerX < window.innerWidth / 2.2) {
            playerX += 10;
        } else {
            cloudX -= 10;
            luckyX -= 10;
            divInfoX -=10;
            for (i = 0; i < groundsQuantity; i++) {
                groundX[i] -= 10;
            }
        }
        if(luckyX < -150){
            luckyX = 2000;
            lucky.src = 'assets/images/lucky.gif';
            info.textContent = '';
            divInfoX = 1910;
            luckyCollected = false;
        }
        
        if (cloudX < -500) {
            cloudX = 2000;
            cloudY = getRandomInt(0, 30) * 10;
            cloud.style.top = cloudY + 'px';
            cloud.src = 'assets/images/cloud_' + getRandomInt(1, 6) + '.png';
        }
        /*
         if (plataform1X < -1920) {
         plataform1X = 0;
         }
         if (plataform2X < -1920) {
         plataform2X = 0;
         }
         */



        for (i = 0; i < groundsQuantity; i++) {
            if (groundX[i] === -120) {
                groundX[i] = lastGround + 110;
            }
        }

        lastDirection = false;
        if (!keysPressed.left && !animationRight) {
            animationLeft = false;
            animationRight = true;
            player.src = 'assets/images/walkright.gif';
        }
    }

    if ((keysPressed.right && keysPressed.left && !jump) || (!keysPressed.right && !keysPressed.left && !jump)) {
        animationLeft = false;
        animationRight = false;
        if (lastDirection) {
            player.src = 'assets/images/idleleft.png';
        } else {
            player.src = 'assets/images/idleright.png';
        }
    }

    player.style.left = playerX + 'px';
    player.style.bottom = playerY + 'px';
    cloud.style.left = cloudX + 'px';
    lucky.style.left = luckyX + 'px';
    divInfo.style.left = divInfoX + 'px';
    
    for(i = 0; i<groundsQuantity; i++){
        var g = ground[i];
        g.style.left = groundX[i] + 'px';
    }
    
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (!start) {
        if (event.key === 'Enter') {
            start = true;
            requestAnimationFrame(update);
            const startText = document.getElementById('startText');
            const logoImage = document.getElementById("logoImage");
            startText.textContent = '';
            logoImage.remove();
        }
    } else {
        const key = event.key.toLowerCase();
        if (keyMap[key] !== undefined) {
            event.preventDefault();
            keysPressed[keyMap[key]] = true;
        }
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (keyMap[key] !== undefined) {
        keysPressed[keyMap[key]] = false;
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

var languageSelect; 

function language(){
    var languageImage = document.getElementById('languageImage');
    if(languageSelect==='ptBr'){
        languageImage.src = 'assets/images/brazil.png';
        languageSelect = 'en';
        en();
    }else{
        languageImage.src = 'assets/images/eua.png';
        languageSelect = 'ptBr';
        ptBr();
    }
}

function ptBr() {
    if (!start) {
        const startText = document.getElementById('startText');
        startText.textContent = 'Pressione enter para começar';
    }else if(luckyCollected){
        const info = document.getElementById('info');
        info.textContent = infoPtBr[infoLevel-1];
    }
}

function en() {
    if (!start) {
        const startText = document.getElementById('startText');
        startText.textContent = 'Press enter to start';
    }else if(luckyCollected){
        const info = document.getElementById('info');
        info.textContent = infoEn[infoLevel-1];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    languageSelect = 'en';
    language();
});