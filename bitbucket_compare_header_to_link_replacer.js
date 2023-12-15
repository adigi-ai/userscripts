// ==UserScript==
// @name         Bitbucket compare header to link replacer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replaces the 'compare' header with a link to the compare view
// @author       Wolfgang Macher <wolfgang.macher@adigi.ai>
// @match        https://bitbucket.org/*/*/branch/*
// @updateURL    https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_compare_header_to_link_replacer.js
// @downloadURL  https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_compare_header_to_link_replacer.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.addEventListener('load', function () {
    const compare_header = document.querySelector('h2');
    const compare_link = document.createElement('a');

    const current_url = document.URL;
    const compare_url = current_url.replace(/branch/, 'branches/compare') + '..master';

    compare_link.textContent = compare_header.textContent;
    compare_link.href = compare_url;

    compare_header.parentNode.replaceChild(compare_link, compare_header)
  })
})();
