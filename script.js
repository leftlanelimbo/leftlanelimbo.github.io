function main() {
  //:::::: three scene 
  let cameraY = 0.0;
  let cameraSY = 0.0;
  let cameraSmoothingFactor = 0.93;
  loaded();
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
  renderer.autoClearColor = false;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();

  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  var planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
  var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0, specular: 0x666666 });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.z = -30;
  scene.add(plane);

  // var light = new THREE.PointLight({color:0x00ff00, intensity:0.2, distance:0, decay:1.0});
  var light = new THREE.PointLight(0x226666, 1, 20, 10);
  light.position.set(-10, 0, -29);
  light.intensity = 1;
  scene.add(light);

  var light2 = new THREE.PointLight(0x446644, 1, 20, 10);
  light2.position.set(10, 0, -29);
  light2.intensity = 1;
  scene.add(light2);

  var analyser1, analyser2

  //load audio callback
  function playSound(){

    function loadSounds(){
      // instantiate a listener
      var audioListener = new THREE.AudioListener();
      // add the listener to the camera
      camera.add(audioListener);
      loadSound1();
      // loadSound2();

      function loadSound1(){
        // instantiate audio object
        var oceanAmbientSound = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light.add(oceanAmbientSound);

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
            oceanAmbientSound.setRefDistance(20);
            // oceanAmbientSound.setVolume(0.7);
            loadSound2(oceanAmbientSound);
            // play the audio
            // oceanAmbientSound.play();
            // return oceanAmbientSound;

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


      }
      function loadSound2(oceanAmbientSound){
        //cube 2
        // instantiate audio object
        var oceanAmbientSound2 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light2.add(oceanAmbientSound2);

        // instantiate a loader
        var loader2 = new THREE.AudioLoader();

        // load a resource
        loader2.load(
          // resource URL
          'bloomLf.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound2.setBuffer(audioBuffer);
            oceanAmbientSound2.setRefDistance(20);
            // oceanAmbientSound2.setVolume(0.7);
            // play the audio
            // oceanAmbientSound2.play();
            // playAll();
            analyser1 = new THREE.AudioAnalyser(oceanAmbientSound, 32);
            analyser2 = new THREE.AudioAnalyser(oceanAmbientSound2, 32);
            oceanAmbientSound.play();
            oceanAmbientSound2.play();
             
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


      }
      // function playAll() {
      //   oceanAmbientSound.play();
      //   oceanAmbientSound2.play();

      // }




    }
    loadSounds();
      
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
    
    cameraSY = cameraY + cameraSmoothingFactor * (cameraSY - cameraY);
    // camera.rotation.y = -sX;
    camera.rotation.y = cameraSY;

    
    try {
      // console.log(analysers);
      light.intensity = Math.pow((analyser1.getAverageFrequency() / 2000) + 1, 80);
      light2.intensity = Math.pow((analyser2.getAverageFrequency() / 2000) + 1, 80);
    } catch (err) {
      // console.log('nada');
    }



    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  //:::::: end three scene 

  //:::::: device motion
  
  //initialize smoothing variables
  let sX = 0.0;
  let sY = 0.0;
  let sB = 0.0; // need to intialize to value you want it to start close to 
  let sA = 0.0;
  
  let sB_last = 0.0;
  let dB = 0.0;

  let smoothing_factor = 0.93;

  function handleMotionEvent(event) {
    // t = event.acceleration;
    // console.log(t);
    x = event.accelerationIncludingGravity.x; //left-right tilt (0@ table plane)
    y = event.accelerationIncludingGravity.y; //front-back tilt (0@ table plane)
    // z = event.accelerationIncludingGravity.z; //compliement to y (0 @ wall plane)

    a = event.rotationRate.alpha; //front-back accel (on table plane)
    b = event.rotationRate.beta; //left-right accel (on table plane)
    // g = event.rotationRate.gamma; //left-right accel (on wall plane)


    sX = x + smoothing_factor * (sX - x);
    // console.log(sX.toFixed(2));
    sY = y + smoothing_factor * (sY - y);

    sA = a + smoothing_factor * (sA - a);
    sB = b + smoothing_factor * (sB - b);
    // console.log(sX,sY,sB,sA);

    //attempt to do derivative outside of shader # should probably move the jerk calculation to here
    dB = sB - sB_last;
    sB_last = sB;
    // console.log(dB.toFixed(2));
    // cube.position.x += (-sX*.1);
    // cube2.position.x -= (-sX*.1);

    // cube.position.x += (-sB*.01);
    // cube2.position.x -= (-sB*.01);

    // cube.position.y += (sA*.01);
    // cube2.position.y -= (sA*.01);

    // light.position.x += (-sB * .01);
    // light2.position.x -= (-sB * .01);

    // light.position.y += (sA * .01);
    // light2.position.y -= (sA * .01);
    
    // camera.rotation.y = -sX;
    cameraY = -sX*0.8;



  }

  //on load change colors of overlay, and add eventlisteners for devicemotion callbacks
  function loaded() {
    document.getElementById("startButton").innerText = 'E N T E R';
    document.getElementById("overlay").style.backgroundColor = '#111111';
    document.getElementById("startButton").style.background = '#ffffff';
    document.getElementById("startButton").style.color = '#000000';
    document.getElementById("startButton").addEventListener("click", onClickDeviceMotion);
    document.getElementById("startButton").addEventListener("click", removeOverlay);
    document.getElementById("startButton").addEventListener("click", fullscreen);
    document.getElementById("startButton").addEventListener("click", playSound);
  }

  function fullscreen() {
    var el = document.getElementById('c');

    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
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
