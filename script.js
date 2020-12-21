const params = {
    angle: 45,
    RefractionIndexUpper: 100,
    RefractionIndexLower: 133
}

const dimensions = {
    center: {
        x: 0,
        y: 0
    },
    emitter: {
        x: 0,
        y: 0
    },
    emitterDistance: 0,
    r: 0
}

const intensity = {
    R: 1,
    T: 1
}

window.onload = function() {
    updateAbsoluteCoordinates();
    refresh();
    drawAxes();
    drawLaser();
}

function refresh(){
    updateFromSliderValues();
    updateRelativeCoordinates();
    drawLaser();
    updateInfo();
}

function updateFromSliderValues(){
    params.angle = document.getElementById('angle-slider').value;
    document.getElementById('angle-text').innerHTML = params.angle + "&#176";
    params.RefractionIndexUpper = document.getElementById('refract-upper-slider').value;
    params.RefractionIndexLower = document.getElementById('refract-lower-slider').value;
    document.getElementById('refract-upper-text').innerHTML = (params.RefractionIndexUpper / 100).toFixed(2);
    document.getElementById('refract-lower-text').innerHTML = (params.RefractionIndexLower / 100).toFixed(2);
}

function updateRelativeCoordinates() {
    params.angle = params.angle * Math.PI / 180;
    dimensions.emitter.x = - dimensions.emitterDistance * Math.sin(params.angle);
    dimensions.emitter.y = - dimensions.emitterDistance * Math.cos(params.angle);
}

function updateAbsoluteCoordinates(){
    dimensions.center.x = document.getElementById('drawing-area').getAttribute('width') / 2;
    dimensions.center.y = document.getElementById('drawing-area').getAttribute('height') / 2;
    dimensions.r = Math.sqrt(Math.pow(dimensions.center.x, 2) + Math.pow(dimensions.center.y, 2));
    dimensions.emitterDistance = dimensions.center.y * 3/4;
}

function updateInfo() {
    document.getElementById('info-upper-intensity').innerHTML = (intensity.R * 100).toFixed(2) + " %";
    document.getElementById('info-lower-intensity').innerHTML = (intensity.T * 100).toFixed(2) + " %";
}