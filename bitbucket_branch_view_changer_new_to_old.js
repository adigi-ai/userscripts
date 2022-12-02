// ==UserScript==
// @name         Bitbucket branch view changer - new to old
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       Florian Dütsch <florian.duetsch@adigi.ai>
// @match        https://bitbucket.org/*/*/branch/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/adigi-ai/userscripts/main/bitbucket_branch_view_changer_new_to_old.js
// ==/UserScript==

(function () {
  'use strict';

  function settingsButton() {
    return document.querySelector('button[data-testid=settingsButton]')
  }

  function addButton() {
    const branchName = window.__initial_state__.repositories.branch.source_branch.name
    const repo = window.__initial_state__.repositories.branch.dest_repo
    const path = `/${repo}/branches/compare/${branchName}%0Dmaster`

    // clone existing button to cirumvent the problem that CSS class names change all the time
    // jQuery because of `contains`
    const cloned = $('a span span:contains("View source")').get(0).closest('div').cloneNode(true)

    cloned.querySelector('a').href = path
    cloned.querySelector('a').style.cursor = 'pointer'
    cloned.querySelector('span span').innerText = 'Alte Branch-Ansicht'

    settingsButton().parentElement.insertAdjacentElement('afterend', cloned);
  }

  // Wait for SPA to render buttons
  const observer = new MutationObserver(observerCallback);
  function observerCallback(mutationList) {
    let found = false
    mutationList.forEach((mutation) => {
      if (settingsButton()) {
        observer.disconnect()
        found = true
      }
    })
    if (found) {
      addButton()
    }
  }
  observer.observe(document.getElementById('root'), { childList: true, subtree: true });
})();
