const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fileInput = document.querySelector('#input-image');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const image = new Image();
    image.addEventListener('load', () => {
      const offscreenCanvas = new OffscreenCanvas(image.width * 2, image.height * 2);
      const offscreenCtx = offscreenCanvas.getContext('2d');
      offscreenCtx.drawImage(image, 0, 0, image.width * 2, image.height * 2);
      const upscaledImage = offscreenCanvas.transferToImageBitmap();

      const canvas = document.createElement('canvas');
      canvas.width = image.width * 2;
      canvas.height = image.height * 2;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(upscaledImage, 0, 0);
      const upscaledImageData = canvas.toDataURL('image/jpeg');

      const a = document.createElement('a');
      a.download = 'upscaled-image.jpeg';
      a.href = upscaledImageData;
      a.click();
    });
    image.src = reader.result;
  });

  reader.readAsDataURL(file);
});
