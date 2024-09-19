let photoData = [];

document.getElementById('takePhotoBtn').addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();
                document.body.appendChild(video);

                const takePhoto = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const photoURL = canvas.toDataURL('image/png');
                    savePhoto(photoURL);
                    video.pause();
                    video.srcObject.getTracks().forEach(track => track.stop());
                    document.body.removeChild(video);
                };

                setTimeout(takePhoto, 3000); // Tirar foto após 3 segundos
            })
            .catch(() => {
                document.getElementById('uploadPhotoInput').click();
            });
    } else {
        document.getElementById('uploadPhotoInput').click();
    }
});

document.getElementById('uploadPhotoInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        savePhoto(e.target.result);
    };
    reader.readAsDataURL(file);
});

document.getElementById('markLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            showMap(latitude, longitude);
        }, () => {
            const manualLocation = prompt("Insira a localização manualmente (latitude, longitude):");
            const [latitude, longitude] = manualLocation.split(',').map(Number);
            showMap(latitude, longitude);
        });
    } else {
        const manualLocation = prompt("Insira a localização manualmente (latitude, longitude):");
        const [latitude, longitude] = manualLocation.split(',').map(Number);
        showMap(latitude, longitude);
    }
});

document.getElementById('saveBtn').addEventListener('click', () => {
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const photoURL = localStorage.getItem('currentPhoto');
    const location = localStorage.getItem('currentLocation');
    const date = new Date().toLocaleString();

    if (title && photoURL && location) {
        const id = photoData.length + 1;
        const photoRecord = { id, title, description, location, date, photoURL };
        photoData.push(photoRecord);
        localStorage.setItem('photoData', JSON.stringify(photoData));
        displayPhotos();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

function savePhoto(photoURL) {
    localStorage.setItem('currentPhoto', photoURL);
    document.getElementById('photoContainer').innerHTML = `<img src="${photoURL}" alt="Foto">`;
}

function showMap(latitude, longitude) {
    const mapURL = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    localStorage.setItem('currentLocation', `${latitude},${longitude}`);
    document.getElementById('mapContainer').innerHTML = `<iframe src="${mapURL}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
}

function displayPhotos() {
    const photoTableBody = document.querySelector('#photoTable tbody');
    photoTableBody.innerHTML = '';
    photoData.forEach(photo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${photo.id}</td>
            <td>${photo.title}</td>
            <td>${photo.description}</td>
            <td>${photo.location}</td>
            <td>${photo.date}</td>
            <td>
                <button onclick="viewPhoto(${photo.id})">Ver</button>
                <button onclick="editPhoto(${photo.id})">Editar</button>
                <button onclick="deletePhoto(${photo.id})">Excluir</button>
            </td>
        `;
        photoTableBody.appendChild(row);
    });
}

function viewPhoto(id) {
    const photo = photoData.find(p => p.id === id);
    if (photo) {
        const modal = document.getElementById('modal');
        const modalDetails = document.getElementById('modalDetails');
        modalDetails.innerHTML = `
            <img src="${photo.photoURL}" alt="Foto">
            <p><strong>Título:</strong> ${photo.title}</p>
            <p><strong>Descrição:</strong> ${photo.description}</p>
            <p><strong>Localização:</strong> ${photo.location}</p>
            <p><strong>Data:</strong> ${photo.date}</p>
        `;
        modal.style.display = 'block';
    }
}

function editPhoto(id) {
    const photo = photoData.find(p => p.id === id);
    if (photo) {
        document.getElementById('titleInput').value = photo.title;
        document.getElementById('descriptionInput').value = photo.description;
        localStorage.setItem('currentPhoto', photo.photoURL);
        localStorage.setItem('currentLocation', photo.location);
        document.getElementById('photoContainer').innerHTML = `<img src="${photo.photoURL}" alt="Foto">`;
        const [latitude, longitude] = photo.location.split(',').map(Number);
        showMap(latitude, longitude);
    }
}

function deletePhoto(id) {
    if (confirm('Tem certeza que deseja excluir esta foto?')) {
        photoData = photoData.filter(photo => photo.id !== id);
        localStorage.setItem('photoData', JSON.stringify(photoData));
        displayPhotos();
    }
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.onclick = (event) => {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

// Carregar dados do localStorage ao iniciar
window.onload = () => {
    const storedPhotoData = localStorage.getItem('photoData');
    if (storedPhotoData) {
        photoData = JSON.parse(storedPhotoData);
        displayPhotos();
    }
};
