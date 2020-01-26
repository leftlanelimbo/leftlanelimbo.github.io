function main() {
  //:::::: three scene 
  loaded();
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
  renderer.autoClearColor = false;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = 4;
  cube.position.z = -20;
  scene.add(cube);
  
  const cube2 = new THREE.Mesh(geometry, material);
  cube2.position.x = -4;
  cube2.position.z = -20;
  scene.add(cube2);
  var audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  var oceanAmbientSound = new THREE.PositionalAudio(audioListener);
  var oceanAmbientSound2 = new THREE.PositionalAudio(audioListener);

  //load audio callback
  function playSound(){
    // instantiate a listener
    // var audioListener = new THREE.AudioListener();

    // add the listener to the camera
    // camera.add(audioListener);

    //cube 1
    // instantiate audio object
    // var oceanAmbientSound = new THREE.PositionalAudio(audioListener);

    // add the audio object to the scene
    cube.add(oceanAmbientSound);

    // instantiate a loader
    var loader = new THREE.AudioLoader();

    // load a resource
    loader.load(
      // resource URL
      'bloomRf.mp3',

      // onLoad callback
      function (audioBuffer) {
        // set the audio object buffer to the loaded object
        oceanAmbientSound.setBuffer(audioBuffer);
        oceanAmbientSound.setRefDistance(25);
        // play the audio
        // oceanAmbientSound.play();
      },
      
      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      // onError callback
      function (err) {
        console.log('An error happened');
      }
    );

    //cube 2
    // instantiate audio object
    // var oceanAmbientSound2 = new THREE.PositionalAudio(audioListener);

    // add the audio object to the scene
    cube2.add(oceanAmbientSound2);
    
    // instantiate a loader
    var loader = new THREE.AudioLoader();

    // load a resource
    loader.load(
      // resource URL
      'bloomLf.mp3',

      // onLoad callback
      function (audioBuffer) {
        // set the audio object buffer to the loaded object
        oceanAmbientSound2.setBuffer(audioBuffer);
        oceanAmbientSound2.setRefDistance(25);
        // play the audio
        // oceanAmbientSound2.play();
        fullAudioLoad();
      },
      
      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      
      // onError callback
      function (err) {
        console.log('An error happened');
      }
      );
      // oceanAmbientSound.play();
      // oceanAmbientSound2.play();
      
  }

  function fullAudioLoad(){
    oceanAmbientSound.play();
    oceanAmbientSound2.play();

  }


  camera.position.z = 5;

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;  // convert to seconds

    resizeRendererToDisplaySize(renderer);

    const canvas = renderer.domElement;
    // uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    // uniforms.iTime.value = time;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
    // cube.position.x += 0.01;


    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  //:::::: end three scene 

  //:::::: device motion
  
  //initialize smoothing variables
  let sX = 0.0;
  let sY = 0.0;
  let sZ = 0.0;
  let sB = 0.0; // need to intialize to value you want it to start close to 
  let sA = 0.0;
  
  let sB_last = 0.0;
  let dB = 0.0;

  let smoothing_factor = 0.9;

  function handleMotionEvent(event) {
    // t = event.acceleration;
    // console.log(t);
    x = event.accelerationIncludingGravity.x; //left-right tilt (0@ table plane)
    y = event.accelerationIncludingGravity.y; //front-back tilt (0@ table plane)
    z = event.accelerationIncludingGravity.z; //compliement to y (0 @ wall plane)

    a = event.rotationRate.alpha; //front-back accel (on table plane)
    b = event.rotationRate.beta; //left-right accel (on table plane)
    // g = event.rotationRate.gamma; //left-right accel (on wall plane)


    sX = x + smoothing_factor * (sX - x);
    // console.log(sX.toFixed(2));
    sY = y + smoothing_factor * (sY - y);
    sZ = z + smoothing_factor * (sZ - z);
    // console.log(sY.toFixed(2));

    sB = b + smoothing_factor * (sB - b);
    sA = a + smoothing_factor * (sA - a);
    // console.log(sX,sY,sB,sA);

    //attempt to do derivative outside of shader # should probably move the jerk calculation to here
    dB = sB - sB_last;
    sB_last = sB;
    // console.log(dB.toFixed(2));
    cube.position.x += (-sX*.2);
    cube2.position.x -= (-sX*.2);

    // cube.position.x += (-sZ*.2);
    // cube2.position.x -= (-sZ*.2);



  }

  //on load change colors of overlay, and add eventlisteners for devicemotion callbacks
  function loaded() {
    document.getElementById("startButton").innerText = 'E N T E R';
    document.getElementById("overlay").style.backgroundColor = '#111111';
    document.getElementById("startButton").style.background = '#ffffff';
    document.getElementById("startButton").style.color = '#000000';
    document.getElementById("startButton").addEventListener("click", onClickDeviceMotion);
    document.getElementById("startButton").addEventListener("click", removeOverlay);
    // window.addEventListener('touchstart', playSound);
    document.getElementById("startButton").addEventListener("click", playSound);
  }

  function removeOverlay() {
    var overlay = document.getElementById('overlay');
    var hide = function () {
      window.setTimeout(function () {
        overlay.style.opacity = '0';
      }, 1.5);
      window.setTimeout(function () {
        overlay.remove();
      }, 450);
    };

    hide();
  }

  //request device motion and call handlers
  //https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
  function onClickDeviceMotion() {
    // feature detect
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
      console.log(console.error);
    }
  }


  // document.getElementById('motion').addEventListener("click", onClickDeviceMotion);
  // window.addEventListener('load', loaded);

}

window.addEventListener('load', main);
// main();
