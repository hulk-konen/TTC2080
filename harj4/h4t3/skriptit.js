async function getNames() {
    let url = 'nimet.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderHouses() {
    let houses = await getNames();
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


/*
   Given the below JSON object, construct a live search filter module
       - Begin with no results
       - As the user types, display a list of matches below the line in real time
*/

var vehicles = {
  '123456789ABC': {
      year: '2001',
      make: 'Chevrolet',
      model: 'tahoe',
      type: 'suv'
  },
      '123456789DEF': {
      year: '2010',
      make: 'chevrolet',
      model: 'tahoe',
      type: 'SUV'
  },
      '123456789GHI': {
      year: '2008',
      make: 'GMC',
      model: 'Surburban',
      type: 'SUV'
  },
      '123456789JKL': {
      year: '2003',
      make: 'Chevrolet',
      model: 'Silverado',
      type: 'Truck'
  },
      '123456789MNO': {
      year: '2004',
      make: 'Cadillac',
      model: 'CTX',
      type: 'car'
  },
      '123456789PQR': {
      year: '2007',
      make: 'GMC',
      model: 'Sierra',
      type: 'truck'
  },
      '123456789STU': {
      year: '2010',
      make: 'Chevrolet',
      model: 'Corvette',
      type: 'Car'
  }
};

$(function () {

  function check_key_event(key_event) {
      // Early exit if key event is not alphanumeric or backspace

      if (!(key_event > 47 && key_event < 58 || key_event > 64 && key_event < 92 || key_event == 8 || key_event === undefined)) {
          return false;
      }
      return true;
  }

  function append_to_results(element, tag, tag2, key, value) {
      // Append list item to results list

      var record = String(key);

      jQuery.each(value, function (key, value) {
          record += (' ' + value);
      });

      $(element).append($(tag).append($(tag2).append(record)));
  }

  function compare_search_term_to_data_set(input_val, key, value) {
      // Compare search term to result set key name and value

      var match = false;

      match = (key.toLowerCase().indexOf(input_val.toLowerCase()) >= 0) ? true : false;

      jQuery.each(value, function (key, value) {
          if (value.toLowerCase().indexOf(input_val.toLowerCase()) >= 0) {
              match = true;
          }
      });

      if (match) {
          append_to_results('.results', '<tr class="match">', '<td>', key, value);
      }
  }

  function search_autocomplete() {
      // Search the list of vehicles and autocomplete the search term

      var key_event = event.which;
      var input_val = $(this).val();

      console.log(key_event);

      // If key pressed is not alphanumeric or backspace, early exit
      if (!check_key_event(key_event)) {
          return false;
      }

      // Clear list of results
      $('.match').remove();

      jQuery.each(vehicles, function (key, value) {

          // Compare search term to result set name
          if (input_val) {
              var match = compare_search_term_to_data_set(input_val, key, value);
          }
      });
  }

  // Add event handler to the input field
  $('.search_term').on('keyup blur change paste cut reset submit', search_autocomplete);


  //--- SPECS -------------------------
  describe("Live Search", function () {

      it("Specifies a JSON Object", function () {
          expect(vehicles).toBeDefined();
      });

      it("Only allowes certain keys to be pressed", function () {
          expect(check_key_event(50)).toBe(true);
      });

      it("Appends search matches to results", function () {
          var TestObj = {};
          TestObj.test_append = append_to_results;
          spyOn(TestObj, 'test_append');
          TestObj.test_append('.results',
              '<tr class="match">',
              '<td>',
              '123456789ABC',
          vehicles['123456789ABC']);
          expect(TestObj.test_append).toHaveBeenCalledWith('.results',
              '<tr class="match">',
              '<td>',
              '123456789ABC',
              vehicles['123456789ABC']);
      });

      it("Compares the search term to the data set", function () {
          var TestObj = {};
          TestObj.test_compare = compare_search_term_to_data_set;
          spyOn(TestObj, 'test_compare');
          TestObj.test_compare('2009',
                               '123456789ABC',
                               vehicles['123456789ABC']);
          expect(TestObj.test_compare).toHaveBeenCalledWith('2009',
                                       '123456789ABC',
                                       vehicles['123456789ABC']);
      });
      
      it("Performs a search autocomplete", function() {
          var TestObj = {};
          TestObj.autocomplete = search_autocomplete;
          spyOn(TestObj, 'autocomplete');
          TestObj.autocomplete();
          expect(TestObj.autocomplete).toHaveBeenCalled();
      });
  });
});