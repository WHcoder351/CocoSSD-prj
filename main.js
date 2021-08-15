
stats = "";
Ob = [];
function preload(){

}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.size(380,380);
    Video.hide();
    obd = ml5.objectDetector('cocossd', mL);
    document.getElementById("Stats").innerHTML = "Status = Detecting Objects";
}

function mL(){
    console.log("CoCoSSD model Loaded!");
    stats = true;
}

function gR(error, results){
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        Ob = results;
    }
}

function draw(){
    image(Video, 0,0,450,450);

    if (stats != "") {
        obd.detect(Video, gR);
        for(i = 0; i<Ob.length; i++){
            document.getElementById("Stats").innerHTML = "Status = Object detected";
            document.getElementById("OBDs").innerHTML = "# of Objects detected: "+Ob.length;
            percent = floor(Ob[i].confidence * 100);
            fill("blue");
        text(Ob[i].label + " " +percent + "%", Ob[i].x +15, Ob[i].y+15);
        noFill();
        stroke("green");
        rect(Ob[i].x, Ob[i].y, Ob[i].width, Ob[i].height);
        }
    }
}