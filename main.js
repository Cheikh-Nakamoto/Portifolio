import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Initialisation de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Chargement de la texture
const texture = new THREE.TextureLoader().load("/assets/models/mario.png");
const material = new THREE.MeshPhongMaterial({ map: texture });

// Ajout de la lumière
const light = new THREE.PointLight(0xeeeeee);
light.position.set(0, 4, 4);
scene.add(light);

// Chargement du modèle .glb
const loader = new GLTFLoader();
loader.load(
    "assets/models/mario.glb", // Remplacez par le chemin de votre fichier .glb
    function (gltf) {
        // Parcourir tous les objets du modèle chargé
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                // Récupérer la géométrie du mesh
                const geometry = child.geometry;

                // Créer un nouveau mesh avec la géométrie récupérée et le matériau
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                // Positionner la caméra
                camera.position.set(0, 3, 5);
                camera.lookAt(mesh.position);
            }
        });
    },
    undefined, // Callback de progression (optionnel)
    function (error) {
        console.error("Une erreur s'est produite lors du chargement du modèle.", error);
    }
);

// Fonction de rendu (boucle d'animation)
function loop() {
    requestAnimationFrame(loop);

    // Faire tourner le mesh si nécessaire
    scene.traverse(function (child) {
        if (child.isMesh) {
            child.rotation.y += 0.03;
            
        }
    });

    renderer.render(scene, camera);
}

loop();