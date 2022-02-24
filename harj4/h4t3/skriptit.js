
async function getNames() {
  let url = 'nimet.json';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function showList() {
  let data =  await getNames();
  results.innerHTML = "";
  data
    .filter((item) => {
      return item.toLowerCase().includes(search_term, 0)
    })
    .forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = `<i>Name:</i> ${e}`;
      results.appendChild(li);
    });
};

showList();



var ul = document.getElementById('results');
var liSelected;
var index = -1;

document.addEventListener('keydown', function(event) {
  var len = ul.getElementsByTagName('li').length - 1;
  if (event.which === 40) {
    index++;
    //down 
    if (liSelected) {
      removeClass(liSelected, 'selected');
      next = ul.getElementsByTagName('li')[index];
      if (typeof next !== undefined && index <= len) {

        liSelected = next;
      } else {
        index = 0;
        liSelected = ul.getElementsByTagName('li')[0];
      }
      addClass(liSelected, 'selected');
      console.log(index);
    } else {
      index = 0;

      liSelected = ul.getElementsByTagName('li')[0];
      addClass(liSelected, 'selected');
    }
  } else if (event.which === 38) {

    //up
    if (liSelected) {
      removeClass(liSelected, 'selected');
      index--;
      console.log(index);
      next = ul.getElementsByTagName('li')[index];
      if (typeof next !== undefined && index >= 0) {
        liSelected = next;
      } else {
        index = len;
        liSelected = ul.getElementsByTagName('li')[len];
      }
      addClass(liSelected, 'selected');
    } else {
      index = 0;
      liSelected = ul.getElementsByTagName('li')[len];
      addClass(liSelected, 'selected');
    }
  }
}, false);

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};