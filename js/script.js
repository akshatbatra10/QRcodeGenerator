const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  reset();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRcode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createButton(saveUrl);
      }, 50);
    }, 1000);
  }
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const generateQRcode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const reset = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
};

const createButton = (url) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = url;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

form.addEventListener("submit", onGenerateSubmit);
