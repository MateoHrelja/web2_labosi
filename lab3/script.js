// postavke
const noOfNewAsteroids = 2; // broj dodatnih asteroida koji se periodično stvore
const initialNumberOfAsteroids = 8; // mora biti dijeljivo s gornjom varijablom ili se zaokružuje
const intervalBetweenNewAsteroidSpawn = 30; // broj sekundi između periodičnog stvaranja dodatnih asteroida
const minAsteroidSize = 50; // self-explanatory, a i ostale su
const maxASteroidSize = 100;
const minAsteroidSpeed = 3;
const maxAsteroidSpeed = 6;
const playerSize = 65;
const playerSpeed = 10;

// pomoćne globalne varijable
var asteroidPieces = [];
var currentNoOfAsteroids = 0;
var myPlayer;
var keysPressed = {
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
};
var startTime;
var elapsedTime = 0;

// funkcija koja generira asteroide; boja, veličina, brzina i smjer su nasumični
function generateAsteroids() {
    currentNoOfAsteroids += 2
    console.log("Generating " + noOfNewAsteroids + " asteroids; total = " + currentNoOfAsteroids);
    const colors = ["gray", "dimgray", "darkgray"];
    const heights = [0, window.innerHeight];
    const widths = [0, window.innerWidth];
    for (let i = 0; i < noOfNewAsteroids; i++) {
        let color = colors[Math.floor(Math.random() * 3)];
        let size = Math.floor(Math.random() * (maxASteroidSize - minAsteroidSize + 1)) + minAsteroidSize;
        let speed_x = Math.floor(Math.random() * (maxAsteroidSpeed - minAsteroidSpeed + 1)) + minAsteroidSpeed;
        let speed_y = Math.floor(Math.random() * (maxAsteroidSpeed - minAsteroidSpeed + 1)) + minAsteroidSpeed;
        // height i width varijable se odnose na poziciju na ekranu, odnosno x i y, ne veličinu
        let height = heights[Math.floor(Math.random() * 2)];
        let width = widths[Math.floor(Math.random() * 2)];
        asteroidPieces.push(new asteroidComponent(size, size, color, height, width, speed_x, speed_y));
    }
}

// funkcija koja dohvaća najbolje vrijeme iz localStorage, čisto radi elegantnosti
function getBestTime() {
    if (localStorage.bestTime) {
        return localStorage.bestTime;
    } else {
        return 0;
    }
}

// ditto za ovo gore, "setter" za najbolje vrijeme u localStorage
function setBestTime(newBestTime) {
    localStorage.bestTime = newBestTime;
}

// funkcija za pokretanje igre; stvaranje asteroida, igrača, inicijalizacija timera i registriranje događaja s gumbovima
function startGame() {
    for (let i = 0; i < Math.floor(initialNumberOfAsteroids / noOfNewAsteroids); i++) {
        generateAsteroids();
    }
    // sredina canvasa/prozora
    let middleX = window.innerWidth / 2 - 45;
    let middleY = window.innerHeight / 2 - 45;
    myPlayer = new playerComponent(playerSize, playerSize, "red", middleX, middleY, playerSpeed, playerSpeed);
    startTime = Date.now();
    bestTime = getBestTime();
    // listeneri za tipke
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);
    gameArea.start();
}

// wrapper oko canvasa, preuzet s prezentacije HTML5 i modificiran u skladu s projektom
var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.id = "myGameCanvas";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        // font i hendlanje promjene veličine prozora
        this.context.font = "18px Calibri";
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context.font = "18px Calibri";
        });
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.updateInterval = setInterval(updateGameArea, 20);
        // dodatni interval koji stvara dodatne asteroide kako igra ide dalje, uz gore definirani interval
        this.generateInterval = setInterval(generateAsteroids, intervalBetweenNewAsteroidSpawn * 1000);
    },
    stop: function () {
        clearInterval(this.updateInterval);
        clearInterval(this.generateInterval);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// komponenta za asteroid, preuzeta s prezentacije HTML5 i modificirana
function asteroidComponent(width, height, color, x, y, speed_x, speed_y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = speed_x;
    this.speed_y = speed_y;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 8;
        ctx.shadowColor = "black";
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    // dodan je +- 150 odmak kako bi asteroidi mogli privremeno izaći izvan okvira canvasa
    this.newPos = function () {
        if (this.x - this.width / 2 < -150)
            this.speed_x = speed_x;
        else if ((this.x + this.width / 2) >= gameArea.context.canvas.width + 150)
            this.speed_x = -speed_x;
        if (this.y - this.height / 2 < -150)
            this.speed_y = -speed_y;
        else if ((this.y + this.height / 2) >= gameArea.context.canvas.height + 150)
            this.speed_y = speed_y;
        this.x += this.speed_x;
        this.y -= this.speed_y;
    }
}

// komponenta za igrača, preuzeta s prezentacije HTML5 i modificirana
function playerComponent(width, height, color, x, y, speed_x, speed_y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed_x = speed_x;
    this.speed_y = speed_y;
    this.update = function () {
        // micanje na drugu stranu ekrana ako se dođe do ruba
        if (this.x >= gameArea.context.canvas.width) {
            this.x = 0;
        } else if (this.y >= gameArea.context.canvas.height) {
            this.y = 0;
        } else if (this.x <= 0) {
            this.x = gameArea.context.canvas.width;
        } else if (this.y <= 0) {
            this.y = gameArea.context.canvas.height;
        }
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        // sijena
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
}

// funkcija koja hendla pritisak gumbova za pomicanje igrača koja omogućuje dijagonalno micanje ako je pritisnuto više tipki odjednom
function handleKeyPress(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        keysPressed[event.key] = true;
    }
    // ovo je definitivno moglo i pametnije, ali ovako radi i ne usporava pretjerano renderanje
    for (keyPressed in keysPressed) {
        if (keysPressed[keyPressed]) {
            switch (keyPressed) {
                case 'ArrowUp':
                    myPlayer.y -= myPlayer.speed_y;
                    break;
                case 'ArrowDown':
                    myPlayer.y += myPlayer.speed_y;
                    break;
                case 'ArrowLeft':
                    myPlayer.x -= myPlayer.speed_x;
                    break;
                case 'ArrowRight':
                    myPlayer.x += myPlayer.speed_x;
                    break;
                default:
                    break;
            }
        }
    }
}

// pomoćna funkcija za dijagonalno micanje koja hendle nepritisnute tipke
function handleKeyUp(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        keysPressed[event.key] = false;
    }
}

// funkcija za provjeru kolizije dvaju objekata; uzima se u obzir i veličina objekata, ne samo pozicija, uz mali "pity" od 5 piksela
function isCollision(object1, object2) {
    return (
        object1.x < object2.x + object2.width - 5 &&
        object1.x + object1.width - 5 > object2.x &&
        object1.y < object2.y + object2.height - 5 &&
        object1.y + object1.height - 5 > object2.y
    );
}

// pomoćna funkcija za lijepo formatiranje vremena
function formattedTime(elapsedTime) {
    var secs = Math.floor(elapsedTime / 1000);
    var mins = Math.floor(secs / 60);
    secs %= 60;
    ms = elapsedTime % 1000;
    // prikaz vodećih nula ukoliko je potrebno
    if (mins < 10)
        mins = "0" + mins;
    if (secs < 10)
        secs = "0" + secs;
    if (ms < 100) {
        if (ms < 10) {
            ms = "00" + ms;
        } else {
            ms = "0" + ms;
        }
    }
    return mins + ":" + secs + ":" + ms;
}

// funkcija koja update-a canvas, preuzeta s HTML5 prezentacije i modificirana
function updateGameArea() {
    gameArea.clear();
    // ažuriranje i prikaz timera; ne znam ako postoji bolja varijanta ali ovo je ekvivalent (time.time() - t) u Pythonu, pa...
    elapsedTime = Date.now() - startTime;
    gameArea.context.fillText("Time: " + formattedTime(elapsedTime), gameArea.canvas.width - 150, 20);
    gameArea.context.fillText("Best Time: " + formattedTime(bestTime), gameArea.canvas.width - 170, 40);
    // komponenta za igrača nema newPos() funkciju jer se njezina pozicija ažurira pritiskom tipki
    myPlayer.update();
    for (let i = 0; i < currentNoOfAsteroids; i++) {
        asteroidPieces[i].newPos();
        asteroidPieces[i].update();
        if (isCollision(myPlayer, asteroidPieces[i])) {
            // ako je barem jedan asteroid u koliziji s igračom, gotovo je
            var audio = new Audio('sound.wav');
            audio.volume = 0.5;
            audio.play();
            console.log('GAME OVER! ' + formattedTime(elapsedTime));
            if (elapsedTime > bestTime) {
                setBestTime(elapsedTime);
            }
            gameArea.stop();
        }
    }
}