const sectionSelect = document.getElementById("sectionSelect");
const searchInput = document.getElementById("searchInput");
const sections = document.querySelectorAll(".section");
const boxes = document.querySelectorAll(".box");
const themeToggle = document.getElementById("themeToggle");

// Show all sections by default
sections.forEach((section) => section.classList.add("active"));

// Theme toggle
themeToggle.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  document.body.setAttribute("data-theme", isDark ? "light" : "dark");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});

// Section dropdown
sectionSelect.addEventListener("change", function () {
  const selected = this.value;
  sections.forEach((section) => {
    if (!selected || section.id === selected) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
});

// Search filter
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  boxes.forEach((box) => {
    const keywords = box.getAttribute("data-keywords") || "";
    const title = box.querySelector(".box-title").textContent.toLowerCase();
    const content = box.querySelector(".box-content").textContent.toLowerCase();
    const matches =
      keywords.includes(query) ||
      title.includes(query) ||
      content.includes(query);
    box.classList.toggle("hidden", query && !matches);
  });
});

function copySnippet(btn) {
  const snippetHeader = btn.closest(".snippet-header");
  const codeElement = snippetHeader?.nextElementSibling?.querySelector("code");
  if (!codeElement) {
    return;
  }

  const content = codeElement.textContent;
  navigator.clipboard.writeText(content).then(() => {
    const original = btn.textContent;
    btn.textContent = "Másolva!";
    setTimeout(() => (btn.textContent = original), 1500);
  });
}

function copyBox(btn) {
  const box = btn.closest(".box");
  const content = box.querySelector(".box-content").textContent;
  navigator.clipboard.writeText(content).then(() => {
    const original = btn.textContent;
    btn.textContent = "Másolva!";
    setTimeout(() => (btn.textContent = original), 1500);
  });
}
