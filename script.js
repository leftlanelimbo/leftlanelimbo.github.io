function main() {
  //:::::: three scene 
  loaded();
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
  renderer.autoClearColor = false;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();

  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  var planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
  var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0, specular: 0x666666});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.z = -30;
  scene.add(plane);

  // var light = new THREE.PointLight({color:0x00ff00, intensity:0.2, distance:0, decay:1.0});
  var light = new THREE.PointLight(0xffffff, 1, 20, 10 );
  light.position.set(-4, 0, -29);
  light.intensity = 0;
  scene.add(light);

  var light2 = new THREE.PointLight(0xffffff, 1, 20, 10);
  light2.position.set(4, 0, -29);
  light2.intensity = 0;
  scene.add(light2);

  // let analyser1, analyser2
  // let analysers = [analyser1, analyser2]
  let analysers = []

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshNormalMaterial();
  // const cube = new THREE.Mesh(geometry, material);
  // cube.position.x = 4;
  // cube.position.z = -20;
  // scene.add(cube);
  
  // const cube2 = new THREE.Mesh(geometry, material);
  // cube2.position.x = -4;
  // cube2.position.z = -20;
  // scene.add(cube2);

  // instantiate a listener & add to camera
  var audioListener = new THREE.AudioListener();
  camera.add(audioListener);


  //load audio callback
  function loadAllSounds(){

    async function loadAndPlay(){
      //parallel promise define
      let promises = [loadSound('bloomS2MLM.mp3', light), loadSound('bloomS2MRM.mp3', light2)];
      //parallel process load
      Promise.all(promises).then((results)=>{
        for(let i = 0;i<results.length;i++){
          results[i].play();
          console.log(analysers)
          // analysers[i] = new THREE.AudioAnalyser(results[i], 32);
          
        }

      }).catch((err)=>(console.log(err)))
    }
    loadAndPlay();
  

    function loadSound(fileName, objectAttach){
      return new Promise((resolve,reject)=>{
        var ambientSound = new THREE.PositionalAudio(audioListener);
        objectAttach.add(ambientSound);
        var loader2 = new THREE.AudioLoader();
        loader2.load(
          fileName,
          // onLoad callback
          function (audioBuffer) {
            ambientSound.setBuffer(audioBuffer);
            ambientSound.setRefDistance(15);
            ambientSound.setVolume(0.7);
            analyser = new THREE.AudioAnalyser(ambientSound, 32);
            analysers.push(analyser)
            resolve(ambientSound);
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
      })
    }
      
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
    // console.log(analysers)
    try{
      // console.log(analysers);
      light.intensity = Math.pow((analysers[0].getAverageFrequency()/1000)+1,40);
      light2.intensity = Math.pow((analysers[1].getAverageFrequency()/1000)+1,40);
    }catch(err){
      // console.log('nada');
    }
    // uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    // uniforms.iTime.value = time;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube2.rotation.x += 0.01;
    // cube2.rotation.y += 0.01;
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
    // cube.position.x += (-sB*.01);
    // cube2.position.x -= (-sB*.01);

    // cube.position.y += (sA*.01);
    // cube2.position.y -= (sA*.01);
 
    light.position.x += (-sB*.01);
    light2.position.x -= (-sB*.01);

    light.position.y += (sA*.01);
    light2.position.y -= (sA*.01);



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
    document.getElementById("startButton").addEventListener("click", loadAllSounds);
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
