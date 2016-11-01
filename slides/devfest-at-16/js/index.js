Reveal.addEventListener( 'ready', function( event ) {
  document.querySelectorAll('section').forEach((e, idx) => {
    if (e.getAttribute('data-background-image') && e.className.indexOf('original') === -1) {
      let bg = document.querySelector('.slide-background:nth-of-type('+(idx+1)+')');
      if (bg.className.indexOf('filter-image') === -1) {
        bg.className += ' filter-image';
      }
    } 
    if (e.className.indexOf('alternative') !== -1) {
      let bg = document.querySelector('.slide-background:nth-of-type('+(idx+1)+')');
      if (bg.className.indexOf('alternative') === -1) {
        bg.className += ' alternative';
      }
    }
  });
  registerCodeButtons();
});
// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  history: true,
  backgroundTransition: 'none',
  transition: 'none',
  controls: false,
  transitionSpeed: 'slow',

  // More info https://github.com/hakimel/reveal.js#dependencies
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
  ]
});

function registerCodeButtons() {
  if (typeof require === 'function') {
    document.querySelectorAll('section.code button.execute').forEach(registerExecute);
    document.querySelectorAll('section.code button[class^="toggle-"]').forEach(registerCodeToggle);
  } else {
    document.querySelectorAll('section.code').forEach(disableCoding)
  }
}

function disableCoding(elem) {

}


function registerCodeToggle(elem) {
  const wrapper = elem.parentElement.parentElement;
  const toggleClass = elem.className.match(/toggle-[a-zA-Z1-9]+/);

  if (!toggleClass || !toggleClass[0]) {
    return;
  }

  const toggle = toggleClass[0].replace('toggle-', 'show-');

  elem.addEventListener('click', () => {
    if (wrapper.className && wrapper.className.indexOf(toggle) !== -1) {
      wrapper.className = wrapper.className.replace(new RegExp(toggle, 'gi'), '');
    } else {
      wrapper.className += ' ' + toggle;
    }
  });
}

function registerExecute(elem) {
  const wrapper = elem.parentElement.parentElement;
  const input = wrapper.querySelector('.input');
  const output = wrapper.querySelector('.output');
  
  const path = require('path');
  const fs = require('fs');
  const exec = require('child_process').exec;

  const folderName = path.resolve('code');
  const command = input.getAttribute('data-command');
  let fileName = input.getAttribute('data-filename');
  
  if (!fileName) {
    path.resolve(Math.random().toString(36).substr(2));
  }

  elem.addEventListener('click', () => {
    let content = input.innerText;
    let fullPath = path.join(folderName, fileName);
    fs.writeFile(fullPath, content, 'utf8', (err) => {
      if (err) {
        output.innerText = err.message;
        return;
      }

      exec(`${command} ${fullPath}`, (err, stdout, stderr) => {
        if (err) {
          output.innerText = err.message;
          return;
        }
        output.innerText = stdout;

        /*fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        })*/
      });
    })
  });
}