const gridClick = document.querySelectorAll(".grid-item");

gridClick.forEach(gridClick => {
    gridClick.addEventListener("click", ()=> {
        console.log("clicked")
    });
}  );
