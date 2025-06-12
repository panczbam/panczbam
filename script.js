// Animowane serduszka i sakury
const shapes = ["💜", "💖", "🌸", "💚", "💗", "🌺", "💞"];
function createFloatingShape(extra=false) {
  const shape = document.createElement("span");
  shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
  shape.style.position = "absolute";
  shape.style.left = `${Math.random() * 100}vw`;
  shape.style.fontSize = `${20 + Math.random() * 30}px`;
  shape.style.top = "-30px";
  shape.style.opacity = 0.8 + Math.random() * 0.2;
  shape.style.transition = "top 6s linear, opacity 6s linear, left 6s linear";
  (extra ? document.getElementById("extra-hearts") : document.getElementById("floating-shapes")).appendChild(shape);

  let endLeft = Math.max(0, Math.min(98, parseFloat(shape.style.left) + (Math.random()-0.5)*15));
  setTimeout(() => {
    shape.style.top = "100vh";
    shape.style.left = endLeft+"vw";
    shape.style.opacity = 0;
  }, 50);
  setTimeout(() => shape.remove(), 6500);
}
setInterval(()=>createFloatingShape(false), 400);

// Latające ikony (z losowym startem i klikaniem)
function animateFlyingIcon(icon, idx, total) {
  let x = Math.random() * (window.innerWidth * 0.18) + 12;
  let y = 60 + idx * (window.innerHeight / (total+1)) + Math.random()*50;
  icon.style.left = x + "px";
  icon.style.top = y + "px";
  let dx = (Math.random() - 0.5) * 1.4, dy = (Math.random() - 0.5) * 1.4;
  function move() {
    x += dx; y += dy;
    if (x < 5 || x > window.innerWidth * 0.22) dx = -dx;
    if (y < 30 || y > window.innerHeight - 110) dy = -dy;
    icon.style.left = x + "px";
    icon.style.top = y + "px";
    icon._iconAnim = requestAnimationFrame(move);
  }
  icon._iconAnim = requestAnimationFrame(move);
}
function enableFlyingIcons() {
  let icons = Array.from(document.querySelectorAll('.icon'));
  icons.forEach((icon, idx) => animateFlyingIcon(icon, idx, icons.length));
}

// Losowe pastelowe okienka na tle
const randomWindowTexts = [
  {bar:"Are you in love?",content:"<button class='mini-btn'>Yeees!</button> <button class='mini-btn'>No :(</button>"},
  {bar:"Do you want to be happy?",content:"<button class='mini-btn'>Yes</button> <button class='mini-btn'>No</button>"},
  {bar:"Attention!",content:"You need to fall in love!<br><button class='mini-btn'>Okay</button>"},
  {bar:"GAME OVER!",content:"Try again later!"},
  {bar:"Loading...",content:"<progress value='7' max='10' style='width:80%;'></progress>"},
  {bar:"my_love",content:"💜"},
  {bar:"my_music",content:"🎶"},
  {bar:"my_computer",content:"💻"},
  {bar:"my_documents",content:"📁"}
];
function spawnRandomWindow() {
  const win = document.createElement("div");
  win.className = "random-popup";
  const txt = randomWindowTexts[Math.floor(Math.random()*randomWindowTexts.length)];
  win.innerHTML = `
    <div class="bar">${txt.bar}<button class="close">✕</button></div>
    <div class="content">${txt.content}</div>
  `;
  const x = Math.random()*(window.innerWidth-260), y = Math.random()*(window.innerHeight-140);
  win.style.left = x+"px";
  win.style.top = y+"px";
  win.querySelector(".close").onclick = e => {
    win.remove();
    setTimeout(spawnRandomWindow, 800 + Math.random()*1000);
  };
  document.getElementById("random-windows").appendChild(win);
}
for(let i=0;i<4;i++) spawnRandomWindow();

window.addEventListener("DOMContentLoaded", function(){
  // start ikon
  enableFlyingIcons();

  // Od razu wyświetl wiadomość powitalną
  showModal("welcome-modal");

  // Wiadomość przewijalna
  const welcomeContent = document.getElementById("welcome-content");
  const okBtn = document.getElementById("welcome-ok");
  welcomeContent.addEventListener('scroll', function() {
    if (welcomeContent.scrollTop + welcomeContent.clientHeight >= welcomeContent.scrollHeight - 5) {
      okBtn.style.display = "inline-block";
    }
  });
  if (welcomeContent.scrollHeight <= welcomeContent.clientHeight + 5) {
    okBtn.style.display = "inline-block";
  }
  okBtn.onclick = () => { hideModal("welcome-modal"); tryAutoplayMusic(); };
  document.getElementById("close-welcome").onclick = () => { hideModal("welcome-modal"); tryAutoplayMusic(); };
  document.getElementById("icon-message").onclick = () => { showModal("welcome-modal"); };

  // Quiz — przewijany
  document.getElementById("icon-docs").onclick = () => { showModal("quiz-modal"); };
  document.getElementById("close-quiz").onclick = () => { hideModal("quiz-modal"); };
  document.getElementById("quiz-form").onsubmit = function(e){
    e.preventDefault();
    const ans = {
      q1: this.q1.value.trim().toLowerCase(),
      q2: this.q2.value.trim().toLowerCase(),
      q3: this.q3.value.trim().toLowerCase(),
      q4: this.q4.value.trim().toLowerCase(),
      q5: this.q5.value.trim().toLowerCase(),
      q6: this.q6.value.trim()
    };
    let correct = 0;
    if(ans.q1 === "mandu") correct++;
    if(ans.q2 === "fifi") correct++;
    if(ans.q3 === "dionysus") correct++;
    if(ans.q4 === "life goes on") correct++;
    if((ans.q5.includes("jeno")) && (ans.q5.includes("the bat") || ans.q5.includes("bat"))) correct++;
    // Pytanie 6 zawsze zaliczone
    correct++;

    const quizResult = document.getElementById("quiz-result");
    if(correct === 6){
      quizResult.innerHTML = "🥳 Wszystko poprawnie! Odbierz swój certyfikat!";
      setTimeout(() => {
        hideModal("quiz-modal");
        showModal("cert-modal");
      }, 1100);
    } else {
      quizResult.innerHTML = "😢 Coś poszło nie tak, spróbuj jeszcze raz!";
    }
  };

  document.getElementById("close-cert").onclick = () => { hideModal("cert-modal"); };
  document.getElementById("download-cert").onclick = function(e) {
    e.preventDefault();
    html2canvas(document.querySelector(".cert-content")).then(canvas => {
      let lnk = document.createElement('a');
      lnk.download = 'certyfikat_marty.png';
      lnk.href = canvas.toDataURL();
      lnk.click();
    });
  };

  document.getElementById("icon-music").onclick = () => { window.open("https://drive.google.com/file/d/1EbU08xF1yjfINQ7hIJthSiCB3yP6jxiz/view?usp=drive_link","_blank"); };

  // Efekt "my_love"
  let meowSounds = [
    "https://cdn.pixabay.com/audio/2022/03/15/audio_11c1b1a3e7.mp3",
    "https://cdn.pixabay.com/audio/2022/03/15/audio_1156db9b7f.mp3",
    "https://cdn.pixabay.com/audio/2022/03/15/audio_11c03c93d0.mp3"
  ];
  document.getElementById("icon-love").onclick = () => {
    document.getElementById("love-effect").style.display = "flex";
    setTimeout(()=>document.getElementById("big-heart").classList.add("pop"),100);
  };
  document.getElementById("big-heart").onclick = () => {
    let snd = new Audio(meowSounds[Math.floor(Math.random()*meowSounds.length)]);
    snd.play();
    for(let i=0;i<25;i++) setTimeout(()=>createFloatingShape(true), i*80);
    setTimeout(()=>{ document.getElementById("love-effect").style.display = "none"; }, 1900);
  };

  // Miniodtwarzacz – muzyka gra od razu, play/pauza działa
  let music = document.getElementById('bg-music');
  let toggle = document.getElementById('music-toggle');
  let label = document.getElementById('music-label');
  let triedAutoplay = false;

  // Funkcja próbująca włączyć muzykę
  function tryAutoplayMusic() {
    if (triedAutoplay) return;
    triedAutoplay = true;
    music.volume = 0.5;
    music.play().then(updateMusicState).catch(() => {
      // Nie udało się? Poczekaj na jakiekolwiek kliknięcie użytkownika
      document.body.addEventListener('click', manualPlayMusicOnce, { once: true });
    });
  }
  function manualPlayMusicOnce() {
    music.play().then(updateMusicState).catch(()=>{});
  }

  function updateMusicState(){
    if(music.paused){
      toggle.innerText = "▶️";
      label.innerText = "Muzyka pauzowana";
    }else{
      toggle.innerText = "⏸️";
      label.innerText = "Muzyka gra";
    }
  }
  window.playMusic = function(){
    tryAutoplayMusic();
  }
  toggle.onclick = function(){
    if(music.paused) music.play().then(updateMusicState).catch(()=>{});
    else music.pause();
    updateMusicState();
  };
  music.onplay = updateMusicState;
  music.onpause = updateMusicState;

  // Jeśli użytkownik kliknie gdziekolwiek na stronie i muzyka nie gra – spróbuj ją odpalić
  document.body.addEventListener('click', tryAutoplayMusic);

});

// Okno modal - helpers
function showModal(id) {
  document.getElementById(id).style.display = "block";
}
function hideModal(id) {
  document.getElementById(id).style.display = "none";
}

// html2canvas loader
(function(){
  var s = document.createElement('script');
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  document.head.appendChild(s);
})();
