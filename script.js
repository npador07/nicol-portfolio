const owner = 'npador07';
const repo = 'nicol-porfolio';
const getProjectsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;
const gridContainerHTML = document.getElementById('grid-container-HTML');
const gridContainerJS = document.getElementById('grid-container-javascript');



async function fetchProjects(path = `projects`) {
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
        
        results.push(item.path);
        
      }
    }

  } catch (error) {
    console.error('Fetch failed:', error);
    
  }
  //filter to make return only 1
  // add code so that it will load all projects upon loading the page
  // still trying to figure it out
  return results;
   
}
window.onload = async function () {
  const allProjects = await fetchProjects();  // get all index.html file paths
  console.log(allProjects);

  // Clear existing grid content
  gridContainerHTML.innerHTML = "";
  gridContainerJS.innerHTML = "";

  for (const projectPath of allProjects) {
    const parts = projectPath.split("/"); 
    const projectName = parts[parts.length - 2];   
    const projectLink = `https://npador07.github.io/nicol-porfolio/${projectPath}`;

    // Fetch the index.html file to extract description
    let description = "";
    try {
      const response = await fetch(projectLink);
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");

      // Look for <meta name="description">
      const meta = doc.querySelector('meta[name="description"]');
      if (meta) {
        description = meta.getAttribute("content");
      }
    } catch (err) {
      console.warn(`No description found for ${projectName}`);
    }

    // Build grid item
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.innerHTML = `
      <a href="${projectLink}" target="_blank">${projectName}</a>
      <p>${description}</p>
    `;

    // Sort into category
    if (parts[parts.length - 3] === "HTML and CSS (Responsive Web Design)") {
      gridContainerHTML.appendChild(gridItem);
    } 
    else if (parts[parts.length - 3] === "JavaScript Algorithms and Data Structures") {
      gridContainerJS.appendChild(gridItem);
    }
  }
}


const gridClick = document.querySelectorAll(".grid-item");

gridClick.forEach(gridClick => {
    gridClick.addEventListener("click", ()=> {
       console.log(fetchProjects());
    });
}  );


//button code
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

