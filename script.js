const rozmiar = 15;
const canv = 800
var lastKierunek;

document.getElementById("imie").style.visibility = 'hidden';
document.getElementById("send").style.visibility = 'hidden';


var c = document.getElementById("pole");
var ctx = c.getContext("2d");
function ramka() {
    ctx.beginPath();
    ctx.moveTo(1, 1);

    ctx.lineTo(canv - 1, 1);
    ctx.lineTo(canv - 1, canv - 1);
    ctx.lineTo(1, canv - 1);
    ctx.lineTo(1, 1);
    ctx.stroke();
};

function drawHeart(fromx, fromy, tox, toy, lw, hlen, color) {

    var x = fromx;
    var y = fromy;
    var width = lw;
    var height = hlen;

    ctx.save();
    ctx.beginPath();
    var topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x, y,
        x - width / 2, y,
        x - width / 2, y + topCurveHeight
    );

    // bottom left curve
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2,
        x, y + (height + topCurveHeight) / 2,
        x, y + height
    );

    // bottom right curve
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2,
        x + width / 2, y + (height + topCurveHeight) / 2,
        x + width / 2, y + topCurveHeight
    );

    // top right curve
    ctx.bezierCurveTo(
        x + width / 2, y,
        x, y,
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

}
function kwadrat(x, y) {
    drawHeart(50 * x + 25, 50 * y + 5, 40, 40, 40, 40, ctx.color);
}

var kierunek = 1;

var sznejk = [];
sznejk.push([2, 2]);
var długość = 4;
var przegrane = false;

var jablkox = 4;
var jablkoy = 4;

function rysuj() {
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillStyle = "rgba(0,250,0)";
    kwadrat(jablkox, jablkoy);

    ctx.fillStyle = "rgba(0,0,0)";
    if (przegrane) {
        ctx.fillStyle = "rgba(255,0,0)";
    }
    ramka();
    sznejk.forEach(element => {
        //console.log(element);
        kwadrat(element[0], element[1]);
    });


}


function przejebałeś() {
    przegrane = true;
    document.getElementById("imie").style.visibility = '';
document.getElementById("send").style.visibility = '';

}

function jest() {
    let w = false;
    for (i = 0; i < sznejk.length; i++) {
        if (sznejk[i][0] == jablkox && sznejk[i][1] == jablkoy) {
            w = true;
        }
    }
    return w;
}

function tick() {
    var łep = sznejk[sznejk.length - 1];
    var nowy;
    switch (kierunek) {
        case 1:
            nowy = [łep[0] + 1, łep[1]];
            break;

        case 2:
            nowy = [łep[0], łep[1] + 1];
            break;
        case 3:
            nowy = [łep[0] - 1, łep[1]];
            break;
        case 4:
            nowy = [łep[0], łep[1] - 1];
            break;
        default:
            break;
    }
    lastKierunek = kierunek;
    if (nowy[0] < 0 || nowy[0] > rozmiar || nowy[1] < 0 || nowy[1] > rozmiar) {
        przejebałeś();
    };

    sznejk.forEach(segment => {

        if (nowy[0] == segment[0] && nowy[1] == segment[1] && !przegrane) {
            przejebałeś();
        }
    });
    if (!przegrane) {
        sznejk.push(nowy);
    }
    if (sznejk.length - 1 >= długość) {
        sznejk = sznejk.reverse();
        sznejk.pop();
        sznejk.reverse();
    };
    if (nowy[0] == jablkox && nowy[1] == jablkoy) {
        długość += 1;
        document.getElementById("wynik").textContent = długość - 4;
        if (długość == (rozmiar + 1) * (rozmiar + 1)) {
            alert("Wygrałeś");
        }
        while (jest()) {
            jablkox = Math.floor(Math.random() * rozmiar);
            jablkoy = Math.floor(Math.random() * rozmiar);
        }
    }
}
var graneJest = false;
addEventListener("keydown", e => {
    graneJest = true;
    if ((e.code == "ArrowRight" || e.code == "KeyD") && lastKierunek != 3) {
        kierunek = 1;
    };
    if ((e.code == "ArrowDown" || e.code == "KeyS") && lastKierunek != 4) {
        kierunek = 2;
    };
    if ((e.code == "ArrowLeft" || e.code == "KeyA") && lastKierunek != 1) {
        kierunek = 3;
    };
    if ((e.code == "ArrowUp" || e.code == "KeyW") && lastKierunek != 2) {
        kierunek = 4;
    };
});


// ol element containing high scores
const List=document.getElementById("lista");
// game submition form
const myform=document.getElementById("myform");
// element displaying error messages
const Errors=document.getElementById("error");

// Function to Reset Score and High Score List
function resetForm (){
	 // delete li elements holding high score data
	 while (List.hasChildNodes()){
		 List.removeChild(List.firstChild);
	}
	 // fetch scores.json and create new li elements holding the data
	 get_scores(list_scores);
	 // set score back to 0
	 document.getElementById("score").value=0;
	 score=0;
}

// code to execute when
myform.addEventListener("submit", function (event){// listen for the submit button to be clicked
	 event.preventDefault(); // don't reload page
	 var tenth_score=document.getElementById("lowscore").value; // lowest high score
	 var this_score=document.getElementById("wynik").value; // player's current score

	 if (this_score > tenth_score){// if the player's current score > the lowest high score
		 document.getElementById("message").src="images/highscore.gif"; // change to highscore gif
		 document.getElementById("message").alt="You made it on the highscore list!!!"; // high score gif alt
	}
	 else{// if the player did not make it on the highscore list
		 document.getElementById("message").src="images/good-luck.gif"; // change to starting good luck gif
		 document.getElementById("message").alt="Good luck chump!"; // good luck alt text
	}
	 //Form Data Object (to send to PHP): contains the players name and score
	 var formData=new FormData(this);
	 formData.append("score", score);

	 // fetch request
	 fetch ("cos.php",{// sending to dice.php
		 method: "post", // using method post
		 body: formData // we are sending formData
	})
		 .then (function (response){
			 return response.text(); // Get the text contents
		})
		 .then(function(text){
			 resetForm(); // execute resetForm function
			 console.log(text); // print the text contents to console
		})
		 .catch(function (err){// If there is an error
			 Errors.innerHTML=err; // display error in errors element
		})
});

// Function to get the high score JSON
function get_scores (callback){
	 let file="./scores.json";// file location
	 fetch(file,{cache: "no-cache"}) // fetch
		 // If the response isn OK
 		 .then(function(response){
 			 if (response.status !==200){
 				 Errors.innerHTML=response.status;
 			}
 		 // If the response is OK
 		 response.json().then(function(data){
 			 let scores=JSON.stringify(data);
 			 console.log(data);
 			 callback (scores);
 		})
 	})
 	// If there is an error
 	.catch(function(err){
 		 Errors.innerHTML=err;
 	});
}

//Function to display high score list
 var list_scores=function (scores){
 	 let object=JSON.parse(scores);
 	 let lowest_score=object[9].score;
 	 document.getElementById("lowscore").value=lowest_score;
 	 for (let i=0; i<object.length; i++){
 		 let li=document.createElement("LI");
 		 let text=document.createTextNode(object[i].name + " ... " + object[i].score);
 		 li.appendChild(text);
 		 List.appendChild(li);
		 if (i===0){
			 li.setAttribute("class","top1");
		}
		 if (i===1){
			 li.setAttribute("class","top2");
		}
		 if (i===2){
					 li.setAttribute("class","top3");
		}
 	}
}

setInterval(function () {
    if (graneJest) {
        if (!przegrane) {
            tick();
            rysuj();
        } else {

            rysuj();
            ctx.font = "50px Arial";
            ctx.fillText("Przejebałeś! Gówno!", 350, 300);
        }
    }else {
        rysuj();
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.font = "30px Arial";
        ctx.fillText("Dowolny klawisz by grać", 350, 300);
    }
}, 60)

