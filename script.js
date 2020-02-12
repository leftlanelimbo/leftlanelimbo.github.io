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
  // teal light color 0x226666
  // var light = new THREE.PointLight({color:0x00ff00, intensity:0.2, distance:0, decay:1.0});
  var light1 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light1.position.set(-10, -10, -29);
  // light1.intensity = 1;
  scene.add(light1);
  var light2 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light2.position.set(0, -10, -29);
  // light2.intensity = 1;
  scene.add(light2);

  var light3 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light3.position.set(10, -10, -29);
  // light3.intensity = 1;
  scene.add(light3);

  var light4 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light4.position.set(-10, 0, -29);
  // light4.intensity = 1;
  scene.add(light4);

  var light5 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light5.position.set(0, 0, -29);
  // light5.intensity = 1;
  scene.add(light5);

  var light6 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light6.position.set(10, 0, -29);
  // light6.intensity = 1;
  scene.add(light6);

  var light7 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light7.position.set(-10, 10, -29);
  // light7.intensity = 1;
  scene.add(light7);

  var light8 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light8.position.set(0, 10, -29);
  // light8.intensity = 1;
  scene.add(light8);

  var light9 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  light9.position.set(10, 10, -29);
  // light9.intensity = 1;
  scene.add(light9);



  var analyser1, analyser2, analyser3, analyser4, analyser5, analyser6, analyser7, analyser8, analyser9

  //load audio callback
  function playSound() {

    function loadSounds() {
      // instantiate a listener
      var audioListener = new THREE.AudioListener();
      // add the listener to the camera
      camera.add(audioListener);
      loadSound1();
      // loadSound2();

      function loadSound1() {
        // instantiate audio object
        var oceanAmbientSound1 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light1.add(oceanAmbientSound1);

        // instantiate a loader
        var loader1 = new THREE.AudioLoader();

        // load a resource
        loader1.load(
          // resource URL
          'AHHHS.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound1.setBuffer(audioBuffer);
            oceanAmbientSound1.setRefDistance(20);
            // oceanAmbientSound.setVolume(0.7);
            light1.intensity = 1;
            loadSound2(oceanAmbientSound1);
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
      function loadSound2(oceanAmbientSound1) {
        // instantiate audio object
        var oceanAmbientSound2 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light2.add(oceanAmbientSound2);

        // instantiate a loader
        var loader2 = new THREE.AudioLoader();

        // load a resource
        loader2.load(
          // resource URL
          'BACKGROUND.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound2.setBuffer(audioBuffer);
            oceanAmbientSound2.setRefDistance(20);
            // oceanAmbientSound2.setVolume(0.7);
            light2.intensity = 1;
            loadSound3(oceanAmbientSound1, oceanAmbientSound2);
            // play the audio
            // oceanAmbientSound2.play();
            // return oceanAmbientSound2;

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
      function loadSound3(oceanAmbientSound1, oceanAmbientSound2) {
        // instantiate audio object
        var oceanAmbientSound3 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light3.add(oceanAmbientSound3);

        // instantiate a loader
        var loader3 = new THREE.AudioLoader();

        // load a resource
        loader3.load(
          // resource URL
          'BASS.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound3.setBuffer(audioBuffer);
            oceanAmbientSound3.setRefDistance(20);
            // oceanAmbientSound3.setVolume(0.7);
            light3.intensity = 1;
            loadSound4(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3);
            // play the audio
            // oceanAmbientSound3.play();
            // return oceanAmbientSound3;

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
      function loadSound4(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3) {
        // instantiate audio object
        var oceanAmbientSound4 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light4.add(oceanAmbientSound4);

        // instantiate a loader
        var loader4 = new THREE.AudioLoader();

        // load a resource
        loader4.load(
          // resource URL
          'DRUMS.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound4.setBuffer(audioBuffer);
            oceanAmbientSound4.setRefDistance(20);
            // oceanAmbientSound4.setVolume(0.7);
            light4.intensity = 1;
            loadSound5(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4);
            // play the audio
            // oceanAmbientSound4.play();
            // return oceanAmbientSound4;

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
      function loadSound5(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4) {
        // instantiate audio object
        var oceanAmbientSound5 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light5.add(oceanAmbientSound5);

        // instantiate a loader
        var loader5 = new THREE.AudioLoader();

        // load a resource
        loader5.load(
          // resource URL
          'JUNO_SYNTH_MAIN.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound5.setBuffer(audioBuffer);
            oceanAmbientSound5.setRefDistance(20);
            // oceanAmbientSound5.setVolume(0.7);
            light5.intensity = 1;
            loadSound6(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5);
            // play the audio
            // oceanAmbientSound5.play();
            // return oceanAmbientSound5;

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
      function loadSound6(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5) {
        // instantiate audio object
        var oceanAmbientSound6 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light6.add(oceanAmbientSound6);

        // instantiate a loader
        var loader6 = new THREE.AudioLoader();

        // load a resource
        loader6.load(
          // resource URL
          'MELODIC_INSTRUMENTATION.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound6.setBuffer(audioBuffer);
            oceanAmbientSound6.setRefDistance(20);
            // oceanAmbientSound6.setVolume(0.7);
            light6.intensity = 1;
            loadSound7(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5, oceanAmbientSound6);
            // play the audio
            // oceanAmbientSound6.play();
            // return oceanAmbientSound6;

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
      function loadSound7(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5, oceanAmbientSound6) {
        // instantiate audio object
        var oceanAmbientSound7 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light7.add(oceanAmbientSound7);

        // instantiate a loader
        var loader7 = new THREE.AudioLoader();

        // load a resource
        loader7.load(
          // resource URL
          'VOX_LEAD_DRY.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound7.setBuffer(audioBuffer);
            oceanAmbientSound7.setRefDistance(20);
            // oceanAmbientSound7.setVolume(0.7);
            light7.intensity = 1;
            loadSound8(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5, oceanAmbientSound6, oceanAmbientSound7);
            // play the audio
            // oceanAmbientSound7.play();
            // return oceanAmbientSound7;

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
      function loadSound8(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5, oceanAmbientSound6, oceanAmbientSound7) {
        // instantiate audio object
        var oceanAmbientSound8 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light8.add(oceanAmbientSound8);

        // instantiate a loader
        var loader8 = new THREE.AudioLoader();

        // load a resource
        loader8.load(
          // resource URL
          'VOX_LEAD_FX.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound8.setBuffer(audioBuffer);
            oceanAmbientSound8.setRefDistance(20);
            // oceanAmbientSound8.setVolume(0.7);
            light8.intensity = 1;
            loadSound9(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5, oceanAmbientSound6, oceanAmbientSound7, oceanAmbientSound8);
            // play the audio
            // oceanAmbientSound8.play();
            // return oceanAmbientSound8;

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


      function loadSound9(oceanAmbientSound1, oceanAmbientSound2, oceanAmbientSound3, oceanAmbientSound4, oceanAmbientSound5, oceanAmbientSound6, oceanAmbientSound7, oceanAmbientSound8) {
        //cube 2
        // instantiate audio object
        var oceanAmbientSound9 = new THREE.PositionalAudio(audioListener);

        // add the audio object to the scene
        light9.add(oceanAmbientSound9);

        // instantiate a loader
        var loader9 = new THREE.AudioLoader();

        // load a resource
        loader9.load(
          // resource URL
          'WHISTLE.mp3',

          // onLoad callback
          function (audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound9.setBuffer(audioBuffer);
            oceanAmbientSound9.setRefDistance(20);
            // oceanAmbientSound9.setVolume(0.7);
            light9.intensity = 1;
            // play the audio
            // oceanAmbientSound9.play();
            // playAll();
            analyser1 = new THREE.AudioAnalyser(oceanAmbientSound1, 32);
            analyser2 = new THREE.AudioAnalyser(oceanAmbientSound2, 32);
            analyser3 = new THREE.AudioAnalyser(oceanAmbientSound3, 32);
            analyser4 = new THREE.AudioAnalyser(oceanAmbientSound4, 32);
            analyser5 = new THREE.AudioAnalyser(oceanAmbientSound5, 32);
            analyser6 = new THREE.AudioAnalyser(oceanAmbientSound6, 32);
            analyser7 = new THREE.AudioAnalyser(oceanAmbientSound7, 32);
            analyser8 = new THREE.AudioAnalyser(oceanAmbientSound8, 32);
            analyser9 = new THREE.AudioAnalyser(oceanAmbientSound9, 32);

            oceanAmbientSound1.play();
            oceanAmbientSound2.play();
            oceanAmbientSound3.play();
            oceanAmbientSound4.play();
            oceanAmbientSound5.play();
            oceanAmbientSound6.play();
            oceanAmbientSound7.play();
            oceanAmbientSound8.play();
            oceanAmbientSound9.play();

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


  // camera.position.z = 5;

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
      light1.intensity = Math.pow((analyser1.getAverageFrequency() / 2000) + 1, 80);
      light2.intensity = Math.pow((analyser2.getAverageFrequency() / 2000) + 1, 80);
      light3.intensity = Math.pow((analyser3.getAverageFrequency() / 2000) + 1, 80);
      light4.intensity = Math.pow((analyser4.getAverageFrequency() / 2000) + 1, 80);
      light5.intensity = Math.pow((analyser5.getAverageFrequency() / 2000) + 1, 80);
      light6.intensity = Math.pow((analyser6.getAverageFrequency() / 2000) + 1, 80);
      light7.intensity = Math.pow((analyser7.getAverageFrequency() / 2000) + 1, 80);
      light8.intensity = Math.pow((analyser8.getAverageFrequency() / 2000) + 1, 80);
      light9.intensity = Math.pow((analyser9.getAverageFrequency() / 2000) + 1, 80);
      
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
    cameraY = -sX;



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
