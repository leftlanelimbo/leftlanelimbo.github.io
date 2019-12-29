function main() {
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
  uniform float tweak_c;
  uniform float tweak_p;

float noise(vec2 p, float freq ){
    //float unit = iResolution.x/freq;
    float unit = 600.0/freq; 
    vec2 ij = floor(p/unit);
    vec2 xy = mod(p,unit)/unit;
    //xy = 3.*xy*xy-2.*xy*xy*xy;
    xy = .5*(1.-cos(PI*xy));
    float a = rand((ij+vec2(0.,0.)));
    float b = rand((ij+vec2(1.,0.)));
    float c = rand((ij+vec2(0.,1.)));
    float d = rand((ij+vec2(1.,1.)));
    float x1 = mix(a, b, xy.x);
    float x2 = mix(c, d, xy.x);
    return mix(x1, x2, xy.y);
}


float perlin(vec2 p, int res){
    float persistance = tweak_p; 
    float n = 0.; 
    float normK = 0.;
    float f = 8.; 
    float amp = 1.;
    int iCount = 0;
    for (int i = 0; i<50; i++){
        n+=amp*noise(p, f);
        f*=2.;
        normK+=amp;
        amp*=persistance;
        if (iCount == res) break;
        iCount++;
    }
    float nf = n/normK;
    //return nf*nf*nf*nf;
    return nf;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{   
    int res = 5;
#if 0
    
    vec2 p = fragCoord.xy;
    vec2 q = vec2(
        perlin(p, res),
        perlin(p + vec2(153.1, 259.3), res));
    float f = perlin(p+q, res);
    fragColor.rgb = vec3(f, f, f);
#else
    float t = iTime * 0.2;
    vec2 p = fragCoord.xy;
    vec2 q = vec2(
        perlin(p, res),
        perlin(p + vec2(153.1,259.3), res));
    vec2 r = vec2(
        perlin(p+256.0*q + vec2(88.1*t,97.6*t), res),
        perlin(p+256.0*q + vec2(23.8*t,37.0*t), res));
    float f = perlin(p+512.0*r, res);

    vec2 s = vec2(
        perlin(p+256.0*r + vec2(88.1*t,97.6*t), res),
        perlin(p+256.0*r + vec2(23.8*-t,37.0*-t), res));

    vec3 color = vec3(0.0,0.0,0.0);
    color = mix(color, vec3(tweak_c,0.7,0.3), dot(r,r));
    vec3 tmp = vec3(0.9,0.2,0.9) * dot(s,s);
    tmp = tmp*tmp;
    color += tmp;
    color += vec3(0.2,0.2,0.0) * dot(q,q);
    color = mix(color, vec3(0.15, 0.2, 0.5), f);
    color *= (1.0/0.8);
    
    //color = mix(vec3(0.6, 0.4, 0.2), vec3(0.1, 0.1, 0.3), f);
    //color = mix(vec3(0.6, 0.4, 0.2), vec3(0.1, 0.1, 0.3), dot(q,q));
    //color = mix(vec3(0.6, 0.4, 0.2), vec3(0.1, 0.1, 0.3), dot(r,r));
    //color = mix(vec3(0.6, 0.4, 0.2), vec3(0.1, 0.1, 0.3), dot(s,s));
    fragColor.rgb = color;
#endif
}


  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;
  const uniforms = {
    iTime: { value: 0 },
    iResolution:  { value: new THREE.Vector3() },
    tweak_c: { type: "f", value: 0.1},
    tweak_p: { type: "f", value: 0.5}
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

  function handleMotionEvent(event) {
    let x = Math.abs(event.accelerationIncludingGravity.x * 0.3);
    // console.log(x);
    let y = Math.abs(event.accelerationIncludingGravity.y * .05 +.2);
    // let z = Math.abs(event.accelerationIncludingGravity.z *.09);
    // let z = event.accelerationIncludingGravity.z.toFixed(2);

    // x = x.toFixed(0)
    // y = y.toFixed(0)
    // z = z.toFixed(0)
    TweenMax.to(material.uniforms.tweak_c, 1, { value: x });
    TweenMax.to(material.uniforms.tweak_p, 1, { value: y });
    // TweenMax.to('#hed', 1, { opacity: `${y}` });
    // stereoPanner.pan = pan;
    //el.style.background = `hsl(${x},100%,50%)`;
    // console.log(x, y, z)
    // if (x > 200) {
    //     el.innerHTML = 'Direction Change Works!!'
    // } else {
    //     el.innerHTML = 'Tween Max Includes'
    // }

  }
  function onClick() {
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
      console.log('cry to your fruit overlords');
    }
  }

  document.getElementById("butt").addEventListener("click", onClick);

}






main();
 


