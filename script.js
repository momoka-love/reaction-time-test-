const box = document.getElementById('box');
const result = document.getElementById('result');

let waitingForGreen = false;
let greenTime = 0;
let timeout;

function startTest() {
  result.textContent = '';
  box.textContent = 'wait for cyan...';
  box.className = 'red';
  waitingForGreen = true;

  const delay = Math.floor(Math.random() * 3000) + 2000; // 2–5 sec random wait
  timeout = setTimeout(() => {
    box.textContent = '★ ⋮ go ! ⸝⸝';
    box.className = 'cyan';
    greenTime = performance.now();
  }, delay);
}

function resetTest(message = ' good job ! press space or enter to try again !') {
  waitingForGreen = false;
  clearTimeout(timeout);
  box.className = 'pink';
  box.textContent = message;
  greenTime = 0;
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault(); // prevent scrolling on space

    if (!waitingForGreen) {
      startTest();
    } else {
      const now = performance.now();
      if (greenTime === 0) {
        resetTest('oops, too soon! ');
        result.textContent = '';
      } else {
        const reactionTime = Math.floor(now - greenTime);
        resetTest();
        result.innerHTML = `your reaction time is ${reactionTime} ms! <p>I &#10084; coding</p>`;
      }
    }
  }
});
