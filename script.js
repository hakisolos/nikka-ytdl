document.getElementById('downloadBtn').addEventListener('click', async () => {
    const url = document.getElementById('url').value.trim();
    const format = document.querySelector('input[name="format"]:checked').value;
    const message = document.getElementById('message');
    const videoDetailsContainer = document.getElementById('videoDetails');

    // Reset message and details
    message.textContent = '';
    videoDetailsContainer.innerHTML = '';

    if (!url) {
        message.textContent = 'Please enter a valid YouTube URL!';
        return;
    }

    message.textContent = 'Fetching video details...';

    try {
        const response = await axios.get(`http://localhost:3000/download/${format}?url=${encodeURIComponent(url)}`);

        const data = response.data;

        if (!data.success) {
            message.textContent = 'Failed to fetch video details. Please try again.';
            return;
        }

        const { title, quality, thumbnail, download_url } = data.result;

        if (!download_url) {
            message.textContent = 'No download link found.';
            return;
        }

        const detailsHTML = `
            <div class="video-details">
                <img src="${thumbnail}" alt="Video Thumbnail">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Quality:</strong> ${quality}</p>
            </div>
        `;
        videoDetailsContainer.innerHTML = detailsHTML;
        videoDetailsContainer.style.display = 'block';

        // Automatically start the download
        const link = document.createElement('a');
        link.href = download_url;
        link.download = `${title}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        message.textContent = 'An error occurred while fetching the video.';
    }
});
