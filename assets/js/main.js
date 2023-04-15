const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy các phần tử HTML
const song = $('.trend_item');
const listTop = $('.list_top');
const listTrend = $('.list_trend-container');
const listSong = $('.trend_block');
const listFavourite = $('.favourite_block');
const playSongBlock = $('.play_song-block');
const playListBlock =$('.play_list-block');

const app = {
  render: function() {

  },
  handleEvent: function() {
    // Xử lí sự kiện click vào bài hát
    song.addEventListener('click', function(){
      listTop.style.display = 'none';
      listFavourite.style.display = 'none';
      listTrend.classList.remove('c-8');
      listSong.classList.remove('c-8');
      listTrend.classList.add('c-12');
      listSong.classList.add('c-12');
      playSongBlock.classList.add('c-4');
      playListBlock.classList.add('c-8');
    });
  },
  start: function() {
    this.render();
    this.handleEvent();
  },
}

app.start();