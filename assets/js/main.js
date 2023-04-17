const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy các phần tử HTML
const song = $$('.trend_item');
const playSong = $('.play_song');
const listTop = $('.list_top');
const listTrend = $('.list_trend-container');
const listSong = $('.trend_block');
const listFavourite = $('.favourite_block');
const playSongBlock = $('.play_song-block');
const playListBlock =$('.play_list-block');

let btnBack = $('.play_back-icon');


// Cờ
let clickBackTrue = true;

const app = {
  render: function() {

  },
  handleEvent: function() {
    // Xử lí sự kiện click vào bài hát
    function clickSong() {
        // listTrend.classList.remove('c-8');
        // listSong.classList.remove('c-8');
        // listTrend.classList.add('c-12');
        // listSong.classList.add('c-12');
        // playSongBlock.classList.add('c-4');
        // playListBlock.classList.add('c-8');
      if(clickBackTrue){
        listTop.style.display = 'none';
        listFavourite.style.display = 'none';
        btnBack.style.display = 'block';
        playSong.style.display = 'block';
        listTrend.classList.remove('c-8');
        listSong.classList.remove('c-8');
        listTrend.classList.add('c-12');
        listSong.classList.add('c-12');
        playSongBlock.classList.add('c-4');
        playListBlock.classList.add('c-8');
      } else {
        btnBack.style.display = 'none';
        playSong.style.display = 'none';
        listTop.style.display = 'block';
        listFavourite.style.display = 'block';
        listTrend.classList.add('c-8');
        listSong.classList.add('c-8');
        listTrend.classList.remove('c-12');
        listSong.classList.remove('c-12');
        playSongBlock.classList.remove('c-4');
        playListBlock.classList.remove('c-8');
        clickBackTrue = !clickBackTrue;
      };
    };
    let lengthSong = song.length;
    for(let i = 0; i < lengthSong; i++){
      song[i].addEventListener('click', clickSong);
    }
    // Xử lí sự kiện khi bấm trở về trang chủ tìm kiếm
    function backHome() {
     clickBackTrue = !clickBackTrue;
     clickSong(); 
    }
    btnBack.addEventListener('click', backHome);
  },
  start: function() {
    this.render();
    this.handleEvent();
  },
}

app.start();