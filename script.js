
function handleMotionEvent(event) {
    // console.log('fired motion event')
//     acousticGuitar.play();
    let pan = (event.accelerationIncludingGravity.x * -0.2);
    let x = Math.abs(event.accelerationIncludingGravity.x * 30);
    let y = Math.abs(event.accelerationIncludingGravity.y * .15);
    // let z = Math.abs(event.accelerationIncludingGravity.z *.09);
    // let z = event.accelerationIncludingGravity.z.toFixed(2);

    x = x.toFixed(0)
    // y = y.toFixed(0)
    // z = z.toFixed(0)
    
    TweenMax.to('#text', 1, { color: `hsl(${x},100%,50%)`});
    TweenMax.to('#hed', 1, { opacity : `${y}`});
//     TweenMax.to(stereoPanner, 1, { pan : `${pan}`});
    TweenMax.to(pingPongDelay, 1, { mix : `${pan}`});

//     gsap.to('#text',{duration: 1,color: `hsl(${x},100%,50%)`});
//     gsap.to('#hed',{duration: 1,opacity : `${y}`});
//     gsap.to(stereoPanner, 1, { pan : `${pan}`});
    // stereoPanner.pan = pan;
    //el.style.background = `hsl(${x},100%,50%)`;
    // console.log(x, y, z)
    // if (x > 200) {
    //     el.innerHTML = 'Direction Change Works!!'
    // } else {
    //     el.innerHTML = 'Tween Max Includes'
    // }

}
// let el = document.getElementById('text');

// function handleLightEvent(event){
//     console.log('something happened')
//     console.log(event.value)
//     if 
//     el.style.background = `blue`;
// }
function onClick() {
    // feature detect
    Pizzicato.context.resume();
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleMotionEvent, true);
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
        window.addEventListener('devicemotion', handleMotionEvent, true);
        console.log('cry to your fruit overlords');
    }
  }// window.addEventListener('devicemotion', handleMotionEvent, true);
// window.addEventListener('devicelight', handleLightEvent);


var stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: 0.0
});
var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.7,
    time: 2.4,
    mix: 0.5
});
function playMusic(){
    Pizzicato.context.resume();
    var acousticGuitar = new Pizzicato.Sound('irene.mp3', function () {
    // Sound loaded!
//     acousticGuitar.addEffect(stereoPanner);
    acousticGuitar.addEffect(pingPongDelay);
    acousticGuitar.play();
});
    
}

document.getElementById("butt").addEventListener("click",onClick);
document.getElementById("butt").addEventListener("click",playMusic);
