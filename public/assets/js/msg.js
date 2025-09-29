(function() {
    'use strict';

    const CONFIG = {
        modalId: 'dsebest-popup-modal',
        storageKey: 'dsebest_popup_hidden',
        showDelay: 1000,
        animationDuration: 300
    };

    const MODAL_CONTENT = {
        title: '🚨 公告 Announcement',
        message: `
            基於版權問題，我們將會在48小時內下架及移除網站上所有涉及的資源，不便之處，敬請原諒。
            
            Due to copyright infringement issues, we are required to remove and take down all resources involving the issue in 48 hours. We sincerely apologize for the inconvenience caused and thank you for your understanding and cooperation.

            If you have any inquiries, you can find us <a href="https://www.instagram.com/dse_best/" target="_blank" style="text-decoration: none;">@dse_best</a> or email us at <a href="mailto:info@dse.best">info@dse.best</a>.

            GLHF
            <div style="text-align: right;">29/9/2025</div>
        `.trim(),
        buttonText: 'ok',
        checkboxText: 'Don\'t show this message again'
    };

    function isSubjectPage() {
        const path = window.location.pathname.toLowerCase();
        const subjectPages = [
            '/bafs', '/biology', '/chemistry', '/chinese', '/chinese-history',
            '/citizen', '/economics', '/english', '/geography', '/history',
            '/ict', '/m1', '/m2', '/math', '/physics', '/ths'
        ];
        
        return subjectPages.some(subject => path.startsWith(subject));
    }

    function shouldShowModal() {
        if (window.location.hostname === 'x.dse.best') {
            return false;
        }
        
        if (!isSubjectPage()) {
            return false;
        }
        
        if (isSearchEngineBot()) {
            return false;
        }
        
        // return !localStorage.getItem(CONFIG.storageKey);
        return true; // Always show modal (checkbox functionality disabled)
    }

    function isSearchEngineBot() {
        const userAgent = navigator.userAgent.toLowerCase();
        const botPatterns = [
            'googlebot',
            'bingbot',
            'slurp', // Yahoo
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'facebookexternalhit',
            'twitterbot',
            'linkedinbot',
            'whatsapp',
            'telegrambot',
            'applebot',
            'crawler',
            'spider',
            'bot',
            'crawling'
        ];
        
        return botPatterns.some(pattern => userAgent.includes(pattern));
    }

    function getCurrentTheme() {
        const html = document.documentElement;
        return html.getAttribute('data-bs-theme') || 'blue-theme';
    }

    function createModalHTML() {
        const theme = getCurrentTheme();
        
        return `
            <div id="${CONFIG.modalId}" class="dsebest-popup-modal" data-theme="${theme}">
                <div class="dsebest-modal-backdrop"></div>
                <div class="dsebest-modal-container">
                    <div class="dsebest-modal-content">
                        <div class="dsebest-modal-header">
                            <h3 class="dsebest-modal-title">${MODAL_CONTENT.title}</h3>
                            <button class="dsebest-modal-close" aria-label="Close modal">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="dsebest-modal-body">
                            <div class="dsebest-modal-message">${MODAL_CONTENT.message.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="dsebest-modal-footer">
                            <!-- <div class="dsebest-modal-checkbox">
                                <input type="checkbox" id="dsebest-hide-forever" class="dsebest-checkbox">
                                <label for="dsebest-hide-forever" class="dsebest-checkbox-label">
                                    ${MODAL_CONTENT.checkboxText}
                                </label>
                            </div> -->
                            <button class="dsebest-modal-button" id="dsebest-modal-ok">
                                ${MODAL_CONTENT.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function createModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* DSEBest Popup Modal Styles */
            .dsebest-popup-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all ${CONFIG.animationDuration}ms ease-in-out;
            }

            .dsebest-popup-modal.show {
                opacity: 1;
                visibility: visible;
            }

            .dsebest-modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                pointer-events: none; /* Disable backdrop clicks */
            }

            .dsebest-modal-container {
                position: relative;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.8) translateY(20px);
                transition: transform ${CONFIG.animationDuration}ms ease-in-out;
            }

            .dsebest-popup-modal.show .dsebest-modal-container {
                transform: scale(1) translateY(0);
            }

            .dsebest-modal-content {
                background: var(--bs-body-bg, #ffffff);
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                border: 1px solid var(--bs-border-color, rgba(0, 0, 0, 0.1));
                overflow: hidden;
            }

            .dsebest-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 24px 24px 16px;
                border-bottom: 1px solid var(--bs-border-color, rgba(0, 0, 0, 0.1));
            }

            .dsebest-modal-title {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--bs-heading-color, #212529);
                line-height: 1.3;
            }

            .dsebest-modal-close {
                background: none;
                border: none;
                padding: 8px;
                border-radius: 8px;
                cursor: pointer;
                color: var(--bs-body-color, #6c757d);
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .dsebest-modal-close:hover {
                background: var(--bs-gray-100, rgba(0, 0, 0, 0.05));
                color: var(--bs-body-color, #495057);
            }

            .dsebest-modal-body {
                padding: 16px 24px;
            }

            .dsebest-modal-message {
                margin: 0;
                color: var(--bs-body-color, #495057);
                line-height: 1.6;
                font-size: 1rem;
            }

            .dsebest-modal-message a {
                color: #4361ee;
                text-decoration: underline;
                transition: color 0.2s ease;
            }

            .dsebest-modal-message a:hover {
                color: #3a0ca3;
                text-decoration: none;
            }

            .dsebest-modal-footer {
                padding: 16px 24px 24px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .dsebest-modal-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .dsebest-checkbox {
                width: 18px;
                height: 18px;
                accent-color: #4361ee;
                cursor: pointer;
            }

            .dsebest-checkbox-label {
                font-size: 0.9rem;
                color: var(--bs-body-color, #6c757d);
                cursor: pointer;
                user-select: none;
            }

            .dsebest-modal-button {
                background: #4361ee;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 500;
                cursor: pointer;
                align-self: flex-end;
            }

            .dsebest-modal-button:hover {
                background: #4361ee;
            }

            .dsebest-modal-button:active {
                background: #4361ee;
            }

            /* Theme-specific styles */
            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-content {
                background: #0f1535;
                border-color: rgba(255, 255, 255, 0.15);
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-title {
                color: #e6ecf0;
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-message {
                color: #d3d7dc;
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-close {
                color: #d3d7dc;
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-checkbox-label {
                color: #d3d7dc;
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-header {
                border-bottom-color: rgba(255, 255, 255, 0.15);
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-message a {
                color: #60a5fa;
            }

            .dsebest-popup-modal[data-theme="blue-theme"] .dsebest-modal-message a:hover {
                color: #93c5fd;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-content {
                background: #212529;
                border-color: rgba(255, 255, 255, 0.1);
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-title {
                color: #ffffff;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-message {
                color: #adb5bd;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-close {
                color: #adb5bd;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-checkbox-label {
                color: #adb5bd;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-header {
                border-bottom-color: rgba(255, 255, 255, 0.1);
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-message a {
                color: #60a5fa;
            }

            .dsebest-popup-modal[data-theme="dark"] .dsebest-modal-message a:hover {
                color: #93c5fd;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-content {
                background: #ffffff;
                border-color: rgba(0, 0, 0, 0.1);
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-title {
                color: #212529;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-message {
                color: #495057;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-close {
                color: #6c757d;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-close:hover {
                background: rgba(0, 0, 0, 0.05);
                color: #495057;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-checkbox-label {
                color: #6c757d;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-message a {
                color: #4361ee;
            }

            .dsebest-popup-modal[data-theme="light"] .dsebest-modal-message a:hover {
                color: #3a0ca3;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-content {
                background: #2d3748;
                border-color: rgba(255, 255, 255, 0.1);
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-title {
                color: #ffffff;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-message {
                color: #e2e8f0;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-close {
                color: #e2e8f0;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-checkbox-label {
                color: #e2e8f0;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-header {
                border-bottom-color: rgba(255, 255, 255, 0.1);
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-message a {
                color: #60a5fa;
            }

            .dsebest-popup-modal[data-theme="semi-dark"] .dsebest-modal-message a:hover {
                color: #93c5fd;
            }

            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .dsebest-modal-container {
                    width: 95%;
                    margin: 20px;
                }

                .dsebest-modal-header,
                .dsebest-modal-body,
                .dsebest-modal-footer {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .dsebest-modal-title {
                    font-size: 1.3rem;
                }

                .dsebest-modal-message {
                    font-size: 0.95rem;
                }
            }

            /* Accessibility improvements */
            .dsebest-modal-close:focus,
            .dsebest-modal-button:focus {
                outline: 2px solid #4361ee;
                outline-offset: 2px;
            }

            /* Animation for checkbox */
            .dsebest-checkbox:checked {
                animation: checkboxPulse 0.3s ease;
            }

            @keyframes checkboxPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Show modal
    function showModal() {
        const modal = document.getElementById(CONFIG.modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const closeBtn = modal.querySelector('.dsebest-modal-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    // Hide modal
    function hideModal() {
        const modal = document.getElementById(CONFIG.modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            
            // Remove modal after animation
            setTimeout(() => {
                if (modal && modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, CONFIG.animationDuration);
        }
    }

    // Handle modal interactions
    function setupModalEvents() {
        const modal = document.getElementById(CONFIG.modalId);
        if (!modal) return;

        // Close button
        const closeBtn = modal.querySelector('.dsebest-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', hideModal);
        }

        // OK button
        const okBtn = modal.querySelector('#dsebest-modal-ok');
        if (okBtn) {
            okBtn.addEventListener('click', () => {
                // const checkbox = modal.querySelector('#dsebest-hide-forever');
                // if (checkbox && checkbox.checked) {
                //     localStorage.setItem(CONFIG.storageKey, 'true');
                // }
                hideModal();
            });
        }

        // Backdrop click - DISABLED to require explicit user interaction
        // const backdrop = modal.querySelector('.dsebest-modal-backdrop');
        // if (backdrop) {
        //     backdrop.addEventListener('click', hideModal);
        // }

        // Keyboard events
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideModal();
            }
        });

        // Checkbox animation
        // const checkbox = modal.querySelector('#dsebest-hide-forever');
        // if (checkbox) {
        //     checkbox.addEventListener('change', (e) => {
        //         if (e.target.checked) {
        //             e.target.style.accentColor = '#4361ee';
        //         }
        //     });
        // }
    }

    // Setup Instagram app links for mobile
    function setupInstagramLinks() {
        const modal = document.getElementById(CONFIG.modalId);
        if (!modal) return;

        // Find all Instagram links in the modal
        const links = modal.querySelectorAll('a[href*="instagram.com"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Try to open Instagram app first on mobile
                if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    e.preventDefault();
                    const appUrl = 'instagram://user?username=dse_best';
                    const webUrl = link.href; // Use the original link URL
                    
                    // Try to open app, fallback to website after 2 seconds
                    window.location.href = appUrl;
                    setTimeout(() => {
                        window.location.href = webUrl;
                    }, 2000);
                }
            });
        });
    }

    // Initialize modal
    function initModal() {
        if (!shouldShowModal()) {
            return;
        }

        // Create and inject styles
        createModalStyles();

        // Create and inject modal HTML
        const modalHTML = createModalHTML();
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Setup event listeners
        setupModalEvents();

        // Setup Instagram app links
        setupInstagramLinks();

        // Show modal after delay
        setTimeout(showModal, CONFIG.showDelay);
    }

    // Theme change handler
    function handleThemeChange() {
        const modal = document.getElementById(CONFIG.modalId);
        if (modal) {
            const newTheme = getCurrentTheme();
            modal.setAttribute('data-theme', newTheme);
        }
    }

    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initModal);
        } else {
            initModal();
        }

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                    handleThemeChange();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-bs-theme']
        });
    }

    init();

    window.DSEBestModal = {
        show: showModal,
        hide: hideModal,
        reset: () => {
            localStorage.removeItem(CONFIG.storageKey);
            location.reload();
        }
    };

})();


