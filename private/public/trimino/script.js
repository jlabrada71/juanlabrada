
const synth = window.speechSynthesis;

const inputForm = document.querySelector('form');
const inputTxt = document.querySelector('.txt');
const voiceSelect = document.querySelector('select');

const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('.pitch-value');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('.rate-value');

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort((a, b) => {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    if (aname === bname) return 0;
    return +1;
  });
  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for (let i = 0; i < voices.length; i += 1) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (inputTxt.value !== '') {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = () => console.log('SpeechSynthesisUtterance.onend');
    utterThis.onerror = () => console.error('SpeechSynthesisUtterance.onerror');

    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i += 1) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = (event) => {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = () => {
  pitchValue.textContent = pitch.value;
};

rate.onchange = () => {
  rateValue.textContent = rate.value;
};

voiceSelect.onchange = () => {
  speak();
};
