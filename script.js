let model, labelContainer, maxPredictions;

// Load the model
async function loadModel() {
  const URL = "my_model/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  console.log("Model loaded");
}

// Handle image upload
document.getElementById('imageUpload').addEventListener('change', async function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    const img = document.getElementById('preview');
    img.src = e.target.result;
    img.style.display = 'block';

    // Wait for image to load before predicting
    img.onload = async () => {
      const prediction = await model.predict(img);
      const top = prediction.reduce((a, b) => (a.probability > b.probability) ? a : b);
  
      const resultBox = document.getElementById("resultBox");

    // Clear previous class
    resultBox.classList.remove("result-ok", "result-scrap");

    const percent = (top.probability * 100).toFixed(1) + "%";

    if (top.className.toLowerCase().includes("ok") && top.probability >= 0.8) {
     resultBox.textContent = `✅ OK (${percent})`;
     resultBox.classList.add("result-ok");
    } else {
     resultBox.textContent = `❌ Scrap (${percent})`;
     resultBox.classList.add("result-scrap");
    }

    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    };
  };
  reader.readAsDataURL(file);
});

// Load model on page load
window.addEventListener("load", loadModel);

