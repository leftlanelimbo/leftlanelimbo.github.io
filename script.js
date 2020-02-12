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
  #include <common>

  uniform vec3 iResolution;
  uniform float iTime;
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
  vec3 hash(float x) { return fract(sin((vec3(x)+vec3(23.32445,132.45454,65.78943))*vec3(23.32445,32.45454,65.78943))*4352.34345); }

  vec3 noise(float x)
  {
      float p = fract(x); x-=p;
      return mix(hash(x),hash(x+1.0),p);
  }

  vec3 noiseq(float x)
  {
      return (noise(x)+noise(x+10.25)+noise(x+20.5)+noise(x+30.75))*0.25;
  }

  void mainImage( out vec4 O,  vec2 U )
  {
      // float time=iTime*0.15;
      float time=iTime*0.0315;
      vec3 k1=noiseq(time)*vec3(0.1,0.19,0.3)+vec3(1.3,0.8,.63);
      vec3 k2=noiseq(time+1000.0)*vec3(0.2,0.2,0.05)+vec3(0.9,0.9,.05);
      //float k3=clamp(texture(iChannel0,vec2(0.01,0.)).x,0.8,1.0); float k4=clamp(texture(iChannel0,vec2(0.2,0.)).x,0.5,1.0); k2+=vec3((k3-0.8)*0.05); k1+=vec3((k4-0.5)*0.01);
      float g=pow(abs(sin(time*0.8+9000.0)),4.0);
      
    vec2 R = iResolution.xy;
      
      // vec2 r1=(U / R.y-vec2(0.5*R.x/R.y,0.5));
      vec2 r1=(U / R.y-vec2(0.05*R.x/R.y,0.5));
      float l = length(r1);
      // vec2 rotate=vec2(cos(time),sin(time));
      vec2 rotate=vec2(cos(-0.5*ssX),sin(0.5*ssY));
      r1=vec2(r1.x*rotate.x+r1.y*rotate.y,r1.y*rotate.x-r1.x*rotate.y);
      vec2 c3 = abs(r1.xy/l);
    if (c3.x>0.5) c3=abs(c3*0.5+vec2(-c3.y,c3.x)*0.86602540);
      c3=normalize(vec2(c3.x*2.0,(c3.y-0.8660254037)*7.4641016151377545870));
      
      O = vec4(c3*l*70.0*(g+0.12), .5,0);
      for (int i = 0; i < 128; i++) {
        O.xzy = (k1 * abs(O.xyz/dot(O,O)-k2));
      }
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;
  const uniforms = {
    iTime: { value: 0 },
    iResolution:  { value: new THREE.Vector3() },
    ssX: { type: "f", value: 0.0 },
    ssY: { type: "f", value: 0.0 },
    ssA: { type: "f", value: 0.0 },
    ssB: { type: "f", value: 0.0 },
    dB: { type: "f", value: 0.0 }
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
    document.getElementById("startButton").addEventListener("click", fullscreen);
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
  window.addEventListener('load', loaded);

}

main();
