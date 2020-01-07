function main() {

//   setTimeout(() => {
//     overlay.style.opacity = 0;
//     }, 50000); 
//   overlay.style.opacity = 0;
//   overlay.remove();
  let xval = document.getElementById("xval");
  let yval = document.getElementById("yval");
  let x, y, lastX, lastY;
  lastX = 0.0;
  lastY = 0.0;
  let bsvg = document.getElementById("blackPattern");
  
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


vec3 hue2rgb(float hue){
	hue=fract(hue);
	return saturate(vec3(
		abs(hue*6.-3.)-1.,
		2.-abs(hue*6.-2.),
		2.-abs(hue*6.-4.)
	));
}

float perlin(vec2 p, int res){
    float persistance = .4; //og .4
    float n = .1; //.9 makes it mostly dark minus highlight (og.4)
    float normK = 0.;
    float f = 5.; //<< from flat to form 5 is solid target idk what difference between this and persistance is 
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
    float t = iTime * tweak_p; //(og 0.2)
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
    vec3 tweak_color = hue2rgb(tweak_c);
    
    color = mix(color, tweak_color, dot(r,r));//-
//     color = mix(color, vec3(0.5,0.9,0.5), dot(r,r));
    
//     vec3 tmp = -1.0*tweak_color * dot(s,s);
//     vec3 tmp = vec3(0.9,0.2,0.9) * dot(s,s);//-
    vec3 tmp = vec3(0.6,0.3,0.6) * dot(s,s);//-
    
    tmp = tmp*tmp;
    color += tmp;
    
//     color += tweak_color * dot(q,q);//-
    color += vec3(0.2,0.3,0.7) * dot(q,q);
    
//     color = mix(color, -1.0*tweak_color, f);//-
    color = mix(color, vec3(0.9, 0.6, 0.4), f);
    
    color *= (0.5/0.8); //(og 1.0/0.8)
    
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
//     x = Math.abs(event.accelerationIncludingGravity.x * 0.1);
      x = event.accelerationIncludingGravity.x * 0.1;
      xwhite = x* 100;
      xblack = -xwhite;
      xskew = x*10;
//     console.log(xwhite);
//     y = Math.abs(event.accelerationIncludingGravity.y * .05 +.2);
    
//     xval.innerText = x;
//     TweenMax.to(material.uniforms.tweak_c, 1, { value: x });
    
    if (Math.abs(lastX-x) >= 0.05) {
    lastX = x;
    xval.innerText = xwhite;
    TweenMax.to(material.uniforms.tweak_c, 1.5, { value: x });
    TweenMax.to("#blackPattern", 1.5, { x:xblack });
    TweenMax.to("#whitePattern", 1.5, { x:xwhite });
    TweenMax.to("#bripplSVG", 2.25, {'fill-opacity':1.5*x });
    TweenMax.to("#wripplSVG", 2.25, {'fill-opacity':-x*.5 });
//     TweenMax.to("#wripplSVG", .25, { skewX:xskew });
//     TweenMax.to("#bripplSVG", .25, { skewX:xskew });
    }
//     console.log(x,y);
//     if (Math.abs(lastY-y) >= 0.01) {
//     lastY = y;
//     yval.innerText = y;
//     TweenMax.to(material.uniforms.tweak_p, 1, { value: y });
//     }
    
    // let z = Math.abs(event.accelerationIncludingGravity.z *.09);
    // let z = event.accelerationIncludingGravity.z.toFixed(2);

    // x = x.toFixed(0)
    // y = y.toFixed(0)
    // z = z.toFixed(0)
//     TweenMax.to(material.uniforms.tweak_c, 1, { value: x });
    
    // TweenMax.to('#hed', 1, { opacity: `${y}` });
    // stereoPanner.pan = pan;
    //el.style.background = `hsl(${x},100%,50%)`;

  }
  
function loaded() {
    document.getElementById("startButton").innerText = 'E N T E R';
    document.getElementById("overlay").style.backgroundColor = '#111111';
    document.getElementById("startButton").style.background = '#ffffff';
    document.getElementById("startButton").style.color = '#000000';
    document.getElementById("startButton").addEventListener("click", onClick);
    document.getElementById("startButton").addEventListener("click", removeOverlay);
}

function removeOverlay() {
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
  
window.addEventListener('load', loaded);

    
}

main();
 


