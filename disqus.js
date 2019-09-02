window.disqus_config = function() {
    window.page.url = window.location.href;
    window.page.identifier = window.location.href;
}

(function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://devforest.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();