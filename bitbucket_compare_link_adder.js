// ==UserScript==
// @name         Bitbucket compare link adder
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a link to the compare view to every branch on the branch overview page
// @author       Wolfgang Macher <wolfgang.macher@adigi.ai>
// @match        https://bitbucket.org/*/*/branches/**
// @updateURL    https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_compare_link_adder.js
// @downloadURL  https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_compare_link_adder.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.addEventListener('load',() => {
    ensureBranchesExistAndCall();
    addNavigationListeners();
  })

  function addNavigationListeners() {
    // Einfach darauf vertrauen, dass der Branches Link auch in Zukunft an vierter Stelle in der Navigation ist.
    // Ist im Zweifelsfall schnell angepasst und sollte sich seltener ändern als spezifische Klassennamen.
    const branches_link = document.querySelectorAll('[data-testId="Navigation"] a')[3];
    branches_link.addEventListener('click', ensureBranchesExistAndCall);
  }

  function ensureBranchesExistAndCall() {
    const branches = document.URL.includes('branches') && document.querySelectorAll('table tr');
    if (branches?.length > 1) {
      // Der erste Eintrag in 'branches' ist effektiv die Überschrift, die interessiert uns nicht.
      // Der zweite ist 'master', da ist eine compare Ansicht relativ witzlos.
      call(Array.from(branches).slice(2));
    } else {
      setTimeout(ensureBranchesExistAndCall, 500);
    }
  }

  function call(branches) {
    branches.forEach((tr) => {
      const base_url = document.URL;
      const branch_ele = tr.querySelector('td');
      const branch_name = branch_ele.querySelector('a').text;
      const compare_url = `${base_url}compare/${branch_name}..master`;

      const compare_link = document.createElement('a');
      compare_link.href = compare_url;
      compare_link.textContent = 'c';
      compare_link.style.color = '#007dcf';
      compare_link.style.fontWeight = '900';
      compare_link.style.marginLeft = '5px';
      compare_link.style.fontFamily = '"Lucida Console", "Courier New", monospace';
      compare_link.style.fontSize = '25px';
      compare_link.style.textDecoration = 'none';

      branch_ele.firstChild.querySelectorAll('a')[1]?.remove();
      branch_ele.firstChild.appendChild(compare_link);
    })
  }
})();
