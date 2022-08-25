speechData="";
previousResult=""
function setup() {
  canvas = createCanvas(350, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelReady);
}
function modelReady(){
  console.log("Model Ready")
}
function draw(){
  image(video,0,0,350,300);
  classifier.classify(video,gotResults);
}
function gotResults(error,results){
if (error){
  console.error(error);

}
else{
  
  console.log(results)
  if(results[0].confidence>0.5 && previousResult!=results[0].label){
    var synth=window.SpeechSynthesis;
    previousResult=results[0].label;
    document.getElementById("Object").innerHTML=results[0].label;
    document.getElementById("Accuracy").innerHTML=(results[0].confidence*100).toFixed(3)+"%";
    speechData="The item is "+results[0].label;
    var speakThis=new SpeechSynthesisUtterance(speechData);
    
    synth.speaK(speakThis)
  }
}
}




