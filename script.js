function main() {
  //:::::: three scene 
  // let cameraY = 0.0;
  // let cameraSY = 0.0;
  // let cameraX = 0.0;
  // let cameraSX = 0.0;
  let cameraSmoothingFactor = 0.93;
  loaded();
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
  renderer.autoClearColor = false;

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();

  //black plane
  // var planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
  var sphereGeometry = new THREE.SphereBufferGeometry(30, 32, 32);
  // var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0, specular: 0x666666 });
  // var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x0, specular: 0x666666 });
  var sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xa0adaf,
    shininess: 200,
    specular: 0x111111,
    side: THREE.BackSide
  });
  var backdrop = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // plane.position.z = -30;
  scene.add(backdrop);

  //function to pass in sane values in degrees to place objects
  function d2PhiR(degree) {
    degree = -degree; 
    degree = degree + 90;
    radian = degree * Math.PI / 180;
    return radian;
  }

  function d2ThetaR(degree){
    degree = -degree;
    degree = degree+180;
    radian = degree * Math.PI / 180;
    return radian;
  }

  // d = THREE.MathUtils.degToRad(180);
  // d = d2ThetaR(10);
  // console.log(d);
  // sphereical (radius, radians down from top, radians counter clockwise from behind)
  // var s = new THREE.Spherical(29,1.5707963267948966,2.941592653589793);
  // s.setFromCartesianCoords(0,0,-29);
  // console.log(s);
  // teal light color 0x226666

  /////////////////// grid lights
  // var light1 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light1.position.set(-10, -10, -29);
  // // light1.intensity = 1;
  // scene.add(light1);
  // var light2 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light2.position.set(0, -10, -29);
  // // light2.intensity = 1;
  // scene.add(light2);

  // var light3 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light3.position.set(10, -10, -29);
  // // light3.intensity = 1;
  // scene.add(light3);

  // var light4 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light4.position.set(-10, 0, -29);
  // // light4.intensity = 1;
  // scene.add(light4);

  // var light5 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light5.position.set(0, 0, -29);
  // // light5.intensity = 1;
  // scene.add(light5);

  // var light6 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light6.position.set(10, 0, -29);
  // // light6.intensity = 1;
  // scene.add(light6);

  // var light7 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light7.position.set(-10, 10, -29);
  // // light7.intensity = 1;
  // scene.add(light7);

  // var light8 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light8.position.set(0, 10, -29);
  // // light8.intensity = 1;
  // scene.add(light8);

  // var light9 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light9.position.set(10, 10, -29);
  // // light9.intensity = 1;
  // scene.add(light9);


  ///////////sphere cubes
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshNormalMaterial();
  // // const cube = new THREE.Mesh(geometry, material);

  // var light1 = new THREE.Mesh(geometry, material);
  // var s1 = new THREE.Spherical(29, 1.7707963267948966, 3.341592653589793);
  // light1.position.setFromSpherical(s1);
  // scene.add(light1);

  // var light2 = new THREE.Mesh(geometry, material);
  // var s2 = new THREE.Spherical(29, 1.7707963267948966, 3.141592653589793);
  // light2.position.setFromSpherical(s2);
  // scene.add(light2);

  // var light3 = new THREE.Mesh(geometry, material);
  // var s3 = new THREE.Spherical(29, 1.7707963267948966, 2.941592653589793);
  // light3.position.setFromSpherical(s3);
  // scene.add(light3);

  // var light4 = new THREE.Mesh(geometry, material);
  // var s4 = new THREE.Spherical(29, 1.5707963267948966, 3.341592653589793);
  // light4.position.setFromSpherical(s4);
  // scene.add(light4);

  // var light5 = new THREE.Mesh(geometry, material);
  // var s5 = new THREE.Spherical(29, 1.5707963267948966, 3.141592653589793);
  // light5.position.setFromSpherical(s5);
  // scene.add(light5);

  // var light6 = new THREE.Mesh(geometry, material);
  // var s6 = new THREE.Spherical(29, 1.5707963267948966, 2.941592653589793);
  // light6.position.setFromSpherical(s6);
  // scene.add(light6);

  // var light7 = new THREE.Mesh(geometry, material);
  // var s7 = new THREE.Spherical(29, 1.3707963267948966, 3.341592653589793);
  // light7.position.setFromSpherical(s7);
  // scene.add(light7);

  // var light8 = new THREE.Mesh(geometry, material);
  // var s8 = new THREE.Spherical(29, 1.3707963267948966, 3.141592653589793);
  // light8.position.setFromSpherical(s8);
  // scene.add(light8);

  // var light9 = new THREE.Mesh(geometry, material);
  // var s9 = new THREE.Spherical(29, 1.3707963267948966, 2.941592653589793);
  // light9.position.setFromSpherical(s9);
  // scene.add(light9);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshNormalMaterial();
  // const cube = new THREE.Mesh(geometry, material);
  const bottom = d2PhiR(-40);
  const middle = d2PhiR(0);
  const top = d2PhiR(40);

  const right = d2ThetaR(50);
  const center = d2ThetaR(0);
  const left = d2ThetaR(-50);

  var light1 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s1 = new THREE.Spherical(29, top, left);
  light1.position.setFromSpherical(s1);
  // light1.intensity = 5;
  scene.add(light1);

  var light2 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s2 = new THREE.Spherical(29, top, center);
  light2.position.setFromSpherical(s2);
  // light2.intensity = 5;
  scene.add(light2);

  var light3 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s3 = new THREE.Spherical(29, top, right);
  light3.position.setFromSpherical(s3);
  // light3.intensity = 5;
  scene.add(light3);

  var light4 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s4 = new THREE.Spherical(29, middle, left);
  light4.position.setFromSpherical(s4);
  // light4.intensity = 5;
  scene.add(light4);

  var light5 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s5 = new THREE.Spherical(29, middle, center);
  light5.position.setFromSpherical(s5);
  // light5.intensity = 5;
  scene.add(light5);

  var light6 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s6 = new THREE.Spherical(29, middle, right);
  light6.position.setFromSpherical(s6);
  // light6.intensity = 5;
  scene.add(light6);

  var light7 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s7 = new THREE.Spherical(29, bottom, left);
  light7.position.setFromSpherical(s7);
  // light7.intensity = 5;
  scene.add(light7);

  var light8 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s8 = new THREE.Spherical(29, bottom, center);
  light8.position.setFromSpherical(s8);
  // light8.intensity = 5;
  scene.add(light8);

  var light9 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  var s9 = new THREE.Spherical(29, bottom, right);
  light9.position.setFromSpherical(s9);
  // light9.intensity = 5;
  scene.add(light9);





  var analyser1, analyser2, analyser3, analyser4, analyser5, analyser6, analyser7, analyser8, analyser9

  //load audio callback
  function playSound() {

    function loadSounds() {
      var audioListener = new THREE.AudioListener();
      camera.add(audioListener);
      var loadCount = 0; //make this more dynamic by getting length of array or something

      var sound1 = new THREE.PositionalAudio(audioListener);
      var sound2 = new THREE.PositionalAudio(audioListener);
      var sound3 = new THREE.PositionalAudio(audioListener);
      var sound4 = new THREE.PositionalAudio(audioListener);
      var sound5 = new THREE.PositionalAudio(audioListener);
      var sound6 = new THREE.PositionalAudio(audioListener);
      var sound7 = new THREE.PositionalAudio(audioListener);
      var sound8 = new THREE.PositionalAudio(audioListener);
      var sound9 = new THREE.PositionalAudio(audioListener);

      light1.add(sound1);
      light2.add(sound2);
      light3.add(sound3);
      light4.add(sound4);
      light5.add(sound5);
      light6.add(sound6);
      light7.add(sound7);
      light8.add(sound8);
      light9.add(sound9);

      function loadAllSounds(){
        loadSound(sound1, light1, 'AHHHS_min.mp3');
        loadSound(sound2, light2, 'BACKGROUND_min.mp3');
        loadSound(sound3, light3, 'BASS_min.mp3');
        loadSound(sound4, light4, 'DRUMS_min.mp3');
        loadSound(sound5, light5, 'JUNO_SYNTH_MAIN_min.mp3');
        loadSound(sound6, light6, 'MELODIC_INSTRUMENTATION_min.mp3');
        loadSound(sound7, light7, 'VOX_LEAD_DRY_min.mp3');
        loadSound(sound8, light8, 'VOX_LEAD_FX_min.mp3');
        loadSound(sound9, light9, 'WHISTLE_min.mp3');
      }
      loadAllSounds();

      function play() {
        analyser1 = new THREE.AudioAnalyser(sound1, 32);
        analyser2 = new THREE.AudioAnalyser(sound2, 32);
        analyser3 = new THREE.AudioAnalyser(sound3, 32);
        analyser4 = new THREE.AudioAnalyser(sound4, 32);
        analyser5 = new THREE.AudioAnalyser(sound5, 32);
        analyser6 = new THREE.AudioAnalyser(sound6, 32);
        analyser7 = new THREE.AudioAnalyser(sound7, 32);
        analyser8 = new THREE.AudioAnalyser(sound8, 32);
        analyser9 = new THREE.AudioAnalyser(sound9, 32);

        sound1.play();
        sound2.play();
        sound3.play();
        sound4.play();
        sound5.play();
        sound6.play();
        sound7.play();
        sound8.play();
        sound9.play();
      }

      function loadSound(sound, light, file) {
        var loader = new THREE.AudioLoader();
        loader.load(file,
          function (audioBuffer) {
            sound.setBuffer(audioBuffer);
            sound.setRefDistance(25);
            light.intensity = 1;
            loadCount += 1;
            if (loadCount == 9) {
              play();
            }
          },
          function (xhr) {
            light.intensity = (xhr.loaded/xhr.total)*.5;
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (err) {
            console.log('An error happened');
          }
        );
      }
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
    
    // cameraSY = cameraY + cameraSmoothingFactor * (cameraSY - cameraY);
    // cameraSX = cameraX + cameraSmoothingFactor * (cameraSX - cameraX);
    // // camera.rotation.y = -sX;
    // camera.rotation.y = cameraSY;
    // camera.rotation.x = cameraSX;


    ///////cube rotation
    // light1.rotation.x += 0.01;
    // light1.rotation.y += 0.01;

    // light2.rotation.x += 0.01;
    // light2.rotation.y += 0.01;

    // light3.rotation.x += 0.01;
    // light3.rotation.y += 0.01;

    // light4.rotation.x += 0.01;
    // light4.rotation.y += 0.01;

    // light5.rotation.x += 0.01;
    // light5.rotation.y += 0.01;

    // light6.rotation.x += 0.01;
    // light6.rotation.y += 0.01;

    // light7.rotation.x += 0.01;
    // light7.rotation.y += 0.01;

    // light8.rotation.x += 0.01;
    // light8.rotation.y += 0.01;

    // light9.rotation.x += 0.01;
    // light9.rotation.y += 0.01;


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
    // cameraY = -sX;
    // cameraX = sY;
    camera.rotation.y += sB*0.001;
    camera.rotation.x += sA*0.001;



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
