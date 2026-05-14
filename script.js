document.addEventListener("DOMContentLoaded", () => {
  const sectionSelect = document.getElementById("sectionSelect");
  const searchInput = document.getElementById("searchInput");
  const themeToggle = document.getElementById("themeToggle");
  const sections = document.querySelectorAll(".section");
  const boxes = document.querySelectorAll(".box");

  if (!sectionSelect || !searchInput || !themeToggle) {
    return;
  }

  const updateSectionVisibility = (selected) => {
    sections.forEach((section) => {
      if (!selected || section.id === selected) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  };

  const updateSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    boxes.forEach((box) => {
      const keywords = box.getAttribute("data-keywords") || "";
      const title = box.querySelector(".box-title")?.textContent.toLowerCase() || "";
      const content = box.querySelector(".box-content")?.textContent.toLowerCase() || "";
      const matches =
        keywords.toLowerCase().includes(query) ||
        title.includes(query) ||
        content.includes(query);

      box.classList.toggle("hidden", query && !matches);
    });

    sections.forEach((section) => {
      const visibleBoxes = section.querySelectorAll('.box:not(.hidden)');
      if (query && visibleBoxes.length === 0) {
        section.classList.remove('active');
      } else if (!query || visibleBoxes.length > 0) {
        section.classList.add('active');
      }
    });
  };

  sections.forEach((section) => section.classList.add("active"));
  sectionSelect.value = "";

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙" : "☀️";
  });

  sectionSelect.addEventListener("change", function () {
    updateSectionVisibility(this.value);
  });

  searchInput.addEventListener("input", updateSearch);
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
  const content = box.querySelector(".box-content")?.textContent || "";
  navigator.clipboard.writeText(content).then(() => {
    const original = btn.textContent;
    btn.textContent = "Másolva!";
    setTimeout(() => (btn.textContent = original), 1500);
  });
}
