function drawAxes(){
    let drawingArea = document.getElementById('drawing-area');
    let w = drawingArea.getAttribute('width');
    let h = drawingArea.getAttribute('height');
    document.getElementById('drawing-area').innerHTML += `<line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="black"/>`;
    document.getElementById('drawing-area').innerHTML += `<line x1="${w/2}" y1="${h/2 - h/5}" x2="${w/2}" y2="${h/2 + h/5}" stroke="black" stroke-dasharray="4" />`;
}

function drawLaser() {
    drawInitialLaser();
    drawReflectedLaser();
    drawRefractedLaser();
    drawEmitter();
}

function drawEmitter() {
    removeElement('laser-head');
    document.getElementById('drawing-area').innerHTML += `<circle cx=${dimensions.center.x + dimensions.emitter.x} cy=${dimensions.center.y + dimensions.emitter.y} r=5 stroke="blue" fill="blue" id="laser-head" />`;
}

function drawInitialLaser() {
    removeElement('laser-line');
    document.getElementById('drawing-area').innerHTML += `<line x1="${dimensions.center.x + dimensions.emitter.x}" y1="${dimensions.center.y + dimensions.emitter.y}" x2="${dimensions.center.x}" y2="${dimensions.center.y}" stroke="red" id="laser-line" stroke-width="3" />`;
}

function drawReflectedLaser() {
    let x = dimensions.r * Math.sin(params.angle);
    let y = - dimensions.r * Math.cos(params.angle);
    
    removeElement('laser-line-reflected');
    removeElement('laser-line-reflected-dotted');
    document.getElementById('drawing-area').innerHTML += `<line x1="${dimensions.center.x}" y1="${dimensions.center.y}" x2="${dimensions.center.x + x}" y2="${dimensions.center.y + y}" stroke-opacity="${intensity.R}" stroke="red" id="laser-line-reflected" stroke-width="3" />`;
    if (intensity.R > 0.001)
    document.getElementById('drawing-area').innerHTML += `<line x1="${dimensions.center.x}" y1="${dimensions.center.y}" x2="${dimensions.center.x + x}" y2="${dimensions.center.y + y}" stroke="red" id="laser-line-reflected-dotted" stroke-width="2" stroke-dasharray="1 10" />`;
}

function drawRefractedLaser() {
    let x = dimensions.r * params.sinRefr;
    let y = dimensions.r * params.cosRefr;
    
    removeElement('laser-line-refracted');
    if( y > 0)
        document.getElementById('drawing-area').innerHTML += `<line x1="${dimensions.center.x}" y1="${dimensions.center.y}" x2="${dimensions.center.x + x}" y2="${dimensions.center.y + y}" stroke-opacity="${intensity.T}" stroke="red" id="laser-line-refracted" stroke-width="3" />`;
}