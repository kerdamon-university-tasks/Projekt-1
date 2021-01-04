let calculationWorker = new Worker('calculations.js');

calculationWorker.addEventListener('message', function(e) {
    intensity.R = e.data.R;
    intensity.T = e.data.T;
    drawLaser();
    updateInfo();
}, false);

window.onload = function() {
    updateAbsoluteCoordinates();
    refresh();
    drawAxes();
}

function refresh(){
    updateFromSliderValues();
    updateRelativeCoordinates();
    calculationWorker.postMessage(params);
}

function updateFromSliderValues(){
    let angleDegrees = document.getElementById('angle-slider').value;
    params.angle = angleDegrees * Math.PI / 180;
    document.getElementById('angle-text').innerHTML = angleDegrees + "&#176";
    params.RefractionIndexUpper = document.getElementById('refract-upper-slider').value;
    params.RefractionIndexLower = document.getElementById('refract-lower-slider').value;
    document.getElementById('refract-upper-text').innerHTML = (params.RefractionIndexUpper / 100).toFixed(2);
    document.getElementById('refract-lower-text').innerHTML = (params.RefractionIndexLower / 100).toFixed(2);
}

function updateInfo() {
    document.getElementById('upper-intensity').innerHTML = (intensity.R * 100).toFixed(2) + " %";
    document.getElementById('lower-intensity').innerHTML = (intensity.T * 100).toFixed(2) + " %";
}

function updateRelativeCoordinates() {
    dimensions.emitter.x = - dimensions.emitterDistance * Math.sin(params.angle);
    dimensions.emitter.y = - dimensions.emitterDistance * Math.cos(params.angle);
}

function updateAbsoluteCoordinates(){
    dimensions.center.x = document.getElementById('drawing-area').getAttribute('width') / 2;
    dimensions.center.y = document.getElementById('drawing-area').getAttribute('height') / 2;
    dimensions.r = Math.sqrt(Math.pow(dimensions.center.x, 2) + Math.pow(dimensions.center.y, 2));
    dimensions.emitterDistance = dimensions.center.y * 3/4;
}