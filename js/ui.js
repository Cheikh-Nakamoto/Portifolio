import { selectCity, focusOnCity, cityData } from './cities.js';
import { getCities } from './main.js';

export function updateCityInfo(cityInfo) {
    document.getElementById('cityName').textContent = cityInfo.name;
    document.getElementById('cityDescription').textContent = cityInfo.description;
    
    const skillsContainer = document.getElementById('citySkills');
    skillsContainer.innerHTML = '';
    
    cityInfo.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    document.getElementById('cityInfo').classList.add('visible');
}

export function setupUIEvents() {
    const cities = getCities();
    
    // Navigation buttons
    document.querySelectorAll('.city-button').forEach(button => {
        button.addEventListener('click', () => {
            const cityKey = button.dataset.city;
            const city = cities.find(c => c.userData.key === cityKey);
            if (city) {
                selectCity(city);
                focusOnCity(city);
            }
        });
    });

    // Bouton projets
    document.getElementById('projectsButton').addEventListener('click', () => {
        const selectedCity = getSelectedCity();
        if (selectedCity) {
            const cityKey = selectedCity.userData.key;
            alert(`Voir les projets pour ${cityData[cityKey].name}`);
            // Ici vous pouvez rediriger vers une page de projets ou afficher une modale
        }
    });
}