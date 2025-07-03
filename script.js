document.getElementById('imageUpload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById('preview');
    img.src = e.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

