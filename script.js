function main() {
  //:::::: three scene 
  let cameraY = 0.0;
  let cameraSY = 0.0;
  let cameraSmoothingFactor = 0.93;
  loaded();
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.autoClearColor = false;
  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }


  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0,10,40);
  const scene = new THREE.Scene();
  // scene.add(new THREE.AmbientLight(0x111122));

  // var listenerOrigin = new THREE.Mesh();
  // listenerOrigin.position.y = 10;
  // scene.add(listenerOrigin);




  function generateTexture() {

    var canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;

    var context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 1, 2, 1);

    return canvas;

  }

  // lights

  function createLight(color) {

    var intensity = 0.05;

    var pointLight = new THREE.PointLight(color, intensity, 20);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 60;
    pointLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

    // var geometry = new THREE.SphereBufferGeometry(0.3, 12, 6);
    // var material = new THREE.MeshBasicMaterial({ color: color });
    // material.color.multiplyScalar(intensity);
    // var sphere = new THREE.Mesh(geometry, material);
    // pointLight.add(sphere);

    var texture = new THREE.CanvasTexture(generateTexture());
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 4.5);

    var geometry = new THREE.SphereBufferGeometry(2, 32, 8);
    var material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      alphaMap: texture,
      alphaTest: 0.5
    });

    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    pointLight.add(sphere);

    // custom distance material
    var distanceMaterial = new THREE.MeshDistanceMaterial({
      alphaMap: material.alphaMap,
      alphaTest: material.alphaTest
    });
    sphere.customDistanceMaterial = distanceMaterial;

    return pointLight;

  }

  light1 = createLight(0x0088ff);
  // light1.position.set(-2, 0, 0); //(left|right,top|down,front|back)
  scene.add(light1);
    
  light2 = createLight(0x0088ff);
  scene.add(light2);

  light3 = createLight(0x0088ff);
  scene.add(light3);

  light4 = createLight(0x0088ff);
  scene.add(light4);

  light5 = createLight(0xff8888);
  scene.add(light5);

  light6 = createLight(0xff8888);
  scene.add(light6);

  light7 = createLight(0xff8888);
  scene.add(light7);

  light8 = createLight(0xff8888);
  scene.add(light8);

  light9 = createLight(0xff8888);
  scene.add(light9);

  //box for lights
  var geometry = new THREE.BoxBufferGeometry(30, 30, 30);

  var material = new THREE.MeshPhongMaterial({
    color: 0xa0adaf,
    shininess: 10,
    specular: 0x111111,
    side: THREE.BackSide
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 10;
  mesh.receiveShadow = true;
  scene.add(mesh);


  // //black plane
  // var planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
  // var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0, specular: 0x666666 });
  // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // plane.position.z = -30;
  // scene.add(plane);
  // // teal light color 0x226666

  // var light1 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light1.position.set(-10, 0, -29); //(left|right,top|down,front|back)
  // // light1.intensity = 1;
  // scene.add(light1);

  // var light2 = new THREE.PointLight(0xFFFFFF, 0, 20, 10);
  // light2.position.set(10, 0, -29);
  // // light2.intensity = 1;
  // scene.add(light2);

  var analyser1, analyser2, analyser3, analyser4, analyser5, analyser6, analyser7, analyser8, analyser9

  //load audio callback
  function playSound() {

    function loadSounds() {
      var audioListener = new THREE.AudioListener();
      camera.add(audioListener);
      // listenerOrigin.add(audioListener);
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
        loadSound(sound1, light1, 'AHHHS.mp3');
        loadSound(sound2, light2, 'BACKGROUND.mp3');
        loadSound(sound3, light3, 'BASS.mp3');
        loadSound(sound4, light4, 'DRUMS.mp3');
        loadSound(sound5, light5, 'JUNO_SYNTH_MAIN.mp3');
        loadSound(sound6, light6, 'MELODIC_INSTRUMENTATION.mp3');
        loadSound(sound7, light7, 'VOX_LEAD_DRY.mp3');
        loadSound(sound8, light8, 'VOX_LEAD_FX.mp3');
        loadSound(sound9, light9, 'WHISTLE.mp3');
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
            light.intensity = 0.07;
            loadCount += 1;
            if (loadCount == 9) {
              play();
            }
          },
          function (xhr) {
            light.intensity = (xhr.loaded/xhr.total)*.3;
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



  function render(time) {
    // time *= 0.001;  // convert to seconds
    time *= 0.0005;  // convert to seconds> halfspeed
    // var time = performance.now() * 0.001;
    
    // cameraSY = cameraY + cameraSmoothingFactor * (cameraSY - cameraY);
    // // camera.rotation.y = -sX;
    // camera.rotation.y = cameraSY;

    light1.position.x = Math.sin(time * 0.6) * 9;
    light1.position.y = Math.sin(time * 0.7) * 9 + 6;
    light1.position.z = Math.sin(time * 0.8) * 9;

    light1.rotation.x = time;
    light1.rotation.z = time;

    time += 1000;
    light2.position.x = Math.sin(time * 0.6) * 9;
    light2.position.y = Math.sin(time * 0.7) * 9 + 6;
    light2.position.z = Math.sin(time * 0.8) * 9;

    light2.rotation.x = time;
    light2.rotation.z = time;

    time += 1000;
    light3.position.x = Math.sin(time * 0.6) * 9;
    light3.position.y = Math.sin(time * 0.7) * 9 + 6;
    light3.position.z = Math.sin(time * 0.8) * 9;

    light3.rotation.x = time;
    light3.rotation.z = time;
    
    time += 1000;
    light4.position.x = Math.sin(time * 0.6) * 9;
    light4.position.y = Math.sin(time * 0.7) * 9 + 6;
    light4.position.z = Math.sin(time * 0.8) * 9;

    light4.rotation.x = time;
    light4.rotation.z = time;
    
    time += 1000;
    light5.position.x = Math.sin(time * 0.6) * 9;
    light5.position.y = Math.sin(time * 0.7) * 9 + 6;
    light5.position.z = Math.sin(time * 0.8) * 9;

    light5.rotation.x = time;
    light5.rotation.z = time;
    
    time += 1000;
    light6.position.x = Math.sin(time * 0.6) * 9;
    light6.position.y = Math.sin(time * 0.7) * 9 + 6;
    light6.position.z = Math.sin(time * 0.8) * 9;

    light6.rotation.x = time;
    light6.rotation.z = time;
    
    time += 1000;
    light7.position.x = Math.sin(time * 0.6) * 9;
    light7.position.y = Math.sin(time * 0.7) * 9 + 6;
    light7.position.z = Math.sin(time * 0.8) * 9;

    light7.rotation.x = time;
    light7.rotation.z = time;
    
    time += 1000;
    light8.position.x = Math.sin(time * 0.6) * 9;
    light8.position.y = Math.sin(time * 0.7) * 9 + 6;
    light8.position.z = Math.sin(time * 0.8) * 9;

    light8.rotation.x = time;
    light8.rotation.z = time;
    
    time += 1000;
    light9.position.x = Math.sin(time * 0.6) * 9;
    light9.position.y = Math.sin(time * 0.7) * 9 + 6;
    light9.position.z = Math.sin(time * 0.8) * 9;

    light9.rotation.x = time;
    light9.rotation.z = time;



    
    try {

      // console.log(analysers);
      light1.intensity = Math.pow((analyser1.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light2.intensity = Math.pow((analyser2.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light3.intensity = Math.pow((analyser3.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light4.intensity = Math.pow((analyser4.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light5.intensity = Math.pow((analyser5.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light6.intensity = Math.pow((analyser6.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light7.intensity = Math.pow((analyser7.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light8.intensity = Math.pow((analyser8.getAverageFrequency() / 2000) + 1, 80)*0.05;
      light9.intensity = Math.pow((analyser9.getAverageFrequency() / 2000) + 1, 80)*0.05;
      
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
