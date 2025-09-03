// Yes, this is vibe coded.
// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Chat functionality for DSEBest chatroom
// Handles Ably realtime messaging with security features

class DSEChat {
  constructor() {
    this.isInitialized = false;
    this.ably = null;
    this.channel = null;
    this.isUserModerator = false;
    this.isSending = false;
    this.lastSendTime = 0;
    this.messageCount = 0;
    this.windowStart = Date.now();
    this.rateLimitStartTime = Date.now();
    this.rateLimitMessageCount = 0;
    
    // Rate limit settings
    this.SEND_COOLDOWN = 3000; // 3s cooldown between sends
    this.MAX_MESSAGES_PER_MINUTE = 15; // Max 15 messages per minute (increased from 8)
    this.MAX_BURST = 3; // Max 3 messages in burst
    this.BURST_WINDOW = 30000; // 30 second burst window
    this.RATE_LIMIT_WINDOW = 60000; // 1 minute window for overall limit
    
    // Constants for validation
    this.MAX_MESSAGE_LENGTH = 150;
    this.MAX_USERNAME_LENGTH = 14;
    this.MIN_USERNAME_LENGTH = 3;
    
    // DOM elements
    this.chatMessages = null;
    this.statusDot = null;
    this.statusText = null;
    this.userNameInput = null;
    this.editNameBtn = null;
    this.messageInput = null;
    this.sendButton = null;
    this.charCounter = null;
  }

  init() {
    if (this.isInitialized) {
      console.log('Chat already initialized');
      return;
    }

    this.chatMessages = document.getElementById('chatMessages');
    this.statusDot = document.getElementById('statusDot');
    this.statusText = document.getElementById('statusText');
    this.userNameInput = document.getElementById('userNameInput');
    this.editNameBtn = document.getElementById('editNameBtn');
    this.messageInput = document.getElementById('messageInput');
    this.sendButton = document.getElementById('sendButton');
    this.charCounter = document.getElementById('charCounter');

    if (!this.chatMessages || !this.userNameInput || !this.messageInput) {
      console.log('Chat DOM elements not found, skipping initialization');
      return;
    }

    console.log('Initializing DSE Chat...');
    
    this.initializeUsername();
    this.setupEventListeners();
    this.initializeAbly();
    
    this.isInitialized = true;
  }

  destroy() {
    if (!this.isInitialized) return;

    console.log('Destroying DSE Chat...');
    
    this.sendLeaveEvent();
    
    if (this.ably) {
      try {
        if (this.channel) {
          this.channel.presence.leave();
        }
        this.ably.connection.close();
      } catch (error) {
        console.warn('Error during Ably cleanup:', error);
      }
    }

    this.removeEventListeners();
    
    this.isInitialized = false;
    this.ably = null;
    this.channel = null;
    this.isUserModerator = false;
    this.isSending = false;
    
    this.chatMessages = null;
    this.statusDot = null;
    this.statusText = null;
    this.userNameInput = null;
    this.editNameBtn = null;
    this.messageInput = null;
    this.sendButton = null;
    this.charCounter = null;
  }

  randomUsername() {
    const animals = ['Tiger','Panda','Dolphin','Eagle','Fox','Koala','Lion','Otter','Penguin','Shark'];
    return animals[Math.floor(Math.random()*animals.length)] + Math.floor(100 + Math.random()*900);
  }

  initializeUsername() {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      this.userNameInput.value = savedUsername;
    } else {
      this.userNameInput.value = this.randomUsername();
      localStorage.setItem('chatUsername', this.userNameInput.value);
    }
  }

  getSecretKey() {
    return localStorage.getItem('dsechat_mod_secret') || null;
  }

  validateUsername(username) {
    if (!username) {
      this.addSystemMessage('Username cannot be empty');
      return false;
    }
    
    const cleanUsername = String(username).trim();
    
    if (cleanUsername.length < this.MIN_USERNAME_LENGTH) {
      this.addSystemMessage(`Username must be at least ${this.MIN_USERNAME_LENGTH} characters long`);
      return false;
    }
    if (cleanUsername.length > this.MAX_USERNAME_LENGTH) {
      this.addSystemMessage(`Username cannot be longer than ${this.MAX_USERNAME_LENGTH} characters`);
      return false;
    }
    
    if (/<|>|&|"|'|script|javascript|onload|onerror|eval/i.test(cleanUsername)) {
      this.addSystemMessage('Username contains invalid characters');
      return false;
    }
    
    return true;
  }

  validateMessage(message) {
    if (!message) {
      this.addSystemMessage('Message cannot be empty');
      return false;
    }
    
    const cleanMessage = String(message).trim();
    
    if (cleanMessage.length > this.MAX_MESSAGE_LENGTH) {
      this.addSystemMessage(`Message cannot be longer than ${this.MAX_MESSAGE_LENGTH} characters`);
      return false;
    }
    
    if (/<script|javascript:|onload|onerror|eval\s*\(|fetch\s*\(|xhr|websocket/i.test(cleanMessage)) {
      this.addSystemMessage('Message contains suspicious content');
      return false;
    }

    const linkPatterns = [
      /(https?:\/\/[^\s]+)/gi,
      /(www\.[^\s]+)/gi,
      /\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/gi,
      /(bit\.ly|tinyurl|t\.co|goo\.gl|discord\.gg)/gi,
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi
    ];

    /* for (const pattern of linkPatterns) {
      if (pattern.test(cleanMessage)) {
        this.addSystemMessage('Links and domains are not allowed in messages');
        return false;
      }
    } */

    // Basic profanity check (client-side preview)
    /* if (/\b(fuck|shit|damn|bitch|ass|hell|crap|piss|bastard|whore|slut|cunt|cock|dick|pussy|tits|boobs|sex|porn|nude|naked|nigger|nigga|faggot|retard)\b/i.test(cleanMessage)) {
      this.addSystemMessage('Message contains inappropriate language');
      return false;
    } */
    
    return true;
  }

  // Setup event listeners
  setupEventListeners() {
    // Username editing
    this.editNameBtn.addEventListener('click', this.handleEditName.bind(this));
    this.userNameInput.addEventListener('keypress', this.handleUsernameKeypress.bind(this));



    // Rules button
    const rulesBtn = document.getElementById('rulesBtn');
    if (rulesBtn) {
      rulesBtn.addEventListener('click', this.showRulesModal.bind(this));
    }

    // Message sending
    this.sendButton.addEventListener('click', this.sendMessage.bind(this));
    this.messageInput.addEventListener('keypress', this.handleMessageKeypress.bind(this));
    
    // Character counter
    if (this.messageInput && this.charCounter) {
      this.messageInput.addEventListener('input', this.updateCharCounter.bind(this));
      this.updateCharCounter(); // Initialize counter
    }
    
    // Page unload detection for leave events
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('pagehide', this.handleBeforeUnload);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // "/" hotkey to focus message input
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Only trigger if not typing in an input field
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          if (this.messageInput) {
            this.messageInput.focus();
          }
        }
      }
    });
  }

  // Remove event listeners
  removeEventListeners() {
    if (this.editNameBtn) {
      this.editNameBtn.removeEventListener('click', this.handleEditName.bind(this));
    }
    if (this.userNameInput) {
      this.userNameInput.removeEventListener('keypress', this.handleUsernameKeypress.bind(this));
    }
    if (this.sendButton) {
      this.sendButton.removeEventListener('click', this.sendMessage.bind(this));
    }
    if (this.messageInput) {
      this.messageInput.removeEventListener('keypress', this.handleMessageKeypress.bind(this));
      this.messageInput.removeEventListener('input', this.updateCharCounter.bind(this));
    }
    
    // Remove page unload listeners
    if (this.handleBeforeUnload) {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
      window.removeEventListener('pagehide', this.handleBeforeUnload);
    }
    if (this.handleVisibilityChange) {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  // Handle page unload events
  handleBeforeUnload() {
    this.sendLeaveEvent();
  }

  // Handle visibility change (user switches tabs/minimizes)
  handleVisibilityChange() {
    if (document.hidden) {
      // User has left the tab - could be considered a leave event
      // We'll use a delayed check to see if they're really leaving
      this.visibilityTimeout = setTimeout(() => {
        this.sendLeaveEvent();
      }, 30000); // Wait 30 seconds before considering it a leave
    } else {
      // User returned - cancel the leave event
      if (this.visibilityTimeout) {
        clearTimeout(this.visibilityTimeout);
        this.visibilityTimeout = null;
      }
    }
  }

  // Event handler methods
  // Helper function to safely set edit button icon
  setEditButtonIcon(iconClass) {
    if (iconClass === 'bi-pencil') {
      // Custom SVG for edit (pencil)
      this.editNameBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 0.1rem; color: white;">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>`;
    } else if (iconClass === 'bi-check') {
      // Custom SVG for check
      this.editNameBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 0.1rem; color: white;">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>`;
    } else {
      // Fallback to Bootstrap Icons
      this.editNameBtn.innerHTML = `<i class="bi ${iconClass}" style="font-size: 16px; margin-top: 0.1rem; color: white;"></i>`;
    }
  }

  handleEditName() {
    const isEditing = this.userNameInput.disabled;
    if (!isEditing) {
      // Save changes
      const newUsername = this.userNameInput.value.trim();
      if (this.validateUsername(newUsername)) {
        this.userNameInput.disabled = true;
        this.setEditButtonIcon('bi-pencil');
        localStorage.setItem('chatUsername', newUsername);
        this.addSystemMessage(`Username changed to ${newUsername}`);
        // Sync with mobile input
        const mobileInput = document.getElementById('userNameInputMobile');
        if (mobileInput) {
          mobileInput.value = newUsername;
        }
      }
    } else {
      // Start editing
      this.userNameInput.disabled = false;
      this.userNameInput.focus();
      this.setEditButtonIcon('bi-check');
    }
  }

  handleUsernameKeypress(e) {
    if (e.key === 'Enter') {
      const newUsername = this.userNameInput.value.trim();
      if (this.validateUsername(newUsername)) {
        this.userNameInput.disabled = true;
        this.setEditButtonIcon('bi-pencil');
        localStorage.setItem('chatUsername', newUsername);
        this.addSystemMessage(`Username changed to ${newUsername}`);
      }
    }
  }





  handleMessageKeypress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  // Show rules modal
  showRulesModal() {
    // Dispatch custom event to trigger React modal
    const event = new CustomEvent('showRulesModal', {
      detail: { show: true }
    });
    document.dispatchEvent(event);
  }

  // Check if user should see welcome message with rules
  checkAndShowWelcomeMessage() {
    const hasSeenWelcome = localStorage.getItem('chatWelcomeShown');
    if (!hasSeenWelcome) {
      // Mark as shown
      localStorage.setItem('chatWelcomeShown', 'true');
      
      // Show welcome message with clickable rules link
      setTimeout(() => {
        this.addWelcomeMessage();
      }, 1000); // Delay to ensure chat is fully loaded
    }
  }

  // Add special welcome message with clickable rules link
  addWelcomeMessage() {
    // Create a simple system message with clickable rules link
    const wrap = document.createElement('div');
    wrap.className = 'chat-system-message text-center my-2';
    
    // Create welcome text
    const welcomeText = document.createElement('div');
    welcomeText.className = 'mb-1';
    welcomeText.textContent = '👋 Welcome to DSEBest Chatroom!';
    
    // Create rules link
    const rulesLink = document.createElement('a');
    rulesLink.href = '#';
    rulesLink.className = 'text-primary text-decoration-none fw-bold';
    rulesLink.textContent = 'Chatroom Rules';
    rulesLink.style.cursor = 'pointer';
    rulesLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showRulesModal();
    });
    
    wrap.appendChild(welcomeText);
    wrap.appendChild(rulesLink);
    
    this.chatMessages.appendChild(wrap);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  // Update character counter
  updateCharCounter() {
    if (!this.messageInput || !this.charCounter) return;
    
    const currentLength = this.messageInput.value.length;
    const maxLength = this.MAX_MESSAGE_LENGTH;
    
    this.charCounter.textContent = `${currentLength}/${maxLength}`;
    
    // Change color based on usage
    if (currentLength > maxLength * 0.9) {
      this.charCounter.className = 'text-danger';
    } else if (currentLength > maxLength * 0.7) {
      this.charCounter.className = 'text-warning';
    } else {
      this.charCounter.className = 'text';
    }
  }

  // Helper to append normal messages
  addMessage(sender, text, isMine, time = Date.now(), clientId = null, isModerator = false, messageId = null) {
    const wrapper = document.createElement('div');
    wrapper.className = 'd-flex flex-column' + (isMine ? ' align-items-end' : ' align-items-start');
    if (messageId) {
      wrapper.dataset.messageId = messageId;
    }
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + (isMine ? 'mine' : 'other');
    if (isModerator) {
      bubble.className += ' moderator';
    }
    
    // Username and timestamp line
    const headerDiv = document.createElement('div');
    headerDiv.className = 'd-flex justify-content-between align-items-center mb-1';
    
    const nameLine = document.createElement('strong');
    // Sanitize sender name to prevent XSS
    nameLine.textContent = String(sender || 'Unknown').substring(0, 20);
    if (isModerator) {
      const badge = document.createElement('span');
      badge.className = 'moderator-badge';
      badge.title = 'Moderator';
      badge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24zm60-176 226-226-56-58-170 170-86-84-56 56z"/></svg>`;
      nameLine.appendChild(badge);
    }
    
    // Show client ID if user is a moderator
    if (this.isUserModerator && clientId) {
      const idSpan = document.createElement('small');
      idSpan.className = 'ms-2 text-warning';
      idSpan.title = 'Client ID - Click to copy';
      idSpan.textContent = `[${String(clientId).substring(0, 20)}]`;
      idSpan.style.cursor = 'pointer';
      idSpan.onclick = () => {
        navigator.clipboard.writeText(clientId);
        this.addSystemMessage('Client ID copied to clipboard');
      };
      nameLine.appendChild(idSpan);
    }
    
    const timeSpan = document.createElement('small');
    timeSpan.className = 'ms-2 message-time';
    timeSpan.textContent = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    headerDiv.appendChild(nameLine);
    headerDiv.appendChild(timeSpan);
    bubble.appendChild(headerDiv);
    
    // Message content - Handle special formatting
    const textSpan = document.createElement('span');
    const messageText = String(text || '').substring(0, 500); // Limit length as extra safety
    
    // Check for sticker format: [STICKERNAME]
    const stickerMatch = messageText.match(/^\[([A-Za-z0-9_-]+)\]$/);
    if (stickerMatch) {
      const stickerName = stickerMatch[1];
      
      // Security: Only allow specific local stickers, prevent third-party image injection
      const allowedStickers = {
        'excited': '/assets/stickers/excited.webp',
        'wave': '/assets/stickers/wave.webp',
        'shocked': '/assets/stickers/shocked.webp',
        'shh': '/assets/stickers/shh.webp',
        'thumbsdown': '/assets/stickers/thumbsdown.webp',
        'agree': '/assets/stickers/agree.webp',
        'heart1': '/assets/stickers/heart1.webp',
        'clap': '/assets/stickers/clap.webp',
        'thumbsup_glasses': '/assets/stickers/thumbsup_glasses.webp',
        'mh': '/assets/stickers/mh.webp'
      };
      
      const stickerPath = allowedStickers[stickerName.toLowerCase()];
      if (!stickerPath) {
        // Invalid sticker - show as text
        textSpan.textContent = messageText;
        bubble.appendChild(textSpan);
        wrapper.appendChild(bubble);
        this.chatMessages.appendChild(wrapper);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        return;
      }
      
      // Create sticker display with local image only
      const stickerImg = document.createElement('img');
      
      stickerImg.src = stickerPath; // Only our domain sticker allowed
      stickerImg.alt = `Sticker: ${stickerName}`;
      
      // Responsive sticker sizing based on screen width
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;
      
      let stickerSize;
      if (isSmallMobile) {
        stickerSize = 55; // Very small mobile
      } else if (isMobile) {
        stickerSize = 60; // Mobile
      } else {
        stickerSize = 78; // Desktop (user's preferred size)
      }
      
      stickerImg.style.cssText = `
        max-width: ${stickerSize}px;
        max-height: ${stickerSize}px;
        border-radius: 8px;
        display: block;
      `;
      
      // Security: Prevent any external image loading or XSS
      stickerImg.onerror = () => {
        stickerImg.style.display = 'none';
        
        // Use the same responsive sizing for fallback
        const fallback = document.createElement('div');
        fallback.style.cssText = `
          width: ${stickerSize}px;
          height: ${stickerSize}px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #6c757d;
        `;
        fallback.textContent = '😊';
        textSpan.appendChild(fallback);
      };
      
      // Security: Prevent any onclick or other event handlers
      stickerImg.onclick = null;
      stickerImg.onload = null;
      
      textSpan.appendChild(stickerImg);
    } else {
      // Check for link format: [LINK]url[/LINK]
      const linkMatch = messageText.match(/\[LINK\](.*?)\[\/LINK\]/);
      if (linkMatch) {
        const url = linkMatch[1];
        const displayText = url.replace(/^https?:\/\//, ''); // Remove protocol for display
        
        // Create clickable link
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'link-message';
        link.style.color = '#007bff';
        link.style.textDecoration = 'underline';
        link.style.cursor = 'pointer';
        link.textContent = displayText;
        
        // Add link icon
        const linkIcon = document.createElement('span');
        linkIcon.innerHTML = ' 🔗';
        linkIcon.style.marginLeft = '4px';
        link.appendChild(linkIcon);
        
        textSpan.appendChild(link);
      } else {
        // Regular message - Use textContent to prevent XSS
        textSpan.textContent = messageText;
      }
    }
    bubble.appendChild(textSpan);
    wrapper.appendChild(bubble);
    this.chatMessages.appendChild(wrapper);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  // Enhanced system message function with XSS protection
  addSystemMessage(text) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-system-message text-center my-2 small fst-italic';
    // Use textContent to prevent XSS
    wrap.textContent = String(text || '').substring(0, 200);
    this.chatMessages.appendChild(wrap);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  // Update connection status indicator
  setStatus(text, connected, onlineCount = 0) {
    // Try to find status elements
    const statusTextEl = document.querySelector('.status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    
    if (statusTextEl) {
      statusTextEl.innerHTML = `${text} <span style="color: #bababa;">|</span> <strong>${onlineCount}</strong> ${onlineCount === 1 ? 'User' : 'Users'} Online`;
    }
    
    if (statusIndicator) {
      statusIndicator.className = `status-indicator ${connected ? 'connected' : 'connecting'}`;
      // Update the emoji based on status
      if (connected) {
        statusIndicator.innerHTML = '🟢'; // Green circle for connected
      } else if (text === 'Connecting') {
        statusIndicator.innerHTML = '🟡'; // Yellow circle for connecting
      } else {
        statusIndicator.innerHTML = '🔴'; // Red circle for disconnected/failed
      }
    }
  }

  // Generate a unique client ID
  generateClientId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `client_${timestamp}_${randomPart}`;
  }

  // Emoji shortcode mapping
  getEmojiShortcodes() {
    return {
      ':heart:': '❤️',
      ':love:': '💕',
      ':smile:': '😊',  
      ':laugh:': '😂',
      ':cry:': '😢',
      ':angry:': '😠',
      ':thumbsup:': '👍',
      ':thumbsdown:': '👎',
      ':fire:': '🔥',
      ':star:': '⭐',
    };
  }

  // Process emoji shortcodes in text
  processEmojiShortcodes(text) {
    const emojiMap = this.getEmojiShortcodes();
    let processedText = text;
    
    // Replace shortcodes with emojis
    for (const [shortcode, emoji] of Object.entries(emojiMap)) {
      const regex = new RegExp(escapeRegex(shortcode), 'gi');
      processedText = processedText.replace(regex, emoji);
    }
    
    return processedText;
  }

  // Initialize Ably connection
  initializeAbly() {
    // Get or generate a unique client ID
    let clientId = localStorage.getItem('chatClientId');
    if (!clientId) {
      clientId = this.generateClientId();
      localStorage.setItem('chatClientId', clientId);
    }

    // Initialise Ably with auth endpoint
    this.ably = new Ably.Realtime.Promise({
      authUrl: 'https://api.dse.best/chat-auth',
      authMethod: 'POST',
      authParams: {
        clientId: clientId,
        username: localStorage.getItem('chatUsername') || this.randomUsername(),
        secretmodkey: this.getSecretKey() // Include mod key if available
      }
    });

    this.ably.connection.on('connected', () => { 
      this.setStatus('Connected', true); 
      this.addSystemMessage('Connected to chatroom');
      
      // Check and show welcome message for new users
      this.checkAndShowWelcomeMessage();
      
      // Check if user is a moderator (API may not support check_mod, so we'll handle gracefully)
      fetch('https://api.dse.best/chat-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check_mod',
          clientId: this.ably.auth.clientId,
          username: this.userNameInput.value.trim(),
          secretmodkey: this.getSecretKey() // Include mod key if available
        })
      })
      .then(response => {
        if (!response.ok) {
          // API doesn't support check_mod, that's okay
          return { isModerator: false };
        }
        return response.json();
      })
      .then(data => {
        this.isUserModerator = !!data.isModerator;
        if (this.isUserModerator) {
          this.addSystemMessage('Welcome, Moderator! Type /help to see available commands.');
        }
        
        // Dispatch event to React component
        console.log('Dispatching moderator status event:', this.isUserModerator);
        const event = new CustomEvent('moderatorStatusUpdate', {
          detail: { isModerator: this.isUserModerator }
        });
        document.dispatchEvent(event);
      })
      .catch(() => {
        // Silently fail - moderator check is not critical
        this.isUserModerator = false;
      });
    });

    this.ably.connection.on('disconnected', () => { 
      this.setStatus('Disconnected', false); 
      this.addSystemMessage('Disconnected from chatroom'); 
    });

    this.ably.connection.on('failed', () => { 
      this.setStatus('Failed', false); 
      this.addSystemMessage('Connection failed'); 
    });

    this.ably.connection.once('connected').then(() => {
      this.channel = this.ably.channels.get('dsebest-livechat');
      
      // Load last 50 messages
      this.channel.history({ limit: 50 }).then(result => {
        result.items.reverse().forEach(msg => {
          if (msg.data && msg.data.sender && msg.data.text) {
            // Skip displaying purge messages in history
            if (msg.data.isPurgeMessage) {
              return;
            }
            
            const isMine = msg.data.clientId === this.ably.auth.clientId;
            this.addMessage(msg.data.sender, msg.data.text, isMine, msg.timestamp, msg.data.clientId, msg.data.isModerator, msg.id);
          }
        });
      });

      // Subscribe to new messages
      this.channel.subscribe('message', msg => {
        const { sender, text, isModerator, clientId, isPurgeMessage } = msg.data;
        
        // Skip displaying purge messages
        if (isPurgeMessage) {
          return;
        }
        
        const isMine = clientId === this.ably.auth.clientId;
        this.addMessage(sender, text, isMine, msg.timestamp, clientId, isModerator, msg.id);
      });

      // Subscribe to moderation commands
      this.channel.subscribe('command', msg => {
        const { type, count, moderator, messageId, timestamp } = msg.data;
        
        if (type === 'purge') {
          if (count === 'all') {
            // Clear all messages
            this.chatMessages.textContent = '';
            this.addSystemMessage(`All messages were purged by moderator ${moderator}`);
          } else {
            // Clear last N messages
            const messages = Array.from(this.chatMessages.children).reverse();
            for (let i = 0; i < count && i < messages.length; i++) {
              messages[i].remove();
            }
            this.addSystemMessage(`Last ${count} messages were purged by moderator ${moderator}`);
          }
        } else if (type === 'delete') {
          // Remove specific message by ID
          const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
          if (messageElement) {
            messageElement.remove();
          }
        }
      });
      
      // Handle presence
      this.channel.presence.subscribe('enter', member => {
        this.channel.presence.get((err, members) => {
          if (!err) {
            this.setStatus('Connected', true, members.length);
          }
        });
      });
      
      this.channel.presence.subscribe('leave', member => {
        this.channel.presence.get((err, members) => {
          if (!err) {
            this.setStatus('Connected', true, members.length);
          }
        });
      });
      
      // Enter presence set
      this.channel.presence.enter();
      
      // Get initial presence count
      this.channel.presence.get((err, members) => {
        if (!err) {
          this.setStatus('Connected', true, members.length);
        }
      });
    });
  }

  // Helper function to disable/enable input
  setInputState(disabled, cooldownSeconds = 0) {
    this.messageInput.disabled = disabled;
    this.sendButton.disabled = disabled;
    if (disabled && cooldownSeconds > 0) {
      this.messageInput.placeholder = `Waiting ${cooldownSeconds} seconds...`;
    } else {
      this.messageInput.placeholder = 'Type a message…';
    }
  }

  // Start a cooldown timer
  startCooldown(duration) {
    this.setInputState(true, Math.ceil(duration/1000));
    const updateInterval = setInterval(() => {
      const remaining = Math.ceil((duration - (Date.now() - this.lastSendTime))/1000);
      if (remaining > 0) {
        this.setInputState(true, remaining);
      } else {
        clearInterval(updateInterval);
        this.setInputState(false);
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(updateInterval);
      this.setInputState(false);
    }, duration);
  }

  // Send message function
  async sendMessage() {
    if (!this.channel) {
      try { 
        this.channel = this.ably.channels.get('dsebest-livechat'); 
      } catch(e) {}
      if (!this.channel) return;
    }

    const now = Date.now();

    // Prevent double-sending by disabling during send
    if (this.isSending || this.messageInput.disabled) {
      return;
    }
    
    this.isSending = true;
    this.setInputState(true);

    // Enforce cooldown between messages
    if (now - this.lastSendTime < this.SEND_COOLDOWN) {
      const remainingCooldown = this.SEND_COOLDOWN - (now - this.lastSendTime);
      this.addSystemMessage(`Please wait ${Math.ceil(remainingCooldown/1000)} seconds before sending another message`);
      this.startCooldown(remainingCooldown);
      this.isSending = false;
      return;
    }

    // Check burst rate limit
    const burstWindowMessages = this.messageCount;
    if (now - this.windowStart <= this.BURST_WINDOW && burstWindowMessages >= this.MAX_BURST) {
      const waitTime = this.BURST_WINDOW - (now - this.windowStart);
      this.addSystemMessage(`You're sending too fast! Please wait ${Math.ceil(waitTime/1000)} seconds.`);
      this.startCooldown(waitTime);
      this.isSending = false;
      return;
    }

    // Check overall rate limit (messages per minute)
    if (now - this.rateLimitStartTime > this.RATE_LIMIT_WINDOW) {
      // Reset the minute window
      this.rateLimitMessageCount = 0;
      this.rateLimitStartTime = now;
    } else if (this.rateLimitMessageCount >= this.MAX_MESSAGES_PER_MINUTE) {
      const waitTime = this.RATE_LIMIT_WINDOW - (now - this.rateLimitStartTime);
      const minutes = Math.floor(waitTime/60000);
      const seconds = Math.ceil((waitTime % 60000)/1000);
      this.addSystemMessage(`Rate limit exceeded. Please wait ${minutes ? minutes + ' minute' + (minutes !== 1 ? 's' : '') : ''} ${seconds ? seconds + ' second' + (seconds !== 1 ? 's' : '') : ''}.`);
      this.startCooldown(waitTime);
      this.isSending = false;
      return;
    }

    // Reset burst window if needed
    if (now - this.windowStart > this.BURST_WINDOW) {
      this.messageCount = 0;
      this.windowStart = now;
    }
    
    const text = this.messageInput.value.trim();
    const sender = this.userNameInput.value.trim();

    // Process emoji shortcodes
    const processedText = this.processEmojiShortcodes(text);

    // Check for sticker format and validate
    const stickerMatch = processedText.match(/^\[([A-Za-z0-9_-]+)\]$/);
    if (stickerMatch) {
      const stickerName = stickerMatch[1];
      
      // Validate sticker name (allow all available stickers)
      const allowedStickers = [
        'excited', 'wave', 'shocked', 'shh', 'thumbsdown', 
        'agree', 'heart1', 'clap', 'thumbsup_glasses', 'mh'
      ];
      
      if (!allowedStickers.includes(stickerName.toLowerCase())) {
        this.addSystemMessage('Invalid sticker name.');
        this.isSending = false;
        this.setInputState(false);
        return;
      }
      
      // Sticker messages are always valid and don't need additional validation
      // They bypass length checks since they're just [STICKERNAME]
    } else {
      // Check if message contains multiple stickers (prevent [excited][excited])
      const stickerCount = (processedText.match(/\[[A-Za-z0-9_-]+\]/g) || []).length;
      if (stickerCount > 1) {
        this.addSystemMessage('Only one sticker per message is allowed.');
        this.isSending = false;
        this.setInputState(false);
        return;
      }
      
      // Enhanced validation with security checks for regular messages
      if (!this.validateUsername(sender)) {
        this.isSending = false;
        this.setInputState(false);
        return;
      }
      if (!this.validateMessage(processedText)) {
        this.isSending = false;
        this.setInputState(false);
        return;
      }

      // Additional client-side length and content verification for regular messages
      if (processedText.length > this.MAX_MESSAGE_LENGTH || sender.length > this.MAX_USERNAME_LENGTH) {
        this.addSystemMessage('Input exceeds maximum allowed length');
        this.isSending = false;
        this.setInputState(false);
        return;
      }
    }

    // First moderate the message
    fetch('https://api.dse.best/chat-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'moderate',
        clientId: this.ably.auth.clientId,
        username: sender,
        message: processedText,
        text: processedText,  // Add text property for command checking
        secretmodkey: this.getSecretKey() // Add secret key for mod auth
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.error || 'Failed to send message');
        });
      }
      return response.json().then(data => {
        if (data.command) {
          if (data.private) {
            // For private command responses (like /help and /info)
            // Add as system message only visible to the sender
            const wrap = document.createElement('div');
            wrap.className = 'chat-system-message text-start my-2 small fst-italic bg-dark bg-opacity-10 p-2 rounded';
            // Use pre-wrap to preserve formatting
            wrap.style.whiteSpace = 'pre-wrap';
            wrap.textContent = data.message;
            this.chatMessages.appendChild(wrap);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
          } else {
            // For public command confirmations
            this.addSystemMessage(data.message);
          }
          this.messageInput.value = '';
          return Promise.reject({ silentFail: true }); // Skip publishing
        }

        const messageData = { 
          sender, 
          text: processedText,
          timestamp: Date.now(),
          clientId: this.ably.auth.clientId // Include clientId for server verification
        };

        // Send to server for publishing
        return fetch('https://api.dse.best/chat-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'publish',
            message: messageData,
            clientId: this.ably.auth.clientId,
            username: sender,
            text: processedText,  // Add text property for command checking
            secretmodkey: this.getSecretKey() // Add secret key for mod auth
          })
        }).then(response => {
          if (!response.ok) {
            throw new Error('Failed to publish message');
          }
          return response.json();
        }).then(publishData => {
          // Server will handle the actual publishing through Ably
          // No need to publish here as the server will do it
          return Promise.resolve();
        });
      });
    })
    .then(() => {
      // Update all rate limit counters
      const now = Date.now();
      this.messageCount++;
      this.rateLimitMessageCount++;
      this.lastSendTime = now;
      this.messageInput.value = '';
      
      // Reset burst window if needed
      if (now - this.windowStart > this.BURST_WINDOW) {
        this.messageCount = 1;
        this.windowStart = now;
      }

      // Reset rate limit window if needed
      if (now - this.rateLimitStartTime > this.RATE_LIMIT_WINDOW) {
        this.rateLimitMessageCount = 1;
        this.rateLimitStartTime = now;
      }

      // Start cooldown timer
      this.startCooldown(this.SEND_COOLDOWN);
      this.isSending = false;
    })
    .catch(error => {
      if (!error.silentFail) {
        console.error(error);
        this.addSystemMessage(error.message || 'Failed to send message. Please try again.');
      }
      this.setInputState(false);
      this.isSending = false;
    });
  }

  // Send leave event to server for logging
  sendLeaveEvent() {
    if (!this.ably || !this.ably.auth.clientId) {
      return;
    }

    const username = this.userNameInput?.value?.trim() || 'Anonymous';
    
    // Send leave event asynchronously (don't wait for response)
    fetch('https://api.dse.best/chat-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'leave',
        clientId: this.ably.auth.clientId,
        username: username,
        secretmodkey: this.getSecretKey() // Add secret key for mod auth
      })
    }).catch(error => {
      // Silently fail - logging is not critical for user experience
      console.warn('Failed to log leave event:', error);
    });
  }
}

// Export for global use
window.DSEChat = DSEChat;