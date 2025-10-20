(function() {
  'use strict';
  
  // Configuration
  const CHATBOT_URL = 'http://localhost:3000/embed'; // Your Next.js chatbot URL
  const WIDGET_CONFIG = {
    position: 'bottom-right', // bottom-right or bottom-left
    buttonColor: '#0070f3',
    buttonSize: '60px',
    chatWidth: '400px',
    chatHeight: '600px',
    zIndex: 9999
  };

  // Create styles
  const styles = `
    #cleanspace-chat-widget {
      position: fixed;
      ${WIDGET_CONFIG.position === 'bottom-right' ? 'right: 20px;' : 'left: 20px;'}
      bottom: 20px;
      z-index: ${WIDGET_CONFIG.zIndex};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    #cleanspace-chat-button {
      width: ${WIDGET_CONFIG.buttonSize};
      height: ${WIDGET_CONFIG.buttonSize};
      border-radius: 50%;
      background: ${WIDGET_CONFIG.buttonColor};
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
    }

    #cleanspace-chat-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    #cleanspace-chat-button svg {
      width: 28px;
      height: 28px;
      fill: white;
    }

    #cleanspace-chat-button.open svg.icon-chat {
      display: none;
    }

    #cleanspace-chat-button svg.icon-close {
      display: none;
    }

    #cleanspace-chat-button.open svg.icon-close {
      display: block;
    }

    #cleanspace-chat-container {
      position: fixed;
      ${WIDGET_CONFIG.position === 'bottom-right' ? 'right: 20px;' : 'left: 20px;'}
      bottom: 100px;
      width: ${WIDGET_CONFIG.chatWidth};
      height: ${WIDGET_CONFIG.chatHeight};
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 120px);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      background: white;
      display: none;
      overflow: hidden;
      z-index: ${WIDGET_CONFIG.zIndex};
    }

    #cleanspace-chat-container.open {
      display: block;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    #cleanspace-chat-iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 12px;
    }

    @media (max-width: 768px) {
      #cleanspace-chat-container {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }
    }
  `;

  // Inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Create widget HTML
  const widgetHTML = `
    <div id="cleanspace-chat-widget">
      <button id="cleanspace-chat-button" aria-label="Open chat">
        <svg class="icon-chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
      </button>
      <div id="cleanspace-chat-container">
        <iframe 
          id="cleanspace-chat-iframe"
          src="${CHATBOT_URL}"
          allow="clipboard-write"
          title="CleanSpace Chat"
        ></iframe>
      </div>
    </div>
  `;

  // Inject widget when DOM is ready
  function injectWidget() {
    // Check if widget already exists
    if (document.getElementById('cleanspace-chat-widget')) {
      console.log('CleanSpace Chat Widget already exists');
      return;
    }

    // Create and inject widget
    const container = document.createElement('div');
    container.innerHTML = widgetHTML;
    document.body.appendChild(container.firstElementChild);

    console.log('✅ CleanSpace Chat Widget injected');

    // Add event listeners
    const button = document.getElementById('cleanspace-chat-button');
    const chatContainer = document.getElementById('cleanspace-chat-container');

    if (!button || !chatContainer) {
      console.error('❌ Widget elements not found');
      return;
    }

    button.addEventListener('click', function() {
      const isOpen = chatContainer.classList.contains('open');
      
      if (isOpen) {
        chatContainer.classList.remove('open');
        button.classList.remove('open');
        button.setAttribute('aria-label', 'Open chat');
        console.log('💬 Chat closed');
      } else {
        chatContainer.classList.add('open');
        button.classList.add('open');
        button.setAttribute('aria-label', 'Close chat');
        console.log('💬 Chat opened');
      }
    });

    console.log('✅ Event listeners attached');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }
})();
