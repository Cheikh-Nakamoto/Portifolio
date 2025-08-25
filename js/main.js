import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { setupScene, createTerrain, createEnvironment, updateCamera, animateScene } from './scene.js';
import { createCities, cityData, selectCity, focusOnCity } from './cities.js';
import { setupUIEvents, updateCityInfo } from './ui.js';
import { setupEventListeners } from './events.js';

// Variables globales avec getters/setters
let _scene, _camera, _renderer;
let _cities = [];
let _selectedCity = null;
let _isMouseDown = false;
let _mouseX = 0, _mouseY = 0;
let _cameraRotationX = 0, _cameraRotationY = 0;
let _cameraDistance = 25;

// Getters pour les variables globales
export const getScene = () => _scene;
export const getCamera = () => _camera;
export const getRenderer = () => _renderer;
export const getCities = () => _cities;
export const getSelectedCity = () => _selectedCity;
export const getIsMouseDown = () => _isMouseDown;
export const getMouseX = () => _mouseX;
export const getMouseY = () => _mouseY;
export const getCameraRotationX = () => _cameraRotationX;
export const getCameraRotationY = () => _cameraRotationY;
export const getCameraDistance = () => _cameraDistance;

// Setters pour les variables modifiables
export const setScene = (scene) => _scene = scene;
export const setCamera = (camera) => _camera = camera;
export const setRenderer = (renderer) => _renderer = renderer;
export const setSelectedCity = (city) => _selectedCity = city;
export const setIsMouseDown = (value) => _isMouseDown = value;
export const setMouseX = (value) => _mouseX = value;
export const setMouseY = (value) => _mouseY = value;
export const setCameraRotationX = (value) => _cameraRotationX = value;
export const setCameraRotationY = (value) => _cameraRotationY = value;
export const setCameraDistance = (value) => _cameraDistance = value;

// Initialisation de l'application
function init() {
    // Configuration de la scène
    setupScene();
    
    // Création du terrain
    createTerrain();
    
    // Création des villes
    createCities();
    
    // Création de l'environnement
    createEnvironment();
    
    // Configuration des événements
    setupEventListeners();
    setupUIEvents();
    
    // Démarrage de l'animation
    animateScene();
    
    // Cacher l'écran de chargement
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 1000);
    }, 2000);
}

// Export des fonctions pour les autres modules
export { init, updateCityInfo, selectCity, focusOnCity, cityData };

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    init();
    console.log("🌍 Univers Portfolio créé avec succès!");
});