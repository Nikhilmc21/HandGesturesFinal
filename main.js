Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/h_8f6t6L5/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else{
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Peace")
        {
            document.getElementById('update_emoji').innerHTML = "✌️";
        }
        if(results[0].label == "Okay")
        {
            document.getElementById('update_emoji').innerHTML = "👌";
        }
        if(results[0].label == "Good")
        {
            document.getElementById('update_emoji').innerHTML = "👍";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The PREDICTION IS..." + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}