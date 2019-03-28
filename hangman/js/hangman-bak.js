/*
##########################################################
Coding by Dave Guzda
Game Assignment - Hangman!
>>> make swanky code! <<<
JavaScript!
###########################################################
*/

var rulesb, startb, rulesbox, startbox, cstart, crules, level = 1,
    mcat, hcat, ccat, mainbox, mainclue, guess, answernum,
    gleft, guessesleft = 10,
    timertext, gcat = "rnd",
    gametime = 90,
    blink = 0,
    histlink, rndglink,
    gamestate, bandlink, rndlink,
    sletter, cont, viclink,
    winimage, playagainbtn,
    hangflower, inguesstext;

/*
JSON Loader var
*/
var xhr = new XMLHttpRequest();
/*
 player settings for local storage
*/
var playersettings = {
    'slevel': level,
    'scategory': gcat
};

/* answer must be a word.... */
var answer = new String("");

/* 
status of each letter in answer as it is being guessed 
C = correct guess
N = not correctly guessed
*/
var pguess = [];

/*
list of letters the player has incorrectly guessed
*/
var iguess = [];

/* 
bank of questions 
*/
var words = [];

/* 
letters 
*/
var mya, myb, myc, myd, mye, myf, myg, myh, myi, myj, myk, myl, mym, myn, myo, myp, myq, myr, mys, myt, myu, myv, myw, myx, myy, myz;

/* 
music related variables (done seperately for easier location) and was coded in a seperate file (music.html) and added in
*/
var playlink, playerstate = "paused",
    audiotext, currenttrack = 0,
    playback = 0.00,
    rndlink, rndtrack = 0,
    nexttrack;

var p = new Audio;
var music = [];


/*                      
variables defined:
==================
gcat : game category
rulesb : Rules button
startb : Start Button
cstart : close start box
crules : close rules box 
mcat : Movies Category selected
hcat : Historical Category selected
ccat : Countries Category selected
answernum : position in array for future use?
gleft : link to guesses left
guessesleft ; the count
inguesstext : text out for incorrect guesses (list of guessed letters)
cont : continue saved game
*/


/* create questions 'blueprint' */
/* word, category, has the word been played? */
function song(t, p) {
    this.songtitle = t;
    this.songpath = p;
}

/* create questions 'blueprint' */
/* word, category, has the word been played? */
function word(w, cat, played) {
    this.gameword = w;
    this.gcategory = cat;
    this.wordplayed = played;
}

/* 
links for letters 
*/
mya = document.querySelector("#lettera");
myb = document.querySelector("#letterb");
myc = document.querySelector("#letterc");
myd = document.querySelector("#letterd");
mye = document.querySelector("#lettere");
myf = document.querySelector("#letterf");
myg = document.querySelector("#letterg");
myh = document.querySelector("#letterh");
myi = document.querySelector("#letteri");
myj = document.querySelector("#letterj");
myk = document.querySelector("#letterk");
myl = document.querySelector("#letterl");
mym = document.querySelector("#letterm");
myn = document.querySelector("#lettern");
myo = document.querySelector("#lettero");
myp = document.querySelector("#letterp");
myq = document.querySelector("#letterq");
myr = document.querySelector("#letterr");
mys = document.querySelector("#letters");
myt = document.querySelector("#lettert");
myu = document.querySelector("#letteru");
myv = document.querySelector("#letterv");
myw = document.querySelector("#letterw");
myx = document.querySelector("#letterx");
myy = document.querySelector("#lettery");
myz = document.querySelector("#letterz");

/* listen for letters */
// a
mya.addEventListener("click", function () {
    madeguess("a");
}, false);
// b
myb.addEventListener("click", function () {
    madeguess("b");
}, false);
// c
myc.addEventListener("click", function () {
    madeguess("c");
}, false);
// d
myd.addEventListener("click", function () {
    madeguess("d");
}, false);
// e
mye.addEventListener("click", function () {
    madeguess("e");
}, false);
// f
myf.addEventListener("click", function () {
    madeguess("f");
}, false);
// g
myg.addEventListener("click", function () {
    madeguess("g");
}, false);
// h
myh.addEventListener("click", function () {
    madeguess("h");
}, false);
// i
myi.addEventListener("click", function () {
    madeguess("i");
}, false);
// j
myj.addEventListener("click", function () {
    madeguess("j");
}, false);
// b
myk.addEventListener("click", function () {
    madeguess("k");
}, false);
// l
myl.addEventListener("click", function () {
    madeguess("l");
}, false);
// m
mym.addEventListener("click", function () {
    madeguess("m");
}, false);
// n
myn.addEventListener("click", function () {
    madeguess("n");
}, false);
// o
myo.addEventListener("click", function () {
    madeguess("o");
}, false);
// p
myp.addEventListener("click", function () {
    madeguess("p");
}, false);
// q
myq.addEventListener("click", function () {
    madeguess("q");
}, false);
// r
myr.addEventListener("click", function () {
    madeguess("r");
}, false);
// s
mys.addEventListener("click", function () {
    madeguess("s");
}, false);
// t
myt.addEventListener("click", function () {
    madeguess("t");
}, false);
// u
myu.addEventListener("click", function () {
    madeguess("u");
}, false);
// v
myv.addEventListener("click", function () {
    madeguess("v");
}, false);
// w
myw.addEventListener("click", function () {
    madeguess("w");
}, false);
// x
myx.addEventListener("click", function () {
    madeguess("x");
}, false);
// y
myy.addEventListener("click", function () {
    madeguess("y");
}, false);
// z
myz.addEventListener("click", function () {
    madeguess("z");
}, false);

/*
Add songs to the array object thingy - once functional can just pop more tracks on here
*/
music.push(new song("Ketsa - fallen stars", "audio/stars.mp3"));
music.push(new song("23:59 - Drop To", "audio/drop.mp3"));
music.push(new song("23:59 - Always", "audio/always.mp3"));
music.push(new song("Blue Wave Theory - Lava Sprout", "audio/lava.mp3"));
music.push(new song("DA Dad - Caffeine Dream", "audio/dream.mp3"));
music.push(new song("fascinating earthbound objects - laidback", "audio/laidback.mp3"));
music.push(new song("fascinating earthbound objects - make it real", "audio/real.mp3"));
music.push(new song("J Hacha de Zola - Eigengrau", "audio/eigengrau.mp3"));
music.push(new song("DA Dad - Natural Disaster", "audio/disaster.mp3"));
music.push(new song("Josh Woodward - Let It In", "audio/let.mp3"));
music.push(new song("Josh Woodward - Fight The Sea", "audio/sea.mp3"));
music.push(new song("Blue Wave Theory - Lava Sprout", "audio/lava.mp3"));
music.push(new song("DA Dad - Room Mate in a Coma", "audio/coma.mp3"));
music.push(new song("Split Phase - Human Factor", "audio/factor.mp3"));
music.push(new song("Los Sundayers - Mirando Hacia Atrs", "audio/atrs.mp3"));
music.push(new song("Josh Woodward - Goodbye To Spring", "audio/spring.mp3"));
music.push(new song("PEG and The Rejected - Red, White, Black & Blue", "audio/blue.mp3"));
music.push(new song("Josh Woodward - Ill Be Right Behind You Josephine", "audio/behind.mp3"));
music.push(new song("Lobo Loco - Little Shadows", "audio/shadows.mp3"));
music.push(new song("KieLoBot - Boss K", "audio/boss.mp3"));
music.push(new song("King Imagine - Foot, Mood And Wind", "audio/wind.mp3"));
music.push(new song("Mabafu - All I Need -Featuring Alena Sola-", "audio/sola.mp3"));
music.push(new song("Nicola & N Dropkick - Chitarradistorta", "audio/ta.mp3"));
music.push(new song("Josh Woodward - Coffee", "audio/coffee.mp3"));
music.push(new song("KieLoKaz - Dancing on Gede Pangrango", "audio/rango.mp3"));
music.push(new song("Ketsa - night fall", "audio/fall.mp3"));
music.push(new song("Lobo Loco - Alien in the City", "audio/city.mp3"));
music.push(new song("Los Sundayers - Transparente", "audio/part.mp3"));
music.push(new song("N Dropkick - Why are you following me you damn Ghouls", "audio/ghouls.mp3"));
music.push(new song("Mabafu - Bersarinplatz", "audio/platz.mp3"));
music.push(new song("Split Phase - Toulouse Goose Dub", "audio/dub.mp3"));
music.push(new song("Split Phase - Thunder Dub", "audio/thunder.mp3"));
music.push(new song("PEG and The Rejected - King Of Ska", "audio/ska.mp3"));


/*
link variables internally to JS
*/

/* rules box etc */
rulesb = document.querySelector("#rulesbtn");
crules = document.querySelector("#closerules");
rulesbox = document.querySelector("#rules");
/* continue button on load screen */
cont = document.querySelector("#contbtn");


/* pic category - start a game */
startb = document.querySelector("#startbtn");
cstart = document.querySelector("#closecat");
startbox = document.querySelector("#categories");
bandlink = document.querySelector("#bands");
histlink = document.querySelector("#historic");
rndglink = document.querySelector("#rndgame");

/* categories buttons */
mcat = document.querySelector("#movies");
hcat = document.querySelector("#historic");
ccat = document.querySelector("#countries");

/* gameplay screen */
mainbox = document.querySelector("#hmain");
mainclue = document.querySelector("#clue");
guess = document.querySelector("#guessing");
gleft = document.querySelector("#guessleft");
inguesstext = document.querySelector("#inguess");
hangflower = document.querySelector("#gallows");
sletter = document.querySelector("#selectletter");
winimage = document.querySelector("#chickendinner");
timertext = document.querySelector("#timer");
playagainbtn = document.querySelector("#playagain");
viclink = document.querySelector("#victory");
/* music buttons */
audiotext = document.querySelector("#audioinfo");
nexttrack = document.querySelector("#nextbtn");
playlink = document.querySelector("#playbtn");
audioinfo = document.querySelector("#audiorow");
rndlink = document.querySelector("#rndbtn");

/*
listeners
*/
/* random game */
rndglink.addEventListener("click", function () {
    gamescreen("rnd");
}, false);
/* open rules */
rulesb.addEventListener("click", openrules);
/* display game rules */
crules.addEventListener("click", closerules);
/* close and hide category selector */
cstart.addEventListener("click", closestart);
/* open start */
startb.addEventListener("click", openstart);
/* winner flower */
winimage.addEventListener("click", newlevel);
/* play again */
playagainbtn.addEventListener("click", replay);
/* picked a catgory - ready to show game screen and start the game for reals */
mcat.addEventListener("click", function () {
    gamescreen("movies");
}, false);
/* historical characters */
histlink.addEventListener("click", function () {
    gamescreen("history");
}, false);
/* rock bands */
bandlink.addEventListener("click", function () {
    gamescreen("bands");
}, false);
/* 
music listeners 
*/
playlink.addEventListener("click", playaudio);
nexttrack.addEventListener("click", next);
rndlink.addEventListener("click", rnd);
/* continue? */
cont.addEventListener("click", contfromsave);

/*
close the rules box - well, hide it
*/
function closerules() {
    rulesbox.style.visibility = "hidden";
    rulesbox.style.height = "0px"; /* shrink it down too */
    rulesbox.style.width = "0px";
}

/*
show the rules
*/
function openrules() {
    rulesbox.style.visibility = "visible";
    rulesbox.style.height = "auto"; /* enlarge */
    rulesbox.style.width = "auto";
}

/*
close the categories box - well, hide it
*/
function closestart() {
    startbox.style.visibility = "hidden";
    startbox.style.height = "0px"; /* shrink it down too */
    startbox.style.width = "0px";
}

/*
start the game! / open category selection box
*/
function openstart() {
    startbox.style.visibility = "visible";
    startbox.style.height = "auto"; /* shrink it down too */
    startbox.style.width = "auto";
}



/*
DETECT if there is a save game... if so... offer "continue saved game option"
*/

function detectsave() {
    if (localStorage.hasOwnProperty("hangman")) {
        console.log("The hangman save file exists!");
        // show button
        cont.style.visibility = "visible";
    } else {
        console.log("There was no save file found to continue from...");
    }
}
/* 
##################################################################
show the main game screen and start a game
###################################################################
*/
function gamescreen(c) {
    console.log("* Hit gamescreen. Category is " + c);
    var i, temp;
    gcat = c;
    console.log("Starting a new game");
    winimage.style.visibility = "hidden";
    playagainbtn.style.visibility = "hidden";
    sletter.style.visibility = "visible";
    playagainbtn.style.height = "0";
    playagainbtn.style.width = "0";
    rndglink.style.visibility = "hidden";
    /* hide all the on-screen divs and buttons */
    /* was hiding start and rules boxes but now wiping them out */
    resetletters();
    startbox.style.display = "none";
    rulesbox.style.display = "none";
    rulesb.style.display = "none";
    startb.style.display = "none";
    /* show gamescreen */
    mainbox.style.visibility = "visible";
    // this shouldn't work
    mainbox.style.border = "dashed 2px #000";
    // check for saved data
    loadgame();
    //
    // pick a question > set to global variable answer
    //
    getaquestion();
    console.log("*** The answer is " + answer);
    // starting text
    inguesstext.innerHTML = guessesleft;
    // reset clock and start game
    timertext.style.visibility = "visible";
    // initial save (to save selected category)
    savegame();
    // show word status
    showguess();
    // to fill it with data so the size is correct - regardless if played
    updatetrack();
    // fix state
    gamestate = "running";
    console.log("GAMESTATE - RUNNING");
}


/*
Get a Question
*/
function getaquestion() {
    var max, wlength, i;
    max = words.length;
    //
    // get a word
    //
    answernum = Math.floor(Math.random() * max) + 1;
    //
    // check if played and is correct category
    //
    console.log("* Getting a question for category: " + gcat);
    // if not the category OR has been played
    if (gcat == "rnd") {
        while (words[answernum].wordplayed == 1) {
            answernum = Math.floor(Math.random() * max) + 1;
        }
    } else {
        // any not played answer will do
        while (words[answernum].gcategory != gcat || words[answernum].wordplayed == 1) {
            answernum = Math.floor(Math.random() * max) + 1;
        }

    }
    console.log("* Answernum: " + answernum);
    console.log("** Answer: " + words[answernum].gameword);
    mainclue.innerHTML = "Category : " + words[answernum].gcategory + "&nbsp;-&nbsp;Level : " + level;

    //
    // good word mark as played
    //
    words[answernum].wordplayed = 1;
    answer = words[answernum].gameword;
    gleft.innerHTML = "Guess the word! Pick a letter, seal your fate... Guesses left : " + guessesleft;
    wlength = answer.length;
    for (i = 0; i < wlength; i++) {
        //
        // n for not correctly guessed - c is correct / spaces are free cs
        // String(value).charAt(0)
        //
        // console.log("The character at position " + i + " is " + answer.charAt(i));
        if (answer.charAt(i) == " ") {
            pguess[i] = "c";
            // console.log("Space found in answer");
        } else {
            pguess[i] = "n";
        }
    }

}

//
// Show the player the guessing tiles
//
function showguess() {
    console.log("Showing guess");
    var i;
    // get length of answer - loop through it and show _ or space or answer
    var wlength = answer.length;
    // make sure we are actually showing the guess row. :P
    guess.style.visibility = "visible";
    // clear it
    inguesstext.innerHTML = "";
    guess.innerHTML = "";
    for (i = 0; i < wlength; i++) {
        if (pguess[i] == "c") {
            guess.innerHTML = guess.innerHTML + answer.charAt(i);
        }
        // damn space
        else if (answer.charAt(i) == " ") {
            guess.innerHTML = guess.innerHTML + "&nbsp;";
            console.log("Adding a space found in guess");
            // show a empty tile
        } else {
            guess.innerHTML = guess.innerHTML + "_";
        }
    }
}

/*
Player has guessed a letter
*/
function madeguess(x) {
    var i, max, valid = 1,
        temp = 0;
    var wlength = answer.length;
    /*
    valid is to check if a letter guessed is valid or not - 1 is valid 0 is not
    if invalid - not a guess and don't add to the array
    check for repeated guess
    update guesses
    */
    console.log("The player has guessed the letter: " + x);
    /*
    check if letter is within word, if so update slots, check for win
    if letter is not in word, chances -1, update image, check for end game
    add letter to guessed list/check if it is there first
    verifying the guess
    */
    max = iguess.length;
    // is the guess already in there?
    for (i = 0; i <= max; i++) {
        if (x == iguess[i]) {
            valid = 0;
        }
    }
    //
    // ok, new guess!
    //
    if (valid == 1) {
        //
        // can we somehow access the letter dynamically?
        // apparently: window['variableName' + variableDynamic] = 'your value';
        //
        window['my' + x].style.visibility = "hidden";
        iguess.push(x);
    }
    // moviescat.push(new word("the godfather", "Movies", "0"));
    for (i = 0; i < wlength; i++) {
        if (x == answer.charAt(i)) {
            pguess[i] = "c";
            temp = 1;
            // check for a winner!
            winner();
        }
    }
    // picked INcorrect letter burn a guess
    if (temp == 0) {
        guessesleft--;
        console.log("guesses left : " + guessesleft);
        path = "img/flower" + guessesleft + ".png";
        console.log("the new image path is : " + path);
        hangflower.src = path;
        // game over man!
        if (guessesleft <= 0) {
            gamestate = "dead";
            console.log("GAMESTATE - DEAD");
            dead();
        }

    }
    gleft.innerHTML = "Guess the word! Pick a letter, seal your fate... Guesses left : " + guessesleft;
    // update screen
    showguess();

}
/* 
CONTINUE FROM SAVE
*/
function contfromsave() {
    console.log("Continuing from the saved data!");
    playersettings = JSON.parse(localStorage.getItem("hangman"));
    level = playersettings.slevel;
    gcat = playersettings.scategory;
    cont.style.visibility = "hidden";
    // ok fire it up!
    console.log("Continue data found: Level: " + level + " Category: " + gcat);
    gamescreen();
}

/*
LOAD GAME
*/
function loadgame() {
    console.log("Loading saved data!");
    if ("hangman" in localStorage) {
        // yes! so load it 
        //level = localStorage.getItem("level");
        //gcat = localStorage.getItem("category");
        playersettings = JSON.parse(localStorage.getItem("hangman"));
        console.log("Save data found!");
        level = playersettings.slevel;
        gcat = playersettings.scategory;
    } else {
        // no, use default
        console.log("-NO- save data found!");
    }
    // set playersettings
    playersettings = {
        'slevel': level,
        'scategory': gcat
    };

}
/*
SAVE GAME
*/
function savegame() {
    //
    // auto save every second?
    //
    console.log("Saving game data.");
    playersettings.slevel = level; // level 1
    playersettings.scategory = gcat; // movies
    localStorage.setItem("hangman", JSON.stringify(playersettings));
    console.log("Saved the following data: Level: " + level + " Category: " + gcat);

}

/*
COUNTDOWN TIMER
*/
function timesup() {
    var temp;
    if (gamestate == "running") {
        gametime--;
    }
    // red colour
    if (gametime <= 15) {
        timertext.style.color = "#f90101";
        // console.log("Timer SHOULD be red: " + gametime);
    } else {
        timertext.style.color = "#000000";
    }
    // out of time?
    if (gametime <= 0 && gamestate == "running") {
        dead();
        gametime = 0;
    }
    // update console WITHOUT a new line
    // process.stdout.write(".");
    /*
    Blinking Play again - just because
    */
    temp = getColour();
    // console.log("I got colour! " + temp);
    if (blink == 1) {
        playagainbtn.style.opacity = "0.5";
        playagainbtn.style.backgroundColor = "" + temp;
        blink = 0;
    } else {
        playagainbtn.style.opacity = "1.0";
        playagainbtn.style.color = "" + temp;
        blink = 1;
    }
    // update timer
    timertext.innerHTML = gametime;
}


/*
RESET LETTERS
*/
function resetletters() {
    // character codes for a-z are 97 to 122
    var i, myletter;
    console.log("showing letters");
    for (i = 97; i <= 122; i++) {
        myletter = String.fromCharCode(i);
        window['my' + myletter].style.visibility = "visible";
    }
}

function hideletters() {
    console.log("hiding letters");
    // character codes for a-z are 97 to 122
    var i, myletter;
    for (i = 97; i <= 122; i++) {
        myletter = String.fromCharCode(i);
        window['my' + myletter].style.visibility = "hidden";
    }
}


/*
CHECK FOR WINNER!
*/
function winner() {
    var max = pguess.length;
    var i, temp = 1;
    // are all the letters now set to c?
    for (i = 0; i < max; i++) {
        if (pguess[i] == "c") {
            // do nothing
        } else {
            temp = 0;
            console.log("Keep Guessing!");
        }
    }
    // preempt for end game win
    if (temp == 1 && level >= 5) {
        gamestate = "endgame";
        console.log("GAMESTATE - ENDGAME");
        gloriousvictory();
    }

    // if temp is 0 - word not solved - if temp is 1 sweet glorious victory!
    if (temp == 1) {
        gamestate = "nextlevel";
        console.log("GAMESTATE - NEXTLEVEL");
        console.log("WINNER!");
        hideletters();
        // stop the clock 
        gametime = 0;
        mainclue.innerHTML = "C O R R E C T !";
        winimage.style.visibility = "visible";
        hangflower.style.visibility = "hidden";
        //sletter.style.visibility = "hidden";
        console.log("Should be showing winning flower?");
    }
}

/*
START A NEW GAME
*/
function replay() {
    console.log("Replay game?");
    level = 0;
    // select new category?
    newlevel();
}

/*
GAMEOVER - weeeeeeeeird - function named "gameover" was causing an error
Discovered later it was a defined variable. *cough*
*/
function dead() {
    gametime = 0;
    console.log("GAME OVER!!!!!!");
    // always skull on gameover
    hangflower.src = "img/flower0.png";
    hideletters();
    mainclue.innerHTML = "G A M E  O V E R!";
    // stop the clock
    // timertext.style.visibility = "hidden";
    // clearInterval(gameclock);
    playagainbtn.style.visibility = "visible";
    playagainbtn.style.height = "auto";
    playagainbtn.style.width = "auto";
    // wipe the save
    localStorage.removeItem("hangman");
    winimage.style.visibility = "hidden";
}

/*
NEW LEVEL
*/
function newlevel() {
    // reset level variables and hidden/visible objects
    console.log("Advanced to next level!");
    //sletter.style.visibility = "visible";
    playagainbtn.style.visibility = "hidden";
    level++;
    // check for glorious victory!
    if (level > 6 && gametype == "normal") {
        console.log("inside if >6 final win");
        gloriousvictory();
    }
    iguess.length = 0;
    winimage.style.visibility = "hidden";
    hangflower.style.visibility = "visible";
    hangflower.src = "img/flower10.png";
    playagainbtn.style.visibility = "hidden";
    guessesleft = 10;
    gametime = 90;
    // do this last
    savegame();
    // allow to pick new category????????????
    gamescreen();

}

/*
  Random toggle
  */
function rnd() {
    //off
    if (rndtrack == 0) {
        rndlink.innerHTML = "Random OFF";
        rndtrack = 1;
        rndlink.style.opacity = "1.0";
        rndlink.src = "img/rnd.svg";
        rndlink.style.width = "24px";
    } else {
        rndlink.innerHTML = "Random ON";
        rndtrack = 0;
        rndlink.style.opacity = "0.5";
        rndlink.src = "img/nornd.svg";
        rndlink.style.width = "24px";
    }
}
/*
Play next track
*/
function next() {
    var x, pick;
    p.pause();
    playerstate = "paused";
    x = music.length;
    // reset time
    p.currentTime = 0.00;
    // rnd on?
    if (rndtrack == 1) {
        pick = Math.floor(Math.random() * x);
        currenttrack = pick;
    } else {
        currenttrack++;
    }
    if (currenttrack > x - 1) {
        currenttrack = 0;
    }
    updatetrack();
    playaudio();
}
/*
Play and pause tracks
*/

function playaudio() {

    console.log("Current track : " + currenttrack);
    if (playerstate == "paused" || playerstate == "stopped") {
        p.src = music[currenttrack].songpath;
        playlink.src = "img/pause.svg";
        playlink.style.width = "24px";
        p.currentTime = playback;
        p.play();
        // advance track when it ends for continuous play because awesome
        p.onended = function () {
            next();
        };
        updatetrack();
        playerstate = "playing";
        playlink.innerHTML = "PAUSE";
    } else {

        playlink.src = "img/play.svg";
        playlink.style.width = "24px";
        p.pause();
        playback = p.currentTime;
        console.log("Pausing track");
        playerstate = "paused";
        playlink.innerHTML = "PLAY";
    }

}
/*
Display track info
*/
function updatetrack() {
    var x;
    x = music.length;
    console.log("Now playing :" + music[currenttrack].songtitle);
    audiotext.innerHTML = "Track " + currenttrack + " of " + x + "<br>" + music[currenttrack].songtitle;
}
/*
Final Victory
*/
function gloriousvictory() {
    console.log("glorious victory!");
    hideletters();
    gametime = 0;
    // kill save
    localStorage.removeItem("hangman");
    viclink.style.visibility = "visible";
    viclink.style.width = "auto";
    viclink.style.height = "auto";
    guess.innerHTML = "";
    gleft.innerHTML = "WOO!! YOU HAVE WON THE GAME!";
    // clearInterval(gameclock);
    winimage.style.visibility = "hidden";
    hangflower.style.visibility = "hidden";
    //sletter.style.visibility = "hidden";
}
/*
Load JSON questions datafile
*/
function loadJSON(filename) {
    //this is use to specify the connection to the webAPI
    var temp;
    temp = filename + ".json";
    console.log("Looking for JSON file: " + temp);
    xhr.open("GET", temp);
    console.log(xhr.readyState);

    /*
    0 (uninitialized) or (request not initialized)     1 (loading) or (server connection established)
    2 (loaded) or (request received)    3 (interactive) or (processing request)
    4 (complete) or (request finished and response is ready)
    */

    xhr.addEventListener("readystatechange", prepareOutput);
    // this is use to send the request to the API Server
    xhr.send();
}
/*
wait for JSON data to be ready
*/
function prepareOutput() {
    var output, i, max, t;
    t = xhr.readyState;
    console.log("STATE IS :" + t);
    // console.log("Preparing Output for: " + filename);
    if (xhr.readyState == 4) {
        console.log("State 4.");
        output = JSON.parse(xhr.responseText);
        max = output.hangmanwords.length;
        console.log("Past Output...Words found: " + max);
        for (i = 0; i <= max - 1; i++) {
            words.push(new word(output.hangmanwords[i].gameword, output.hangmanwords[i].gcategory, "0"));
        }

    }
}
/*
RANDOM COLOUR!
*/
function getColour() {
    var c1, i, x;
    c1 = "#";
    // get six hex codes to make colour
    for (i = 0; i < 6; i++) {
        x = Math.floor((Math.random() * 16));
        x = x.toString(16);
        c1 = c1 + x;
    }
    return c1;
}
/*
fire this off before game starts --- may not be required...this should only be run once
*/
function init() {
    gamestate = "running";
    console.log("GAMESTATE - RUNNING");
    detectsave();
    loadJSON("hangman");

}

// start the clock... it can be manipulated later to fix time
var gameclock = setInterval(timesup, 1000);
init();
