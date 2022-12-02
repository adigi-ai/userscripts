// ==UserScript==
// @name         Bitbucket branch view changer - old to new
// @description  Adds a button to switch from the old Bitbucket branch view to the new one
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       Florian Dütsch <florian.duetsch@adigi.ai>
// @match        https://bitbucket.org/*/*/branches/compare/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_branch_view_changer_old_to_new.js
// @downloadURL  https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_branch_view_changer_old_to_new.js
// ==/UserScript==

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
