var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

const video = document.querySelector("video"),
    img = document.querySelector("img");

var imageCapture;

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[ 0 ];
            imageCapture = new ImageCapture(track);
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
        document.getElementById('previnv').style.display = "none";
}

function capture() {
    imageCapture.takePhoto()
        .then(blob => {
            img.src = URL.createObjectURL(blob);
            img.onload = () => { URL.revokeObjectURL(this.src); };
        })
        .catch(error => console.error('takePhoto() error:', error));
        document.getElementById("cap").disabled = true;
        document.getElementById('capinv').style.display = "none";
        document.getElementById('previnv').style.display = "block";
        document.getElementById('sub').style.display = "block";
}
window.addEventListener("load", cameraStart, false);

// Just For Camera module



