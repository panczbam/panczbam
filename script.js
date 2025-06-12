// Animowane serduszka i sakury
const shapes = ["💜", "💖", "🌸", "💚", "💗", "🌺", "💞"];
function createFloatingShape() {
  const shape = document.createElement("span");
  shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
  shape.style.position = "absolute";
  shape.style.left = `${Math.random() * 100}vw`;
  shape.style.fontSize = `${20 + Math.random() * 30}px`;
  shape.style.top = "-30px";
  shape.style.opacity = 0.8 + Math.random() * 0.2;
  shape.style.transition = "top 6s linear, opacity 6s linear, left 6s linear";
  document.getElementById("floating-shapes").appendChild(shape);

  // Lekko przesuwaj w bok podczas spadania
  let endLeft = Math.max(0, Math.min(98, parseFloat(shape.style.left) + (Math.random()-0.5)*15));
  setTimeout(() => {
    shape.style.top = "100vh";
    shape.style.left = endLeft+"vw";
    shape.style.opacity = 0;
  }, 50);
  setTimeout(() => shape.remove(), 6500);
}
setInterval(createFloatingShape, 350);

// Okienka: otwieranie
function showModal(id) {
  document.getElementById(id).style.display = "block";
}
function hideModal(id) {
  document.getElementById(id).style.display = "none";
}

// Okienko powitalne — przewijanie i serduszko
window.addEventListener("DOMContentLoaded", function(){
  showModal("welcome-modal");
  const welcomeContent = document.querySelector("#welcome-content .retro-scroll");
  const okBtn = document.getElementById("welcome-ok");
  welcomeContent.addEventListener('scroll', function() {
    if (welcomeContent.scrollTop + welcomeContent.clientHeight >= welcomeContent.scrollHeight - 5) {
      okBtn.style.display = "inline-block";
    }
  });
  if (welcomeContent.scrollHeight <= welcomeContent.clientHeight + 5) {
    okBtn.style.display = "inline-block";
  }
  okBtn.onclick = () => { hideModal("welcome-modal"); document.getElementById("bg-music").play(); };
  document.getElementById("close-welcome").onclick = () => { hideModal("welcome-modal"); document.getElementById("bg-music").play(); };
  // Ikona "my_computer" też otwiera wiadomość
  document.getElementById("icon-message").onclick = () => { showModal("welcome-modal"); };

  // Quiz okienko
  document.getElementById("quiz-btn").onclick = () => { showModal("quiz-modal"); };
  document.getElementById("close-quiz").onclick = () => { hideModal("quiz-modal"); };
  document.getElementById("icon-music").onclick = () => { window.open("https://drive.google.com/file/d/1EbU08xF1yjfINQ7hIJthSiCB3yP6jxiz/view?usp=drive_link","_blank"); };
  document.getElementById("icon-docs").onclick = () => { showModal("quiz-modal"); };
  document.getElementById("icon-love").onclick = () => { showModal("cert-modal"); };
  document.getElementById("close-cert").onclick = () => { hideModal("cert-modal"); };
  // Quiz walidacja
  const quizForm = document.getElementById("quiz-form");
  const quizResult = document.getElementById("quiz-result");
  quizForm.onsubmit = function(e){
    e.preventDefault();
    const ans = {
      q1: quizForm.q1.value.trim().toLowerCase(),
      q2: quizForm.q2.value.trim().toLowerCase(),
      q3: quizForm.q3.value.trim().toLowerCase(),
      q4: quizForm.q4.value.trim().toLowerCase(),
      q5: quizForm.q5.value.trim().toLowerCase()
    };
    let correct = 0;
    if(ans.q1 === "mandu") correct++;
    if(ans.q2 === "fifi") correct++;
    if(ans.q3.includes("dionizos")) correct++;
    if(ans.q4.includes("life goes on")) correct++;
    if(ans.q5.includes("jeno") && ans.q5.includes("the bud")) correct++;

    if(correct === 5){
      quizResult.innerHTML = "🥳 Wszystko poprawnie! Odbierz swój certyfikat!";
      setTimeout(() => {
        hideModal("quiz-modal");
        showModal("cert-modal");
      }, 1200);
    } else {
      quizResult.innerHTML = "😢 Coś poszło nie tak, spróbuj jeszcze raz!";
    }
  };
  // Certyfikat pobieranie
  document.getElementById("download-cert").onclick = function(e) {
    e.preventDefault();
    html2canvas(document.querySelector(".cert-content")).then(canvas => {
      let lnk = document.createElement('a');
      lnk.download = 'certyfikat_marty.png';
      lnk.href = canvas.toDataURL();
      lnk.click();
    });
  };

  // Muzyka w tle
  const bgMusic = document.getElementById('bg-music');
  bgMusic.volume = 0.5;
  try { bgMusic.play(); } catch {}
  document.body.onclick = () => { bgMusic.play(); };

  // Przycisk quizowy — szybkie wędrowanie
  const quizBtn = document.getElementById("quiz-btn");
  let moveTimeout = null;
  function moveQuizBtn() {
    const x = Math.random() * (window.innerWidth - quizBtn.offsetWidth - 80);
    const y = 80 + Math.random() * (window.innerHeight - quizBtn.offsetHeight - 180);
    quizBtn.style.transform = `translate(${x}px, ${y}px)`;
  }
  quizBtn.onmouseover = function(){
    clearTimeout(moveTimeout);
    moveQuizBtn();
    moveTimeout = setInterval(moveQuizBtn, 500);
  };
  quizBtn.onmouseleave = function(){
    clearTimeout(moveTimeout);
    quizBtn.style.transform = "";
  };
});

// html2canvas loader (do zrzutu certyfikatu)
(function(){
  var s = document.createElement('script');
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  document.head.appendChild(s);
})();
