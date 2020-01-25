function main() {
  //:::::: three scene 
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.autoClearColor = false;

  const camera = new THREE.OrthographicCamera(
    -1, // left
     1, // right
     1, // top
    -1, // bottom
    -1, // near,
     1, // far
  );
  const scene = new THREE.Scene();
  const plane = new THREE.PlaneBufferGeometry(2, 2);

  const fragmentShader = `
  //https://www.shadertoy.com/view/4lsGWj
  #include <common>
  uniform vec3 iResolution;
  uniform float iTime;
  uniform sampler2D iChannel0; //need this line to pass in texture from three and label it like shadertoy
  uniform float ssX;
  uniform float ssY;
  uniform float ssA;
  uniform float ssB;
  uniform float dB; //passed in derivative

  // shader derivative caluclate > no work
  // float ssB_last = 0.0;
  // float dssB = 0.0;
  //should probably move this jerk assignment to outside of shader
  // vec3 col = vec3(0.0,0.0,1.0);


  // By iq: https://www.shadertoy.com/user/iq  
  // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
    vec2 uv = (fragCoord.xy-.5*iResolution.xy) * 7.2 / iResolution.y;

      float r = 0.91;
      float a = iTime*.07+((ssX+2.0)*0.1);
      float c = cos(a)*r;
      float s = sin(a)*r;
      for ( int i=0; i<32; i++ )
      {
        uv = abs(uv);
          uv -= .25;
          uv = uv*c + s*uv.yx*vec2(1,-1);
      }
          
      fragColor = 0.3+(ssY*0.07)+.5*sin(iTime+vec4(13,47,93,1)*texture2D(iChannel0, uv*vec2(1,-1)+.5, -1.0 ));
      // fragColor = .6+.5*sin(iTime+(ssY*0.05)+vec4(13,47,93,1)*texture2D(iChannel0, uv*vec2(1,-1)+.5, -1.0 ));
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;


  //load texture
  const loader = new THREE.TextureLoader();
  const texture = loader.load('texture.jpg');
  // texture.minFilter = THREE.NearestFilter;
  // texture.magFilter = THREE.NearestFilter;
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;

  const uniforms = {
    iTime: { value: 0 },
    iResolution:  { value: new THREE.Vector3() },
    ssX: { type: "f", value: 0.0 },
    ssY: { type: "f", value: 0.0 },
    ssA: { type: "f", value: 0.0 },
    ssB: { type: "f", value: 0.0 },
    dB: { type: "f", value: 0.0 },
    iChannel0: { value: texture } //pass texture to shader
  };
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
  });
  scene.add(new THREE.Mesh(plane, material));

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
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms.iTime.value = time;

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

    sB = b + smoothing_factor * (sB - b);
    sA = a + smoothing_factor * (sA - a);
    // console.log(sX,sY,sB,sA);

    //attempt to do derivative outside of shader # should probably move the jerk calculation to here
    dB = sB - sB_last;
    sB_last = sB;
    // console.log(dB.toFixed(2));


    //passing to material uniforms
    material.uniforms.ssX.value = sX;
    material.uniforms.ssY.value = sY;
    material.uniforms.ssA.value = sA;
    material.uniforms.ssB.value = sB;
    material.uniforms.dB.value = dB;
  }

  //on load change colors of overlay, and add eventlisteners for devicemotion callbacks
  function loaded() {
    document.getElementById("startButton").innerText = 'E N T E R';
    document.getElementById("overlay").style.backgroundColor = '#111111';
    document.getElementById("startButton").style.background = '#ffffff';
    document.getElementById("startButton").style.color = '#000000';
    document.getElementById("startButton").addEventListener("click", onClickDeviceMotion);
    document.getElementById("startButton").addEventListener("click", removeOverlay);
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
  window.addEventListener('load', loaded);

}

main();
