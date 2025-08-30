const owner = 'npador07';
const repo = 'nicol-porfolio';
const getProjectsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/projects`;

async function fetchProjects() {
  try {
    const response = await fetch(getProjectsUrl);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // this will list the files/folders inside /projects

    // Example: log only file names
    data.forEach(item => {
      console.log(item.name, item.type, item.download_url);
    });

  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

const gridClick = document.querySelectorAll(".grid-item");

gridClick.forEach(gridClick => {
    gridClick.addEventListener("click", ()=> {
       console.log(fetchProjects());
    });
}  );

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop form from auto-submitting

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (message === "") {
    alert("Please enter a message.");
    return;
  }

  // ✅ Passed validation → submit form
  alert("Form submitted successfully!");
  event.target.submit();
});

