import Home from './Home'
import Beers from './Beers'
import Detail from './Details'


import GSAP from 'gsap'

// export default class Canvas {
//     constructor({ template }) {

//         this.template = template

//         this.x = {
//             start: 0,
//             distance: 0,
//             end: 0
//         }
//         this.y = {
//             start: 0,
//             distance: 0,
//             end: 0
//         }

//         this.createRenderer()
//         this.createCamera()
//         this.createScene()

//         this.onResize()

//     }

//     createRenderer() {
//         this.renderer = new Renderer({
//             alpha: true,
//             antialias: true,
//         });

//         this.gl = this.renderer.gl

//         document.body.appendChild(this.gl.canvas)
//     }

//     createCamera() {
//         this.camera = new Camera(this.gl)
//         this.camera.position.z = 5
//     }

//     createScene() {
//         this.scene = new Transform()
//     }

//     /**
//     **Home
//     */
//     createHome() {
//         this.home = new Home({
//             gl: this.gl,
//             scene: this.scene,
//             sizes: this.sizes,
//         })
//     }

//     destroyHome() {
//         if (!this.home) return
//         this.home.destroy()
//         this.home = null
//     }

//     /**
//     **Project
//     */
//     createBeer() {
//         this.beer = new Beers({
//             gl: this.gl,
//             scene: this.scene,
//             sizes: this.sizes,
//         })
//     }

//     destroyBeer() {
//         if (!this.beer) return
//         this.beer.destroy()
//         this.beer = null
//     }

//      /**
//     **Detail
//     */
//     createDetail() {
//         this.detail = new Detail({
//             gl: this.gl,
//             scene: this.scene,
//             sizes: this.sizes,
//         })
//     }

//     destroyDetail() {
//         if (!this.detail) return
//         this.detail.destroy()
//         this.detail = null
//     }
//     /**
//      **Events
//      */


//     onPreloaded() {
//         this.onChangeEnd(this.template)
//     }

//     onChangeStart(template, url) {
//         if (this.home) {
//             this.home.hide()
//         }

//         if (this.project) {
//             this.project.Picture.hide()
//             this.project.hide()
//         }

//     }
//     onChangeEnd(template) {

//         if (template === 'home') {
//             this.createHome()
//         } else {
//             this.destroyHome()
//         }

//         if (template === 'project') {
//             this.createProject()
//         }
//         else {
//             this.destroyProject()
//         }

//         this.template = template
//     }

//     onResize() {
//         this.renderer.setSize(window.innerWidth, window.innerHeight)

//         this.camera.perspective({
//             aspect: window.innerWidth / window.innerHeight
//         })


//         const fov = this.camera.fov * (Math.PI / 180);
//         const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
//         const width = height * this.camera.aspect;


//         this.sizes = {
//             height,
//             width
//         }
//         const values = {
//             sizes: this.sizes
//         }

//         if (this.project) {
//             this.project.onResize(values)
//         }

//         if (this.home) {
//             this.home.onResize(values)
//         }
//     }

//     onTouchDown(event) {
//         this.isDown = true
//         this.x.start = event.touches ? event.touches[0].clientX : event.clientX
//         this.y.start = event.touches ? event.touches[0].clientY : event.clientY

//         const values = {
//             x: this.x,
//             y: this.y
//         }

//         if (this.project) {
//             this.project.onTouchDown(values)
//         }

//         if (this.home) {
//             this.home.onTouchDown(values)
//         }
//     }

//     onTouchMove(event) {
//         if (!this.isDown) return

//         const x = event.touches ? event.touches[0].clientX : event.clientX
//         const y = event.touches ? event.touches[0].clientY : event.clientY

//         this.x.end = x
//         this.y.end = y

//         const values = {
//             x: this.x,
//             y: this.y
//         }

//         if (this.project) {
//             this.project.onTouchMove(values)
//         }

//         if (this.home) {
//             this.home.onTouchMove(values)

//         }
//     }

//     onTouchUp(event) {
//         this.isDown = false

//         const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
//         const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

//         this.x.end = x
//         this.y.end = y

//         const values = {
//             x: this.x,
//             y: this.y
//         }

//         if (this.project) {
//             this.project.onTouchUp(values)
//         }

//         if (this.home) {
//             this.home.onTouchUp(values)
//         }

//     }
//     onWheel(event) {
//         if (this.home) {
//             this.home.onWheel(event)
//         }
//     }
//     /**
//      * //* LOOP
//      */
//     update(scroll) {

//         if (this.project) {
//             this.project.update(scroll)
//         }

//         if (this.home) {
//             this.home.update()
//         }

//         this.renderer.render({
//             camera: this.camera,
//             scene: this.scene,
//         })
//     }
// }



import * as THREE from 'three';
// import fragment from '../../shaders/fragment.glsl';
// import vertex from '../../shaders/vertex.glsl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default class Sketch {
    constructor() {
        this.containerRef = document.getElementById('home__content')

        console.log(this.containerRef);
        this.numberSegment = 200

        this.material = null;
        this.t = 0;
        this.mesh
        // Instantiate a loader
        this.loader = new GLTFLoader();
        console.log(this.loader);



        this.scene = new THREE.Scene();
        const width = this.containerRef.offsetWidth;
        const height = this.containerRef.offsetHeight;

        this.camera = new THREE.PerspectiveCamera(70, width / height, 100, 2000);
        this.camera.position.z = 600;
        this.camera.fov = 2 * Math.atan((height / 2) / 600) * (180 / Math.PI);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this.containerRef.appendChild(this.renderer.domElement);

        this.addObjects();
        this.resize();
        this.setupResize();
        this.render();
        // this.animate();
        this.addEventListener();

    }

    addObjects() {

        // this.geometry = new THREE.PlaneGeometry(300, 300, this.numberSegment, this.numberSegment);

        // this.material = new THREE.ShaderMaterial({
        //     uniforms: {
        //         time: { value: 0 },
        //         // color: { value: this.props.number },
        //         opacity: { value: 0. },
        //     },
        //     side: THREE.DoubleSide,
        //     // fragmentShader: fragment,
        //     // vertexShader: vertex,
        //     wireframe: true,
        // });

        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        // // this.mesh.rotation.x = Math.PI / 2;
        // console.log(this.mesh);
        // this.scene.add(this.mesh);


        let i = 0;
        this.loader.load('/images/bottle.glb', (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    this.mesh = child;
                    this.mesh.material = new THREE.MeshNormalMaterial();

                }

            });
            //set position
            console.log(this.mesh);
            this.mesh.position.y = -200;
            this.mesh.scale.set(90.5, 90.5, 90.5);
            this.mesh.rotation.x = -Math.PI / 2;
            this.mesh.rotation.y -= 100;
            this.scene.add(this.mesh);

            // this.scene.add(gltf.scene);
        });
    };

    resize() {
        const width = this.containerRef.offsetWidth;
        const height = this.containerRef.offsetHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    render() {
        this.t += 0.05;
        // this.material.uniforms.time.value = this.t;

        if (this.mesh) {
            this.mesh.rotation.z += 0.1;
            this.mesh.rotation.x += Math.sin(this.t * 0.001) * 0.01;
        }
        //camera to look at the mesh
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
    // animate() {
    //     GSAP.to(this.material.uniforms.opacity, {
    //         duration: 4,
    //         value: 1,
    //         ease: 'expo.out',
    //         //call function changeSegment
    //     });
    // }
    // sca() {
    //     console.log('click');
    //     GSAP.to(this.containerRef, {
    //         scale: 0.5,
    //         ease: 'expo.out',
    //         duration: 1,
    //         position: 'unset',
    //         //in the same time change the height to 60vh    
    //         height: "60vh"


    //     })
    // }

    addEventListener() {
        // this.scale.addEventListener('click', this.sca.bind(this));
    }

}
new Sketch()
