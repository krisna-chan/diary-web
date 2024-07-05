// ----------|Dynamically insert Navigation bar |---------------//
const header = document.querySelector("header"); 
const navTitle = 'Laazy diary';

header.innerHTML = `
<div class="nav-title-content">
<h1 class="nav-title">
${navTitle}
</h1>
</div>`;

