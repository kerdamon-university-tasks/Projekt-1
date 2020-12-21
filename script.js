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
}

function updateFromSliderValues(){
    document.getElementById('angle-text').innerHTML = params.angle = document.getElementById('angle-slider').value;
    document.getElementById('refract-upper-text').innerHTML = params.RefractionIndexUpper = document.getElementById('refract-upper-slider').value;
    document.getElementById('refract-lower-text').innerHTML = params.RefractionIndexLower = document.getElementById('refract-lower-slider').value;
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