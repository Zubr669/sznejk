const rozmiar = 15;
const canv = 800


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
function kwadrat(x, y) {
    ctx.fillRect(50 * x + 5, 50 * y + 5, 40, 40);
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
    if (e.code == "ArrowRight" && kierunek != 3) {
        kierunek = 1;
    };
    if (e.code == "ArrowDown" && kierunek != 4) {
        kierunek = 2;
    };
    if (e.code == "ArrowLeft" && kierunek != 1) {
        kierunek = 3;
    };
    if (e.code == "ArrowUp" && kierunek != 2) {
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

