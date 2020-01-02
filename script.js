function main() {

//   setTimeout(() => {
//     overlay.style.opacity = 0;
//     }, 50000); 
//   overlay.style.opacity = 0;
//   overlay.remove();
  
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
  uniform float r_passed;
  uniform float g_passed;
  uniform float b_passed;

float noise(vec2 p, float freq ){
    //float unit = iResolution.x/freq;
    float unit = 1100.0/freq; 
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
    float persistance = .4; 
    float n = 0.9; //.9 makes it mostly dark minus highlight (og.4)
    float normK = 0.;
    float f = 5.; //<<< this value tween from zero  
    float amp = 1.;
    int iCount = 0;
    for (int i = 0; i<50; i++){
        n+=amp*noise(p, f);
        f*=2.5;
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
    int res = 3;
#if 0
    
    vec2 p = fragCoord.xy;
    vec2 q = vec2(
        perlin(p, res),
        perlin(p + vec2(153.1, 259.3), res));
    float f = perlin(p+q, res);
    fragColor.rgb = vec3(f, f, f);
#else
    float t = iTime * 0.03; //(og 0.2)
    vec2 p = fragCoord.xy;
    vec2 q = vec2(
        perlin(p, res),
        perlin(p + vec2(153.1,259.3), res));
    vec2 r = vec2(
        perlin(p+256.0*q + vec2(40.*t,50.*t), res),
        perlin(p+256.0*q + vec2(20.*t,30.*t), res));
    float f = perlin(p+3120.0*r, res);

    vec2 s = vec2(
        perlin(p+256.0*r + vec2(88.1*t,97.6*t), res),
        perlin(p+256.0*r + vec2(23.8*-t,37.0*-t), res));

    vec3 color = vec3(0.0,0.0,0.0);
    color = mix(color, vec3(tweak_c,0.7,0.3), dot(r,r));
    vec3 tmp = vec3(r_passed,g_passed,b_passed) * dot(s,s); //seems to change highlight the most
    tmp = tmp*tmp;
    color += tmp;
    color += vec3(0.2,0.2,0.0) * dot(q,q);
    color = mix(color, vec3(0.5, 0.2, 0.5), f);
    color *= (0.1/0.8); //(og 1.0/0.8) //full scene dim
    
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
    tweak_p: { type: "f", value: 0.5},
    r_passed: {type: "f", value: 0.9},
    g_passed: {type: "f", value: 0.2},
    b_passed: {type: "f", value: 0.9}
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
    let r_out,g_out,b_put 
    [r_out,g_out,b_out] = hslToRgb(x.toFixed(0),1,1);
    console.log(r_out,g_out,b_out);
    // let z = Math.abs(event.accelerationIncludingGravity.z *.09);
    // let z = event.accelerationIncludingGravity.z.toFixed(2);

    // x = x.toFixed(0)
    // y = y.toFixed(0)
    // z = z.toFixed(0)
    TweenMax.to(material.uniforms.tweak_c, 1, { value: x });
    TweenMax.to(material.uniforms.tweak_p, 1, { value: y });
    
    TweenMax.to(material.uniforms.r_passed, 1, { value: r_out });
    TweenMax.to(material.uniforms.g_passed, 1, { value: g_out });
    TweenMax.to(material.uniforms.b_passed, 1, { value: b_out });
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
  
  //hsl conversion copied from https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
  function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r), Math.round(g), Math.round(b)];
  }
  

  function loaded() {
    document.getElementById("startButton").innerText = 'E N T E R';
    document.getElementById("overlay").style.backgroundColor = '#111111';
    document.getElementById("startButton").style.background = '#ffffff';
    document.getElementById("startButton").style.color = '#000000';
    document.getElementById("startButton").addEventListener("click", onClick);
    document.getElementById("startButton").addEventListener("click", main);
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
  
  function removeOverlay(){
    var overlay = document.getElementById( 'overlay' );
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
  
  window.addEventListener('load', loaded);

}








main();
 


