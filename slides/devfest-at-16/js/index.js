Reveal.addEventListener('ready', (event) => {
  if (Sloth) {
    Sloth.enhanceSectionStyles();
    Sloth.registerCodeSections();
  }
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