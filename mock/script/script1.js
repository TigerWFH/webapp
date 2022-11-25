console.log('script1');
const list = document.getElementsByTagName('script');
const sc = document.createElement('script');
sc.src = 'http://127.0.0.1:8080/script/script4.js';
sc.async = 1;
const dom = list[0];
dom.parentNode.insertBefore(sc, dom);
