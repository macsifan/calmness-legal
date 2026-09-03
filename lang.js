// Переключатель языка. Выбор запоминается, ?lang=en открывает сразу
// английскую версию — приложение подставляет его по локали устройства.
(function () {
  var root = document.documentElement;

  function apply(lang) {
    root.classList.toggle('en', lang === 'en');
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('on', buttons[i].dataset.lang === lang);
    }
    try { localStorage.setItem('calmness_lang', lang); } catch (e) {}
  }

  var fromQuery = new URLSearchParams(location.search).get('lang');
  var stored = null;
  try { stored = localStorage.getItem('calmness_lang'); } catch (e) {}
  var browser = (navigator.language || 'ru').slice(0, 2) === 'ru' ? 'ru' : 'en';

  apply(fromQuery === 'en' || fromQuery === 'ru' ? fromQuery : (stored || browser));

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.lang button');
    if (button) apply(button.dataset.lang);
  });
})();
