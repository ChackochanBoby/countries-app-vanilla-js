const cardContainer = document.getElementById("card-container")

function CreateCard(data) {
    //create card and add tailwind classes
    const card = document.createElement("article")
    card.classList.add("rounded-md", "overflow-hidden", "bg-emerald-50", "flex", "flex-col", "p-2","shadow-black", "shadow-lg")

    //create card image and tailwind classes
    const cardImg = document.createElement("img")
    cardImg.classList.add("block", "w-full")

    //set src for card img using conditionals 
    if (data.imgUrl) {
        cardImg.src = data.imgUrl
    }
    else {
        cardImg.src = "./assets/placeholder.jpg"
    }
    // create imgContainer,add tailwind classes, append cardImg and append imgContainer to card
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("flex", "flex-row", "align-middle", "rounded-md", "overflow-hidden", "aspect-video", "justify-center")
    imgContainer.appendChild(cardImg)
    card.appendChild(imgContainer)

    // create countryName, add tailwind classes and set innerHtml
    const countryName = document.createElement("h2")
    countryName.classList.add("text-2xl", "text-black", "text-center", "uppercase")
    countryName.innerHTML = data.name

    // create region, add tailwind classes and set innerHtml
    const region = document.createElement("p")
    region.classList.add("text-lg", "text-black", "capitalize")
    region.innerHTML = `Region: ${data.region}`

    // create cardBody , add tailwind classes ,append countryName and region, and append cardBody to card
    const cardBody = document.createElement("div")
    cardBody.classList.add("w-full", "mt-2", "px-2")
    cardBody.appendChild(countryName)
    cardBody.appendChild(region)
    card.appendChild(cardBody)

    //append card to cardContainer
    cardContainer.appendChild(card)
}
async function getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = await response.json()
    const countries = data.map(country => (
        {
            "name": country.name.common,
            "imgUrl": country.flags.png,
            "region": country.continents
        }
    ))
    countries.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }
    })
    countries.forEach(country=>CreateCard(country));
}
getCountries()