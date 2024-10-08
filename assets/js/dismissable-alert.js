/*!
 * Dismissable alert for Bootstrap based Thulite sites
 * Copyright 2021-2024 Thulite
 * Licensed under the MIT License
 */

(() => {
    'use strict';

    // Check if alert has been closed, and set data-global-alert to closed
    Object.keys(localStorage).forEach(function (key) {
        if (/^global-alert-/.test(key)) {
            document.documentElement.setAttribute('data-global-alert', 'closed');
        }
    });

    // Enable alert closing, on DOMContentLoaded
    window.addEventListener('DOMContentLoaded', () => {
        var announcement = document.getElementById('announcement');

        if (announcement !== null) {
            var id = announcement.dataset.id;

            Object.keys(localStorage).forEach(function (key) {
                if (/^global-alert-/.test(key)) {
                    if (key !== id) {
                        localStorage.removeItem(key);
                        document.documentElement.removeAttribute('data-global-alert');
                    }
                }
            });

            announcement.addEventListener('closed.bs.alert', () => {
                localStorage.setItem(id, 'closed');
            });
        }
    });
})();
