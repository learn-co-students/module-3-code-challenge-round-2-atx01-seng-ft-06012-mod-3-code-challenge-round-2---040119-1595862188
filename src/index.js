const beerURL = 'http://localhost:3000/beers'


document.addEventListener('DOMContentLoaded', () => {
    console.log('i am so loaded.....and by loaded, well....you know what I mean')
  
    getBeerInfo();
  })

function getBeerInfo(){
    fetch(beerURL)
    .then(response => response.json())
    .then(beerInfo => eachBeer(beerInfo))
}

function eachBeer(beerInfo){
    beerInfo.forEach(beer => {
        listBeerNames(beer)
    })
}

function listBeerNames(beer){
    const listGroup = document.getElementById('list-group')
    const beerNameLi = document.createElement("li")
    beerNameLi.className = "list-group-item"
    beerNameLi.innerText = `${beer.name}`
    listGroup.appendChild(beerNameLi)
    beerNameLi.addEventListener("click", e => {
        getMoreInfo(beer)
    })
}

function getMoreInfo(beer){
    fetch(`${beerURL}/${beer.id}`)
    .then(response => response.json())
    .then(beerDetails => showMoreInfo(beerDetails))
}

function showMoreInfo(beerDetails){
    const moreBeerInfo = document.getElementById("beer-detail")
    moreBeerInfo.innerHTML = `
        <h1>${beerDetails.name}</h1>
        <img src="${beerDetails.image_url}">
        <h3>${beerDetails.tagline}</h3>
        <p>Brewer's Tips: <i>"${beerDetails.brewers_tips}"</i></p>
        <p>Contributed By: <b>${beerDetails.contributed_by}</b></p>
        `
    let description = document.createElement("textarea")
    description.value = `${beerDetails.description}`
    moreBeerInfo.appendChild(description)

    const saveButton = document.createElement("button")
    saveButton.id = "edit-beer"
    saveButton.className = "btn btn-info"
    saveButton.innerText = "Save"
    moreBeerInfo.appendChild(saveButton)
    saveButton.addEventListener("click", event => {
        updateDescription(description, beerDetails)
    })
}

function updateDescription(description, beerDetails){
    description = description.value
    fetch(`${beerURL}/${beerDetails.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
           description: description
        })
    })
}
