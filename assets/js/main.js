const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC-PLAYER';

// Lấy các phần tử HTML
const playSong = $('.play_song');
const listTop = $('.list_top');
const listTrend = $('.list_trend-container');
const listSong = $('.trend_block');
const listFavourite = $('.favourite_block');
const playSongBlock = $('.play_song-block');
const playListBlock =$('.play_list-block');
const itemSong = $$('.trend_link');
const imgThub = $('.song_img-avatar');
const songNameCurrent = $('.song_name');
const artistNameCurrent = $('.song_artist');
const audio = $('#audio');

// Lấy các nút điều khiển
const playBtn = $('.song_control-play');
const nextBtn = $('.song_control-next');
const backBtn = $('.song_control-back');
const randomBtn = $('.song_control-random');
const replayBtn = $('.song_control-replay');

const controlBtn = $$('.nav_list-link');

const progress = $('#progress');
let btnBack = $('.play_back-icon');


// Cờ

const app = {
  isPlaying: true,
  currentIndex: 0,
  clickBack: true,
  isRandom: false,
  isReplay: false,
  isActiveSong: false,
  indexRemoveActive: NaN,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setconfig: function(key, value){
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      id: '1',
      name: 'Gió',
      singer: 'Jank',
      path: './assets/music/gio.mp3',
      image: './assets/img/song/gio.jpg'
    },
    {
      id: '2',
      name: 'Hẹn em ở lần yêu thứ 2',
      singer: 'Nguyenn, Đặng Tuấn Vũ',
      path: './assets/music/hen_em_o_lan_yeu_thu_hai.mp3',
      image: './assets/img/song/hen_em_o_lan_yeu_thu_hai.jpg'
    },
    {
      id: '3',
      name: 'Thật ra em chẳng thương anh vậy đâu',
      singer: 'Nguyenn, Đặng Tuấn Vũ',
      path: './assets/music/that_ra_em_chang_thuong_anh_vay_dau.mp3',
      image: './assets/img/song/that_ra_em_chang_thuong_anh_vay_dau.jpg'
    },
    {
      id: '4',
      name: 'Nếu lúc đó',
      singer: 'Tlinh',
      path: './assets/music/neu_luc_do.mp3',
      image: './assets/img/song/neu_luc_do.jpg'
    },
    {
      id: '5',
      name: 'Lửng lơ Remix',
      singer: 'Masew, Bray, RedT, Ý Tiên',
      path: './assets/music/lung_lo.mp3',
      image: './assets/img/song/lung_lo.jpg'
    },
    {
      id: '6',
      name: 'Không thể say',
      singer: 'HIEUTHUHAI',
      path: './assets/music/khong_the_say.mp3',
      image: './assets/img/song/khong_the_say.jpg'
    },
    {
      id: '7',
      name: 'Ưng quá chừng!',
      singer: 'Amee',
      path: './assets/music/ung_qua_chung.mp3',
      image: './assets/img/song/ung_qua_chung.jpg'
    }
  ],
  defineProperties: function(){
    Object.defineProperty(this, 'currentSong', {
      get: function (){
        return this.songs[this.currentIndex];
      }
    })
  },
  render: function() {
    const htmls = this.songs.map(song   =>{
      return `
        <li class="trend_item" data-index="${song.id - 1}">
          <a href="#" class="trend_link">
              <span class="trend_song">
                <span class="trend_song-number">${'0' + song.id}</span>
                <span class="trend_song-img" style="background-image: url(${song.image});"></span>
                <span class="trend_song-dic">
                  <span class="trend_song-name">${song.name}</span>
                  <span class="trend_song-act">
                    <span>
                      <i class="ti-user"></i>
                    </span>
                    <span>${song.singer}</span>
                  </span>
                </span>
              </span>
              <span class="trend_time">
                <span class="trend_time-song">03:24</span>
                <span class="trend_option">
                  <span class="trend_option-icon">
                    <i class="ti-heart"></i>
                  </span>
                  <span class="trend_option-icon --icon-op">
                    <i class="ti-more-alt"></i>
                  </span>
                </span>
              </span>
          </a>
        </li>
      `
    });
    $('.trend_list').innerHTML = htmls.join('');
  },
  handleEvent: function() {
    const _this = this;
    // Xử lí sự kiện click vào bài hát
    function clickSong() {
      if(_this.clickBack){
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
        controlBtn[0].classList.remove('active');
        controlBtn[1].classList.add('active');

      } else {
        controlBtn[0].classList.add('active');
        controlBtn[1].classList.remove('active');
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
        _this.clickBack = !_this.clickBack;
      };
    };
    // Xử lí sự kiện khi bấm trở về trang chủ tìm kiếm
    function backHome() {
     _this.clickBack = !_this.clickBack;
     clickSong(); 
     audio.pause();
    };
    // Xử lí CD quay và dừng
    const cdThubAnimate = imgThub.animate([
      {
        transform: 'rotate(360deg)',
      }
    ], {
      duration: 10000, //10 seconds
      iterations: Infinity,
    });
    cdThubAnimate.pause();
    let item = $$('.trend_item');
    item.forEach(function(value) {
      value.addEventListener('click', clickSong);
      value.addEventListener('click', returnIndex);
      value.addEventListener('click', activeSong);
    })
    // Xử lí bấm vào back trở lại phần không chơi nhạc
    btnBack.addEventListener('click', backHome);
    // Xử lí click play bài hát
    playBtn.onclick = function() {
      if(_this.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    };
    // Xử lí khi song được play
    audio.onplay = function() {
      _this.isPlaying = false;
      playBtn.classList.add('playing');
      cdThubAnimate.play();
    }
    // Xử lí khi song bị pause
    audio.onpause = function() {
      _this.isPlaying = true;
      playBtn.classList.remove('playing');
      cdThubAnimate.pause();
    }
    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function() {
      if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
      }
    }
    // Xử lí khi tua song
    progress.onchange = function(e) {
      const seekTime = audio.duration / 100 * e.target.value;
      audio.currentTime = seekTime;
    }
    // Xử lí khi next song
    nextBtn.onclick = function() {
      if(_this.isRandom){
        _this.playRandomSong();
      } else {
        _this.nextSong();
        item[_this.currentIndex].click();
      }
      audio.play();
    }
    // Xử lí khi back song
    backBtn.onclick = function() {
      if(_this.isRandom){
        _this.playRandomSong();
      } else {
        _this.backSong();
        item[_this.currentIndex].click();
      }
      audio.play();
    }
    // Xử lí khi random song
    randomBtn.onclick = function() {
      _this.isRandom = !_this.isRandom;
      _this.setconfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle('active', _this.isRandom);
    }
    // Xử lí next song khi bài hát kết thúc
    audio.onended = function(){
      if(_this.isReplay){
        audio.play();
      } else {
        nextBtn.click();
      }
    }
    // Xử lí lặp lại 1 bài hát
    replayBtn.onclick = function() {
      _this.isReplay = !_this.isReplay;
      _this.setconfig('isReplay', _this.isReplay);
      replayBtn.classList.toggle('active', _this.isReplay);
    }
    // Xử lí trả về index của một bài hát
    function returnIndex(e){
      let elementNode = e.target.closest('.trend_item:not(.active)');
      if(elementNode || e.target.closest('.trend_option-icon')){
        // Xử lí khi click vào song
        if(elementNode){
          _this.currentIndex = elementNode.dataset.index;
          _this.loadCurrentSong();
          audio.play();
        }
        // Xử lí khi click vào song option
        if(e.target.closest('.trend_option-icon')){
          // Code here
        }
      }
    }
    // Xử lí active song
    function activeSong(e) {
      let elementNode = e.target.closest('.trend_item');
      let elementIndex = Number(e.target.closest('.trend_item').dataset.index);
      elementNode.classList.add('active');
      _this.indexRemoveActive = elementIndex;
      item.forEach(function(value,index){
        if(_this.indexRemoveActive !== index){
          return value.classList.remove('active');
        }
      })
    }
    // Hoạt ảnh banner home
    const banner = $$('.banner_img');

  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".trend_item.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadConfig: function(){
    this.isRandom = this.config.isRandom;
    this.isReplay = this.config.isReplay;
  },
  loadCurrentSong: function(){
    songNameCurrent.textContent = this.currentSong.name;
    artistNameCurrent.textContent = this.currentSong.singer;
    imgThub.style.backgroundImage  = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function() {
    this.currentIndex++
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  backSong: function() {
    this.currentIndex--
    if(this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function() {
    let item = $$('.trend_item');
    let newCurrent;
    do{
      newCurrent = Math.floor(Math.random() * this.songs.length)
    } while (newCurrent === this.currentIndex)
    this.currentIndex = newCurrent;
    this.loadCurrentSong();
    item[this.currentIndex].click();
  },
  start: function() {
    // Load cấu hình setting trang web
    this.loadConfig();
    // Định nghĩa các thuộc tính của app
    this.defineProperties();
    // Render playlist
    this.render();
    // Hiển thị trạng thái cấu hình setting trang web 
    randomBtn.classList.toggle('active', this.isRandom);
    replayBtn.classList.toggle('active', this.isReplay);
    // Lắng nghe / xử lí các sự kiện (DOM events)
    this.handleEvent();
    // Xử lí khi click phát các bài hát
    this.loadCurrentSong();
    // Xử lí song luôn nằm trong màn hình hiển thị
    // this.scrollToActiveSong();
    
  },
}

app.start();