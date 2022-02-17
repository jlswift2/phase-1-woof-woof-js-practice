document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/pups")
    .then(src => src.json())
    .then(pups => pups.forEach(pup => renderPup(pup)))



    const dogBar = document.getElementById('dog-bar')

    //set up dog-info
    const dogInfo = document.querySelector('#dog-info')
    let pupImage = document.createElement('img')
    let pupName = document.createElement('h2')
    let goodBadButton = document.createElement('button')
    dogInfo.append(pupImage, pupName, goodBadButton)


    function renderPup(pup){
        let pupBarInsert = document.createElement('span');
        pupBarInsert.textContent = pup.name
        pupBarInsert.addEventListener('click', () => presentPup(pup))

        dogBar.appendChild(pupBarInsert)
    }


    function presentPup(pup) {
        pupImage.src = pup.image
        pupName.textContent = pup.name

        if(pup.isGoodDog){
            goodBadButton.textContent = "Good Dog!"
        } else {
            goodBadButton.textContent = "Bad Dog!" 
        }
        
        goodBadButton.addEventListener('click', e => {
            changeDogButton(pup)
            e.preventDefault()
        })
    }

    function changeDogButton(pup) {
        
        if(pup.isGoodDog === true) {
            goodBadButton.textContent = "Bad Dog!"
            pup.isGoodDog = false

        } else if(pup.isGoodDog === false) {
            goodBadButton.textContent = "Good Dog!"
            pup.isGoodDog = true
        }
 
        return fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"isGoodDog": pup.isGoodDog}),
        })
        .then(resp => resp.json())
        .then(dog => console.log(dog))
    }
})