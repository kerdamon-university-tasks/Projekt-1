this.addEventListener('message', function(e) {
    let parameters = e.data;

    let cosUpper = Math.cos(parameters.angle);
    let cosLower = Math.sqrt(1 - Math.pow((parameters.RefractionIndexUpper / parameters.RefractionIndexLower * Math.sin(parameters.angle)), 2));

    let nUpperTimesCosUpper = parameters.RefractionIndexUpper * cosUpper;
    let nLowerTimesCosLower = parameters.RefractionIndexLower * cosLower;
    let Rs = Math.pow((nUpperTimesCosUpper - nLowerTimesCosLower) / (nUpperTimesCosUpper + nLowerTimesCosLower), 2);

    let nUpperTimesCosLower = parameters.RefractionIndexUpper * cosLower;
    let nLowerTimesCosUpper = parameters.RefractionIndexLower * cosUpper;
    let Rp = Math.pow((nUpperTimesCosLower - nLowerTimesCosUpper) / (nUpperTimesCosLower + nLowerTimesCosUpper), 2);

    let r = 0.5 * (Rs + Rp);  //wypadkowy wspolczynnik odbicia materialu liczony z rownan Fresnela
    let t = 1 - r;  //wypadkowy wspolczynnik przepuszczania mocy

    result = {
        R: r,
        T: t
    }

    //mySleep();

    this.postMessage(result);
}, false);

function mySleep() {
    for (step = 0; step < 200000000; step++);
}