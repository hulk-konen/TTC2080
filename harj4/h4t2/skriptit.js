async function getHouses() {
    let url = 'talotiedot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderHouses() {
    let houses = await getHouses();
    var nelioCheck = document.getElementById("neliot");
    var euroCheck = document.getElementById("eurot");
    
    let housediv = document.getElementById("houses");
    housediv.innerHTML = "";

    var filtered = houses;

    if (nelioCheck.checked == true && euroCheck.checked == true){

        filtered = houses.filter(function (entry) {
        return entry.price < 1000000 && entry.size < 200;
        });
        
      } else if (nelioCheck.checked == true && euroCheck.checked == false){

        filtered = houses.filter(function (entry) {
        return entry.size < 200;
        });
        
      } else if (nelioCheck.checked == false && euroCheck.checked == true){

        filtered = houses.filter(function (entry) {
        return entry.price < 1000000;
        });
        
      } else if (nelioCheck.checked == false && euroCheck.checked == false){

        filtered.filter(function (entry) {
        return entry.size > 0;
        });       
      } 


    filtered.forEach(house => {     
 
        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let koko = document.createElement('p');
        koko.className = 'size';
        koko.innerHTML = house.size + " m2";

        let kuvaus = document.createElement('p');
        kuvaus.className = 'text';
        kuvaus.innerHTML = house.text;

        let hinta = document.createElement('p');
        hinta.className = 'price';
        let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
        hinta.innerHTML = numberstr + " euroa";

        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(koko);
        housecontainer.appendChild(kuvaus);
        housecontainer.appendChild(hinta);

        housediv.appendChild(housecontainer); 
    });    
}