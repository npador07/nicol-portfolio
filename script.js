const owner = 'npador07';
const repo = 'nicol-porfolio';
const getProjectsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;

async function fetchProjects(path = "projects") {
  let results = [];
  try {
    const response = await fetch(`${getProjectsUrl}${path}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    for (const item of data) {
      if (item.type === "dir") {
       const subResults = await fetchProjects(item.path);
       if (Array.isArray(subResults)){
       results = results.concat(subResults);
       }
      } else if (item.name.toLowerCase() === "index.html") {
        // 📄 Found an index.html
        results.push(item.path);
      }
    }

  } catch (error) {
    console.error('Fetch failed:', error);
    
  }
  
  return console.log(results);
    
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

  // Simple email regex for .com validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address that ends with .com");
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

