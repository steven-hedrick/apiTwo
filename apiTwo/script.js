const input = document.getElementById("input");

input.addEventListener("keydown", function(event) {
    if(event.key == "Enter")
        loadImg();
});

document.getElementsByClassName("fa fa-search")[0].addEventListener("click",loadImg);

function loadImg()
{
    removeImages()
    const url = "https://api.unsplash.com/search/photos?query='"+input.value+"'&per_page=12&client_id=oz4-tw4vDuQKMRVnQ639iPrNBHeEfqME5dZKcB8NXe4"

    fetch(url)

    .then((response) => {
        if (response.ok)
            return response.json();


        else
            console.log(response.status);
    })

    .then(data =>{
        createImageArray(data);
    })
}

function createImageArray(data)
{
    const imageNodes = [];
    for(let i = 0;i < data.results.length;i++)
    {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage = "url("+data.results[i].urls.raw+")";
        imageNodes[i].addEventListener("click", function() {
            window.open(data.results[i].links.download, '_blank');
        })
        document.getElementById("grid").insertAdjacentElement("beforeend", imageNodes[i]);
    }
}

function removeImages()
{
    var i = 0;
    var list = document.getElementById("grid");

    while(i < list.childNodes.length)
    {
        list.removeChild(list.childNodes[i]);
    }
}