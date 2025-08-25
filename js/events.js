import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { 
    getCamera, 
    getCities, 
    getIsMouseDown, setIsMouseDown, 
    getMouseX, setMouseX, 
    getMouseY, setMouseY, 
    getCameraRotationX, setCameraRotationX, 
    getCameraRotationY, setCameraRotationY, 
    getCameraDistance, setCameraDistance,
    getScene
} from './main.js';
import { selectCity } from './cities.js';

export function setupEventListeners() {
    const canvas = document.getElementById('webgl');
    const camera = getCamera();
    const cities = getCities();
    const scene = getScene();
    
    // Souris
    canvas.addEventListener('mousedown', (e) => {
        setIsMouseDown(true);
        document.body.classList.add('grabbing');
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    });

    document.addEventListener('mouseup', () => {
        setIsMouseDown(false);
        document.body.classList.remove('grabbing');
    });

    document.addEventListener('mousemove', (e) => {
        if (getIsMouseDown()) {
            const deltaX = e.clientX - getMouseX();
            const deltaY = e.clientY - getMouseY();
            
            setCameraRotationY(getCameraRotationY() + deltaX * 0.01);
            setCameraRotationX(getCameraRotationX() + deltaY * 0.01);
            
            const rotationX = Math.max(-Math.PI/3, Math.min(Math.PI/3, getCameraRotationX()));
            setCameraRotationX(rotationX);
            
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        }
    });

    // Zoom
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const newDistance = getCameraDistance() + e.deltaY * 0.01;
        setCameraDistance(Math.max(10, Math.min(50, newDistance)));
    });

    // Clic sur les villes
    canvas.addEventListener('click', (e) => {
        if (!getIsMouseDown()) {
            const mouse = new THREE.Vector2();
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            
            const intersects = raycaster.intersectObjects(cities, true);
            if (intersects.length > 0) {
                let cityGroup = intersects[0].object;
                while (cityGroup.parent && cityGroup.parent !== scene) {
                    cityGroup = cityGroup.parent;
                }
                selectCity(cityGroup);
            }
        }
    });

    // Redimensionnement
    window.addEventListener('resize', () => {
        const camera = getCamera();
        const renderer = getRenderer();
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}