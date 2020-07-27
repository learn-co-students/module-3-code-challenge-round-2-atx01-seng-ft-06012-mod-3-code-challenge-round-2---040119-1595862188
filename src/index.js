const beerUrl = 'http://localhost:3000/beers'
const  oneUrl = 'http://localhost:3000/beers/${beers.id}'

document.addEventListener('DOMContentLoaded', ()=>{

    fetch(beerUrl)
        .then((res)=> res.json())
        .then((json)=> getBeers(json));

});

function getBeers(data){
    // console.log(data[0].name)
    // console.log("test")
    // data.forEach(beers => console.log(beers.name));
    data.forEach(listBeers)
   
}

function listBeers(beers){
    // console.log("here")
    const beerList = document.getElementById('list-group')

    let nameBtn = document.createElement('button')
    nameBtn.innerText = 'Info'
    nameBtn.addEventListener('click', () => {
        clickBeer(beers.id)
    })

    let li = document.createElement('li');
    li.className = 'list-group-item'
    li.id = 'list-item'

    li.innerText = beers.name;

    li.appendChild(nameBtn)
    beerList.appendChild(li)
}

function clickBeer(beer){
    console.log(beer,"why no #2?")

    fetch(`${beerUrl}/${beer}`)
    .then((res) => res.json())
    .then((json)=>beerInfo())

}

function beerInfo(beer){
    const info = document.getElementById("beer-detail")
    console.log('info',beer)
}





