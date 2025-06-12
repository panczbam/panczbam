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

  // Lekko przesuwaj w bok podczas spadania
  let endLeft = Math.max(0, Math.min(98, parseFloat(shape.style.left) + (Math.random()-0.5)*15));
  setTimeout(() => {
    shape.style.top = "100vh";
    shape.style.left = endLeft+"vw";
    shape.style.opacity = 0;
  }, 50);
  setTimeout(() => shape.remove(), 6500);
}
setInterval(()=>createFloatingShape(false), 400);

// Latające przyciski (odbijanie od boków)
function animateFlyingBtn(btn) {
  let x = Math.random() * (window.innerWidth * 0.7), y = Math.random() * (window.innerHeight * 0.55);
  let dx = (Math.random() - 0.5) * 7, dy = (Math.random() - 0.5) * 7;
  function move() {
    x += dx; y += dy;
    if (x < 0 || x > window.innerWidth - btn.offsetWidth - 30) dx = -dx;
    if (y < 0 || y > window.innerHeight - btn.offsetHeight - 30) dy = -dy;
    btn.style.transform = `translate(${x}px,${y}px)`;
    btn._flyingAnim = requestAnimationFrame(move);
  }
  btn.onmouseenter = () => { btn._flyingAnim && cancelAnimationFrame(btn._flyingAnim); };
  btn.onmouseleave = () => { btn._flyingAnim = requestAnimationFrame(move); };
  btn._flyingAnim = requestAnimationFrame(move);
}
function enableFlyingBtns() {
  document.querySelectorAll('.flying-btn').forEach(animateFlyingBtn);
}

// Okienka: otwieranie
function showModal(id) {
  document.getElementById(id).style.display = "block";
  setTimeout(enableFlyingBtns, 80);
}
function hideModal(id) {
  document.getElementById(id).style.display = "none";
  document.querySelectorAll('.flying-btn').forEach(btn => {
    btn.style.transform = ""; if(btn._flyingAnim) cancelAnimationFrame(btn._flyingAnim);
  });
}

// OKNO powitalne — przewijanie i serduszko
window.addEventListener("DOMContentLoaded", function(){
  showModal("welcome-modal");
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
  okBtn.onclick = () => { hideModal("welcome-modal"); playMusic(); };
  document.getElementById("close-welcome").onclick = () => { hideModal("welcome-modal"); playMusic(); };
  // Ikona "my_computer" też otwiera wiadomość
  document.getElementById("icon-message").onclick = () => { showModal("welcome-modal"); };

  // Quiz okienko
  document.getElementById("icon-docs").onclick = () => { showModal("quiz-modal"); };
  document.getElementById("close-quiz").onclick = () => { hideModal("quiz-modal"); };
  document.getElementById("quiz-form").onsubmit = function(e){
    e.preventDefault();
    const ans = {
      q1: this.q1.value.trim().toLowerCase(),
      q2: this.q2.value.trim().toLowerCase(),
      q3: this.q3.value.trim().toLowerCase(),
      q4: this.q4.value.trim().toLowerCase(),
      q5: this.q5.value.trim().toLowerCase()
    };
    let correct = 0;
    if(ans.q1 === "mandu") correct++;
    if(ans.q2 === "fifi") correct++;
    if(ans.q3.includes("dionizos")) correct++;
    if(ans.q4.includes("life goes on")) correct++;
    if(ans.q5.includes("jeno") && ans.q5.includes("the bud")) correct++;
    const quizResult = document.getElementById("quiz-result");
    if(correct === 5){
      quizResult.innerHTML = "🥳 Wszystko poprawnie! Odbierz swój certyfikat!";
      setTimeout(() => {
        hideModal("quiz-modal");
        showModal("cert-modal");
      }, 1100);
    } else {
      quizResult.innerHTML = "😢 Coś poszło nie tak, spróbuj jeszcze raz!";
    }
  };

  // Certyfikat zamykanie i pobieranie
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

  // Ikona muzyki = tuśtracki
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
    // Miauczenie
    let snd = new Audio(meowSounds[Math.floor(Math.random()*meowSounds.length)]);
    snd.play();
    // Deszcz serduszek!
    for(let i=0;i<25;i++) setTimeout(()=>createFloatingShape(true), i*80);
    setTimeout(()=>{ document.getElementById("love-effect").style.display = "none"; }, 1900);
  };

  // Miniodtwarzacz
  let music = document.getElementById('bg-music');
  let toggle = document.getElementById('music-toggle');
  let label = document.getElementById('music-label');
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
    try{ music.play(); }catch{}
    updateMusicState();
  }
  toggle.onclick = function(){
    if(music.paused) music.play();
    else music.pause();
    updateMusicState();
  };
  music.onplay = updateMusicState;
  music.onpause = updateMusicState;
  // Autoplay na mobile
  music.volume = 0.5;
  try{ music.play(); }catch{}
  document.body.onclick = () => { music.play(); };

  enableFlyingBtns();
});

// html2canvas loader (do zrzutu certyfikatu)
(function(){
  var s = document.createElement('script');
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  document.head.appendChild(s);
})();
