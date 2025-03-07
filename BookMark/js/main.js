var siteName = document.getElementById('SiteName');
var siteURL = document.getElementById('SiteUrl');
var addBtn = document.getElementById('addBtn');
var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal-content");
var btnClose = document.querySelector(".btn-close");
var textWrong = document.querySelectorAll(".text-wrong");
var table = document.getElementsByTagName("table");

var urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
var btnDelete;
var btnVisit;
var bookmark = [];

if (localStorage.getItem("Website") !== null) {
  bookmark = JSON.parse(localStorage.getItem("Website"));
  displayBookmarks();
}

function createBookmark() {
  if (siteName.value.length < 3 || urlRegex.test(siteURL.value) == false) {
    console.log(urlRegex.test(siteURL.value));
    modal.classList.add("show");
    modal.classList.add("bg-black");
    modal.classList.add("bg-opacity-25");
    modal.style.display = "block";
    btnClose.addEventListener("click", function () {
      modal.classList.remove("show");
      modal.classList.remove("bg-black");
      modal.classList.remove("bg-opacity-25");
      modal.style.display = "none";
    });
    modal.addEventListener("click", function () {
      modal.style.display = "none";
    });
    modalContent.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    document.addEventListener("keyup", function (e) {
      if (e.code == "Escape") {
        modal.style.display = "none";
      }
    });
  } else {
    addBtn.removeAttribute("data-bs-toggle", "modal");
    addBtn.removeAttribute("data-bs-target", "#modalId");
    var site = {
      name: siteName.value,
      URL: siteURL.value,
    };
    bookmark.push(site);

    localStorage.setItem("Website", JSON.stringify(bookmark));

    clearForm();

    displayBookmarks();
  }
}
addBtn.addEventListener("click", function () {
  createBookmark();
});

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove("is-valid");
  siteName.classList.remove("form-control-right");
  siteURL.classList.remove("is-valid");
  siteURL.classList.remove("form-control-right");
}
function displayBookmarks() {
  tbody = "";
  for (i = 0; i < bookmark.length; i++) {
    tbody += `
    <tr class=""> 
    <td scope="row">${i + 1}</td>
    <td>${bookmark[i].name}</td>
    <td>
    <a href="${!bookmark[i].URL.startsWith("https://") &&
        !bookmark[i].URL.startsWith("http://") ? `https://${bookmark[i].URL}` : bookmark[i].URL
      }" target= "_blank" >
    <button type="button" id ="btn-visit" class="btn btn-success" ><i class="fa-solid fa-eye "></i> </button></a>
    </td>
    <td>
      <button type="button" id = "btn-delete" class="btn btn-danger " onclick="deleteBookmark(${i});"><i class="fa-solid fa-trash-can "></i></button>
    </td>
    </tr>`;
  }
  document.querySelector("#tbody").innerHTML = tbody;
}
siteName.addEventListener("keyup", function () {
  if (siteName.value.length < 3) {
    siteName.classList.add("is-invalid");
    siteName.classList.add("form-control-wrong");
    textWrong[0].classList.remove("d-none");
  } else {
    siteName.classList.replace("is-invalid", "is-valid");
    siteName.classList.replace("form-control-wrong", "form-control-right");
    textWrong[0].classList.add("d-none");
  }
});
siteURL.addEventListener("keyup", function () {
  if (urlRegex.test(siteURL.value) == false) {
    siteURL.classList.add("is-invalid");
    siteURL.classList.add("form-control-wrong");
    textWrong[1].classList.remove("d-none");
  } else {
    siteURL.classList.replace("is-invalid", "is-valid");
    siteURL.classList.replace("form-control-wrong", "form-control-right");
    textWrong[1].classList.add("d-none");
  }
});
btnDelete = document.querySelector("#btn-delete");
btnVisit = document.querySelector("#btn-visit");

function deleteBookmark(index) {
  bookmark.splice(index, 1);
  localStorage.setItem("Website", JSON.stringify(bookmark));
  displayBookmarks();
}