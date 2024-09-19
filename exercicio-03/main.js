document.getElementById('image-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const quantity = document.getElementById('quantity').value;
    const errorMessage = document.getElementById('error-message');

    if (width < 100 || height < 100) {
        errorMessage.textContent = 'A largura e altura devem ser pelo menos 100 pixels.';
        return;
    }

    errorMessage.textContent = '';
    fetchImages(width, height, quantity);
});

function fetchImages(width, height, quantity) {
    const imagesGrid = document.getElementById('images-grid');
    imagesGrid.innerHTML = '';

    for (let i = 1; i <= quantity; i++) {
        const imgUrl = `https://picsum.photos/${width}/${height}?random=${i}`;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = 'Imagem aleatória';

        const imgLink = document.createElement('a');
        imgLink.href = imgUrl;
        imgLink.textContent = 'Download Full HD';
        imgLink.download = `imagem_${i}.webp`;
        imgLink.target = '_blank'; // Forcing download in browsers that support it

        const copyLinkBtn = document.createElement('a');
        copyLinkBtn.href = '#';
        copyLinkBtn.textContent = 'Copiar Link';
        copyLinkBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(imgUrl).then(() => {
                alert('Link copiado!');
            });
        });

        const shareBtn = document.createElement('a');
        shareBtn.href = `https://wa.me/?text=${encodeURIComponent(imgUrl)}`;
        shareBtn.textContent = 'Compartilhar no WhatsApp';
        shareBtn.target = '_blank';

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links');
        linksContainer.appendChild(imgLink);
        linksContainer.appendChild(copyLinkBtn);
        linksContainer.appendChild(shareBtn);

        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        imageItem.appendChild(img);
        imageItem.appendChild(linksContainer);

        imagesGrid.appendChild(imageItem);
    }
}
