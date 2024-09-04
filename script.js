document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('titleInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('title', titleInput.value);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Upload successful!');
            displayContent(data.fileUrl, data.title);
        } else {
            alert('Upload failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displayContent(fileUrl, title) {
    const contentGrid = document.getElementById('contentGrid');
    const newCard = document.createElement('div');
    newCard.className = 'video-card';

    const newImage = document.createElement('img');
    newImage.src = fileUrl;
    newImage.alt = title;

    const newTitle = document.createElement('h3');
    newTitle.textContent = title;

    newCard.appendChild(newImage);
    newCard.appendChild(newTitle);
    contentGrid.appendChild(newCard);
}
