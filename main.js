status1 = "";
object = [] ;
function setup() {
canvas = createCanvas(380,380);
canvas.center();
video =createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded !");
    status1 = true ;
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results ;
    }
}

function preload() {
     song = loadSound("ringing_old_phone.mp3")
}

function draw() {
    image(video,0,0,380,380);
    if (status1 != "") {
        objectDetector.detect(video,gotResult) ;
        for (let i = 0; i < object.length; i++) {
            if (object[i].label == person) {
               document.getElementById("number_of_detected").innerHTML = "Baby found " ;
               song.play(); 
            }

            else{
                document.getElementById("number_of_detected").innerHTML = "Baby is not found " ;
               song.stop(); 
            }
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Object Detected" ;
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label + "" + percent + "%" , object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
