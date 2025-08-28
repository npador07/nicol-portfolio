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
    gridClick.innerHTML = `<p>hahahahahaha</p>`
    gridClick.addEventListener("click", ()=> {
       console.log(fetchProjects());
    });
}  );
