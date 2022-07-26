const rozmiar = 15;
const canv = 800
var lastKierunek;

var c = document.getElementById("pole");
var ctx = c.getContext("2d");
function ramka() {
    ctx.beginPath();
    ctx.moveTo(1, 1);

    ctx.lineTo(canv-1, 1);
    ctx.lineTo(canv-1, canv-1);
    ctx.lineTo(1, canv-1);
    ctx.lineTo(1, 1);
    ctx.stroke();
};

function drawHeart(fromx, fromy, tox, toy,lw,hlen,color) {

    var x = fromx;
    var y = fromy;
    var width = lw ;
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
    drawHeart(50 * x + 25, 50 * y +5 ,40,40, 40, 40,ctx.color);
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
    kwadrat(jablkox,jablkoy);

    ctx.fillStyle = "rgba(0,0,0)";
    if (przegrane){
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
    
}

function jest(){
    let w = false;
    for (i=0;i<sznejk.length;i++){
        if (sznejk[i][0] == jablkox && sznejk[i][1] == jablkoy){
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
    if (nowy[0] == jablkox && nowy[1] == jablkoy){
        długość+=1;
        document.getElementById("wynik").textContent = długość-4;
        if (długość == (rozmiar+1)*(rozmiar+1)){
            alert("Wygrałeś");
        }
        while ( jest()){
            jablkox = Math.floor(Math.random() * rozmiar);
            jablkoy = Math.floor(Math.random() * rozmiar);
        }
    }
}
addEventListener("keydown", e => {
    if (e.code == "ArrowRight" && lastKierunek != 3) {
        kierunek = 1;
    };
    if (e.code == "ArrowDown" && lastKierunek != 4) {
        kierunek = 2;
    };
    if (e.code == "ArrowLeft" && lastKierunek != 1) {
        kierunek = 3;
    };
    if (e.code == "ArrowUp" && lastKierunek != 2) {
        kierunek = 4;
    };
});

setInterval(function () {
    if (!przegrane) {
        tick();
        rysuj();
    } else {
        
        rysuj();
        ctx.font = "50px Arial";
    ctx.fillText("Przejebałeś! Gówno!", 350, 300);
    }
}, 60)

