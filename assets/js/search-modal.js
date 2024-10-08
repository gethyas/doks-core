/*!
 * Search modal for Bootstrap based Thulite sites
 * Copyright 2021-2024 Thulite
 * Licensed under the MIT License
 */

import { Modal } from 'bootstrap';

(() => {
    'use strict';

    // Declare search elements
    const searchToggleMobile = document.getElementById('searchToggleMobile');
    const searchToggleDesktop = document.getElementById('searchToggleDesktop');
    const searchModal = document.getElementById('searchModal');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('query');
    const searchResults = document.getElementById('searchResults');

    // Create search modal
    const flexSearchModal = new Modal(searchModal, {
        focus: true
    });

    // Show search modal when search button is clicked
    searchToggleMobile.addEventListener('click', showModalOnClick);
    searchToggleDesktop.addEventListener('click', showModalOnClick);

    function showModalOnClick() {
        flexSearchModal.toggle();
        // Show message "No recent searches"
        document.querySelector('.search-no-recent').classList.remove('d-none');
    }

    // Handle keyboard shortcuts
    document.addEventListener('keydown', onKeyDownHandler);

    function onKeyDownHandler(event) {
        // Show search modal when "Ctrl + k" is pressed
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            flexSearchModal.show();
            // Clear input field and search results
            searchForm.reset();
            searchResults.textContent = '';
            // Show message "No recent searches"
            document.querySelector('.search-no-recent').classList.remove('d-none');
        }
        // Clear input field and search results when "Esc" is pressed
        if (event.key === 'Escape') {
            searchForm.reset();
            searchResults.textContent = '';
            // Remove class "selected" on search result and reset index search results
            if (searchResultSelected) {
                removeClass(searchResultSelected, 'selected');
                index = -1;
            }
            // Hide message "No search results"
            document.querySelector('.search-no-results').classList.add('d-none');
        }
    }

    // Handle clicking on modal backdrop
    document.addEventListener('click', function (event) {
        // Clear input field and search results when clicking on modal backdrop
        var modalElement = searchModal.contains(event.target);
        if (!modalElement) {
            searchForm.reset();
            searchResults.textContent = '';
            // Hide message "No search results"
            document.querySelector('.search-no-results').classList.add('d-none');
        }
        // Remove class "selected" on search result and reset index search results
        if (searchResultSelected) {
            removeClass(searchResultSelected, 'selected');
            index = -1;
        }
    });

    // Focus the search input element when the search modal is shown
    searchModal.addEventListener('shown.bs.modal', () => {
        searchInput.focus();
    });

    // Handle keyboard navigation search results
    // Based on https://codepen.io/mehuldesign/pen/eYpbXMg
    var searchResultSelected;
    var index = -1;

    document.addEventListener(
        'keydown',
        function (event) {
            var len = searchResults.getElementsByTagName('article').length - 1;
            if (event.key === 'ArrowDown') {
                index++;
                if (searchResultSelected) {
                    removeClass(searchResultSelected, 'selected');
                    const next = searchResults.getElementsByTagName('article')[index];
                    if (typeof next !== 'undefined' && index <= len) {
                        searchResultSelected = next;
                    } else {
                        index = 0;
                        searchResultSelected = searchResults.getElementsByTagName('article')[0];
                    }
                    addClass(searchResultSelected, 'selected');
                    // console.log(index);
                } else {
                    index = 0;
                    searchResultSelected = searchResults.getElementsByTagName('article')[0];
                    addClass(searchResultSelected, 'selected');
                }
            } else if (event.key === 'ArrowUp') {
                if (searchResultSelected) {
                    removeClass(searchResultSelected, 'selected');
                    index--;
                    // console.log(index);
                    const next = searchResults.getElementsByTagName('article')[index];
                    if (typeof next !== 'undefined' && index >= 0) {
                        searchResultSelected = next;
                    } else {
                        index = len;
                        searchResultSelected = searchResults.getElementsByTagName('article')[len];
                    }
                    addClass(searchResultSelected, 'selected');
                } else {
                    index = 0;
                    searchResultSelected = searchResults.getElementsByTagName('article')[len];
                    addClass(searchResultSelected, 'selected');
                }
            }
        },
        false
    );

    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
        // Remove focus on selected search result
        searchResultSelected.querySelector('a').blur();
    }

    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
        // Set focus on selected search result
        searchResultSelected.querySelector('a').focus();
    }

    // Handle mouse navigation search results
    searchResults.addEventListener(
        'mouseover',
        () => {
            if (searchResultSelected) {
                removeClass(searchResultSelected, 'selected');
            }
        },
        false
    );
})();
