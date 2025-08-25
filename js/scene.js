import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { 
    getScene, setScene, 
    getCamera, setCamera, 
    getRenderer, setRenderer,
    getCameraRotationX, getCameraRotationY, getCameraDistance,
    getSelectedCity, getIsMouseDown,getCities
} from './main.js';

export function setupScene() {
    // Scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    
    // Brouillard pour l'atmosphère
    scene.fog = new THREE.Fog(0x87CEEB, 50, 100);
    setScene(scene);

    // Caméra
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 25);
    setCamera(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('webgl'),
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    setRenderer(renderer);

    // Éclairage
    setupLighting();
}

function setupLighting() {
    const scene = getScene();
    
    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Soleil
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 500;
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.bottom = -100;
    scene.add(sun);
}

export function createTerrain() {
    const scene = getScene();
    
    // Base terrain
    const terrainGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    terrainGeometry.rotateX(-Math.PI / 2);
    
    // Déformation du terrain pour plus de relief
    const positions = terrainGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const y = Math.sin(positions.getX(i) * 0.05) * Math.cos(positions.getZ(i) * 0.05) * 2;
        positions.setY(i, y);
    }
    positions.needsUpdate = true;
    terrainGeometry.computeVertexNormals();

    const terrainMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x7cb342,
        wireframe: false
    });
    
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.receiveShadow = true;
    scene.add(terrain);
}

export function createEnvironment() {
    const scene = getScene();
    
    // Nuages
    for (let i = 0; i < 10; i++) {
        const cloudGroup = new THREE.Group();
        
        for (let j = 0; j < 3; j++) {
            const cloudGeometry = new THREE.SphereGeometry(Math.random() * 2 + 1, 8, 6);
            const cloudMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xffffff,
                transparent: true,
                opacity: 0.6
            });
            const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);
            cloudPart.position.set(
                (Math.random() - 0.5) * 4,
                0,
                (Math.random() - 0.5) * 4
            );
            cloudGroup.add(cloudPart);
        }
        
        cloudGroup.position.set(
            (Math.random() - 0.5) * 100,
            Math.random() * 10 + 15,
            (Math.random() - 0.5) * 100
        );
        scene.add(cloudGroup);
    }

    // Arbres décoratifs
    for (let i = 0; i < 30; i++) {
        const treeGroup = new THREE.Group();
        
        // Tronc
        const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 2);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1;
        treeGroup.add(trunk);
        
        // Feuillage
        const leavesGeometry = new THREE.SphereGeometry(1, 8, 6);
        const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 2.5;
        treeGroup.add(leaves);
        
        treeGroup.position.set(
            (Math.random() - 0.5) * 80,
            0,
            (Math.random() - 0.5) * 80
        );
        scene.add(treeGroup);
    }
}

export function updateCamera() {
    const camera = getCamera();
    const cameraRotationX = getCameraRotationX();
    const cameraRotationY = getCameraRotationY();
    const cameraDistance = getCameraDistance();
    
    const x = Math.cos(cameraRotationY) * Math.cos(cameraRotationX) * cameraDistance;
    const y = Math.sin(cameraRotationX) * cameraDistance + 10;
    const z = Math.sin(cameraRotationY) * Math.cos(cameraRotationX) * cameraDistance;
    
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
}

export function animateScene() {
    const renderer = getRenderer();
    const scene = getScene();
    const camera = getCamera();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Mise à jour de la caméra si pas de ville sélectionnée
        const selectedCity = getSelectedCity();
        const isMouseDown = getIsMouseDown();
        
        if (!selectedCity || !isMouseDown) {
            updateCamera();
        }
        
        // Animation des villes
        const cities = getCities();
        cities.forEach((city, index) => {
            city.rotation.y += 0.005;
            city.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        renderer.render(scene, camera);
    }
    animate();
}