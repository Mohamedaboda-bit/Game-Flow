window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

function toggleMenu(){
  const toggleMenu = document.querySelector('.toggleMenu');
  const nav = document.querySelector('.nav');
  toggleMenu.classList.toggle('active');
  nav.classList.toggle('active');
}

window.addEventListener('scroll',function(){
  var anime = document.querySelector('.animex');

  for(var s =0;s<anime.length; s++){
    var windowheight= window.innerHeight;
    var animetop = anime[s].getBoundingClientRect().top;
    var animepoint=150; 
    if(animetop < windowheight - animepoint ){
      anime[s].classList.add('active');
    }
    else{
      anime[s].classList.remove('active');
    }
  }
})


let list = document.querySelectorAll('.list');
let card = document.querySelectorAll('.card');

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', function() {
      list.forEach(item => item.classList.remove('active'));

      this.classList.add('active');

      let dataFilter = this.getAttribute('data-filter');
      console.log("Filter selected:", dataFilter); 
      if (dataFilter === 'pc') {
          let count = 0;
          card.forEach(c => {
              let itemType = c.getAttribute('data-item');
              console.log("Checking card with type:", itemType);
              if (itemType === 'pc') {
                  if (count < 4) {
                      c.classList.remove('hide');
                      c.classList.add('active');
                      count++;
                  } else {
                      c.classList.add('hide');
                  }
              } else {
                  c.classList.add('hide');
              }
          });
      } 
      else if (dataFilter === 'mobile') {
          card.forEach(c => {
              let itemType = c.getAttribute('data-item');

              if (itemType === 'mobile' && c.classList.contains('hide')) {
                  c.classList.remove('hide');
                  c.classList.add('active');
              } else if (itemType !== 'mobile') {
                  c.classList.add('hide');
              }
          });
      }
  });
}



