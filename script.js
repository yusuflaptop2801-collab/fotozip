const imageInput = document.getElementById("imageInput");
const compressBtn = document.getElementById("compressBtn");
const result = document.getElementById("result");
const preview = document.getElementById("preview");
const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const downloadLink = document.getElementById("downloadLink");

quality.addEventListener("input", () => {
    qualityValue.textContent = quality.value + "%";
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
});

compressBtn.addEventListener("click", () => {

    const file = imageInput.files[0];

    if (!file) {
        alert("Pilih foto terlebih dahulu!");
        return;
    }

    const originalSize = file.size;

    const reader = new FileReader();

    reader.onload = function(event) {

        const img = new Image();

        img.onload = function() {

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const compressed = canvas.toDataURL(
                "image/jpeg",
                quality.value / 100
            );

            downloadLink.href = compressed;
            downloadLink.download = "hasil-kompres.jpg";
            downloadLink.style.display = "inline-block";

            const compressedSize =
                Math.round((compressed.length * 3) / 4);

            const originalKB =
                (originalSize / 1024).toFixed(2);

            const compressedKB =
                (compressedSize / 1024).toFixed(2);

            const saved =
                (
                    ((originalSize - compressedSize) /
                    originalSize) * 100
                ).toFixed(1);

            result.innerHTML = `
                <br>
                📁 Sebelum: ${originalKB} KB
                <br><br>
                📦 Sesudah: ${compressedKB} KB
                <br><br>
                💾 Hemat: ${saved}%
            `;
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});