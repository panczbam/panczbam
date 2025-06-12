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
  shape.style.transition = "top 6s linear, opacity 6s linear";
  document.getElementById("floating-shapes").appendChild(shape);

  setTimeout(() => {
    shape.style.top = "100vh";
    shape.style.opacity = 0;
  }, 50);
  setTimeout(() => shape.remove(), 6500);
}
setInterval(createFloatingShape, 500);

// Okienko retro powitalne + quiz, certyfikat itp.
window.addEventListener("DOMContentLoaded", function(){
  document.getElementById("welcome-modal").style.display = "flex";

  // Przyciski zamykania
  const heartBtn = document.getElementById("xp-heart-btn");
  const xpBody = document.getElementById("xp-body");

  // Funkcja pokazująca serduszko po przewinięciu do dołu
  xpBody.addEventListener('scroll', function() {
    if (xpBody.scrollTop + xpBody.clientHeight >= xpBody.scrollHeight - 5) {
      heartBtn.style.display = "block";
    }
  });
  // Jeśli na małych ekranach cała wiadomość się mieści, pokaż od razu
  if (xpBody.scrollHeight <= xpBody.clientHeight + 5) {
    heartBtn.style.display = "block";
  }

  heartBtn.onclick = () => {
    document.getElementById("welcome-modal").style.display = "none";
    document.getElementById("bg-music").play();
  };

  // Quiz
  const quizBtn = document.getElementById("quiz-btn");
  const quizModal = document.getElementById("quiz-modal");
  const closeQuiz = document.getElementById("close-quiz");
  quizBtn.onclick = () => { quizModal.style.display = "flex"; };
  closeQuiz.onclick = () => { quizModal.style.display = "none"; };

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
        quizModal.style.display = "none";
        document.getElementById("cert-modal").style.display = "flex";
      }, 1200);
    } else {
      quizResult.innerHTML = "😢 Coś poszło nie tak, spróbuj jeszcze raz!";
    }
  };

  // Certyfikat zamykanie
  document.getElementById("close-cert").onclick = () => {
    document.getElementById("cert-modal").style.display = "none";
  };

  // Przygotuj pobieranie certyfikatu (zrzut ekranu)
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
  // Auto-play na mobile może wymagać interakcji użytkownika
  document.body.onclick = () => { bgMusic.play(); };
});

// Quiz button uciekający na hover
const quizBtn = document.getElementById("quiz-btn");
let moveTimeout = null;
quizBtn.onmouseover = function(){
  clearTimeout(moveTimeout);
  quizBtn.style.transition = "transform 0.22s cubic-bezier(0.55, 1.7, 0.7, 0.9)";
  let x = (Math.random()-0.5) * 300;
  let y = (Math.random()-0.5) * 80;
  quizBtn.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random()*14-7)}deg)`;
  moveTimeout = setTimeout(() => {
    quizBtn.style.transform = "";
  }, 1500);
};
quizBtn.onmouseleave = function(){
  clearTimeout(moveTimeout);
  quizBtn.style.transform = "";
};

// html2canvas loader (do zrzutu certyfikatu)
(function(){
  var s = document.createElement('script');
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  document.head.appendChild(s);
})();
