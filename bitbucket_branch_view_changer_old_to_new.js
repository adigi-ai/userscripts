// ==UserScript==
// @name         Bitbucket branch view changer - old to new
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Florian Dütsch <florian.duetsch@adigi.ai>
// @match        https://bitbucket.org/*/*/branches/compare/*
// @grant        none
// ==/UserScript==

// TODO: @updateURL

(function () {
  'use strict';

  function addButton() {
    const branchName = document.getElementById('branch-compare').dataset.sourceBranch;
    const repo = document.getElementById('branch-compare').dataset.sourceRepo;
    const path = `/${repo}/branch/${branchName}`
    const toolbar = document.querySelector('.aui-buttons');
    const markup = `
      <a href="${path}" class="aui-button">Neue Branch-Ansicht</a>
    `;
    toolbar.insertAdjacentHTML('afterbegin', markup);
  }
  addButton()
})();
