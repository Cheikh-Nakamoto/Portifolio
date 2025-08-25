import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { getScene, getCities, setSelectedCity, getCamera, getCameraRotationY } from './main.js';
import { updateCityInfo } from './ui.js';

// Données des villes (étapes du portfolio)
export const cityData = {
    frontend: {
        name: "🎨 Frontend Valley",
        position: { x: -15, y: 2, z: -10 },
        color: 0xff6b6b,
        description: "La vallée créative où naissent les interfaces utilisateur magnifiques et interactives.",
        skills: ["React", "Vue.js", "TypeScript", "CSS3", "HTML5", "Sass", "Tailwind", "Animation CSS"]
    },
    backend: {
        name: "⚙️ Backend Mountains",
        position: { x: 15, y: 5, z: -5 },
        color: 0x4ecdc4,
        description: "Les montagnes robustes de la logique serveur et des architectures solides.",
        skills: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker"]
    },
    mobile: {
        name: "📱 Mobile Island",
        position: { x: 0, y: 1, z: 15 },
        color: 0x45b7d1,
        description: "L'île innovante des applications mobiles natives et cross-platform.",
        skills: ["React Native", "Flutter", "iOS", "Android", "Expo", "Firebase", "Push Notifications"]
    },
    design: {
        name: "🎭 Design District",
        position: { x: -10, y: 3, z: 8 },
        color: 0x96ceb4,
        description: "Le quartier artistique de l'expérience utilisateur et du design créatif.",
        skills: ["Figma", "Adobe XD", "Photoshop", "UI/UX", "Prototyping", "Design System", "Illustration"]
    },
    data: {
        name: "📊 Data Science City",
        position: { x: 12, y: 2, z: 10 },
        color: 0xfeca57,
        description: "La métropole analytique où les données révèlent leurs secrets.",
        skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Jupyter", "Power BI", "SQL"]
    },
    devops: {
        name: "☁️ DevOps Cloud",
        position: { x: 5, y: 8, z: -15 },
        color: 0xa55eea,
        description: "Les nuages technologiques de l'automatisation et du déploiement continu.",
        skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Jenkins", "Monitoring"]
    }
};

export function createCities() {
    const scene = getScene();
    const cities = getCities();
    
    Object.entries(cityData).forEach(([key, data]) => {
        const cityGroup = new THREE.Group();
        
        // Base de la ville
        const baseGeometry = new THREE.CylinderGeometry(3, 4, 1, 8);
        const baseMaterial = new THREE.MeshPhongMaterial({ 
            color: data.color,
            transparent: true,
            opacity: 0.8
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 0.5;
        base.castShadow = true;
        cityGroup.add(base);

        // Bâtiments principaux
        for (let i = 0; i < 5; i++) {
            const height = Math.random() * 4 + 2;
            const buildingGeometry = new THREE.BoxGeometry(
                Math.random() * 1.5 + 0.5,
                height,
                Math.random() * 1.5 + 0.5
            );
            
            const buildingMaterial = new THREE.MeshPhongMaterial({ 
                color: new THREE.Color().setHSL(
                    Math.random() * 0.3 + 0.1, 
                    0.5, 
                    0.3 + Math.random() * 0.4
                )
            });
            
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            building.position.set(
                (Math.random() - 0.5) * 6,
                height / 2 + 1,
                (Math.random() - 0.5) * 6
            );
            building.castShadow = true;
            cityGroup.add(building);
        }

        // Tour centrale (monument)
        const towerGeometry = new THREE.CylinderGeometry(0.5, 1, 6, 8);
        const towerMaterial = new THREE.MeshPhongMaterial({ 
            color: data.color,
            emissive: new THREE.Color(data.color).multiplyScalar(0.1)
        });
        const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        tower.position.y = 4;
        tower.castShadow = true;
        cityGroup.add(tower);

        // Lumières de la ville
        const cityLight = new THREE.PointLight(data.color, 0.5, 20);
        cityLight.position.set(0, 8, 0);
        cityGroup.add(cityLight);

        // Positionnement
        cityGroup.position.set(data.position.x, data.position.y, data.position.z);
        cityGroup.userData = { key, data };
        
        scene.add(cityGroup);
        cities.push(cityGroup);
    });
}

export function selectCity(cityGroup) {
    const selectedCity = getSelectedCity();
    
    // Désélectionner la ville précédente
    if (selectedCity) {
        selectedCity.children.forEach(child => {
            if (child.material) {
                child.material.emissive.setHex(0x000000);
            }
        });
    }
    
    // Sélectionner la nouvelle ville
    setSelectedCity(cityGroup);
    cityGroup.children.forEach(child => {
        if (child.material) {
            child.material.emissive.setHex(0x444444);
        }
    });
    
    // Afficher les informations
    const cityInfo = cityGroup.userData.data;
    updateCityInfo(cityInfo);
    
    // Mettre à jour les boutons de navigation
    document.querySelectorAll('.city-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.city === cityGroup.userData.key) {
            btn.classList.add('active');
        }
    });
}

export function focusOnCity(cityGroup) {
    const camera = getCamera();
    const cameraRotationY = getCameraRotationY();
    
    // Animation vers la ville
    const targetDistance = 15;
    const cityPos = cityGroup.position;
    
    const animate = () => {
        const currentPos = camera.position.clone();
        const targetPos = new THREE.Vector3(
            cityPos.x + Math.cos(cameraRotationY) * targetDistance,
            cityPos.y + 10,
            cityPos.z + Math.sin(cameraRotationY) * targetDistance
        );
        
        currentPos.lerp(targetPos, 0.05);
        camera.position.copy(currentPos);
        camera.lookAt(cityPos);
        
        if (currentPos.distanceTo(targetPos) > 0.1) {
            requestAnimationFrame(animate);
        }
    };
    animate();
}