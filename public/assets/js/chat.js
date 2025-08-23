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
    this.SEND_COOLDOWN = 15000; // 15s cooldown between sends
    this.MAX_MESSAGES_PER_MINUTE = 8; // Max 8 messages per minute
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

  // Initialize the chat system
  init() {
    if (this.isInitialized) {
      console.log('Chat already initialized');
      return;
    }

    // Check if we have the required DOM elements
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

  // Clean up when navigating away
  destroy() {
    if (!this.isInitialized) return;

    console.log('Destroying DSE Chat...');
    
    // Send leave event to server
    this.sendLeaveEvent();
    
    // Disconnect from Ably
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

    // Remove event listeners
    this.removeEventListeners();
    
    // Reset state
    this.isInitialized = false;
    this.ably = null;
    this.channel = null;
    this.isUserModerator = false;
    this.isSending = false;
    
    // Clear DOM references
    this.chatMessages = null;
    this.statusDot = null;
    this.statusText = null;
    this.userNameInput = null;
    this.editNameBtn = null;
    this.messageInput = null;
    this.sendButton = null;
    this.charCounter = null;
  }

  // Generate a random username
  randomUsername() {
    const animals = ['Tiger','Panda','Dolphin','Eagle','Fox','Koala','Lion','Otter','Penguin','Shark'];
    return animals[Math.floor(Math.random()*animals.length)] + Math.floor(100 + Math.random()*900);
  }

  // Load username from localStorage or generate new one
  initializeUsername() {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      this.userNameInput.value = savedUsername;
    } else {
      this.userNameInput.value = this.randomUsername();
      localStorage.setItem('chatUsername', this.userNameInput.value);
    }
  }

  // Get secret key from localStorage if available
  getSecretKey() {
    return localStorage.getItem('dsechat_mod_secret') || null;
  }

  // Enhanced validation functions with security checks
  validateUsername(username) {
    if (!username) {
      this.addSystemMessage('Username cannot be empty');
      return false;
    }
    
    // Sanitize input
    const cleanUsername = String(username).trim();
    
    if (cleanUsername.length < this.MIN_USERNAME_LENGTH) {
      this.addSystemMessage(`Username must be at least ${this.MIN_USERNAME_LENGTH} characters long`);
      return false;
    }
    if (cleanUsername.length > this.MAX_USERNAME_LENGTH) {
      this.addSystemMessage(`Username cannot be longer than ${this.MAX_USERNAME_LENGTH} characters`);
      return false;
    }
    
    // Check for suspicious patterns
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
    
    // Sanitize input
    const cleanMessage = String(message).trim();
    
    if (cleanMessage.length > this.MAX_MESSAGE_LENGTH) {
      this.addSystemMessage(`Message cannot be longer than ${this.MAX_MESSAGE_LENGTH} characters`);
      return false;
    }
    
    // Client-side security checks (server will do more thorough checks)
    if (/<script|javascript:|onload|onerror|eval\s*\(|fetch\s*\(|xhr|websocket/i.test(cleanMessage)) {
      this.addSystemMessage('Message contains suspicious content');
      return false;
    }

    // Enhanced link detection (client-side)
    const linkPatterns = [
      /(https?:\/\/[^\s]+)/gi,
      /(www\.[^\s]+)/gi,
      /\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/gi,
      /(bit\.ly|tinyurl|t\.co|goo\.gl|discord\.gg)/gi,
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi
    ];

    for (const pattern of linkPatterns) {
      if (pattern.test(cleanMessage)) {
        this.addSystemMessage('Links and domains are not allowed in messages');
        return false;
      }
    }

    // Basic profanity check (client-side preview)
    if (/\b(fuck|shit|damn|bitch|ass|hell|crap|piss|bastard|whore|slut|cunt|cock|dick|pussy|tits|boobs|sex|porn|nude|naked|nigger|nigga|faggot|retard)\b/i.test(cleanMessage)) {
      this.addSystemMessage('Message contains inappropriate language');
      return false;
    }
    
    return true;
  }

  // Setup event listeners
  setupEventListeners() {
    // Username editing
    this.editNameBtn.addEventListener('click', this.handleEditName.bind(this));
    this.userNameInput.addEventListener('keypress', this.handleUsernameKeypress.bind(this));

    // Mobile username handling
    const saveUsernameBtn = document.getElementById('saveUsernameBtn');
    if (saveUsernameBtn) {
      saveUsernameBtn.addEventListener('click', this.handleMobileUsernameSave.bind(this));
    }

    const usernameModal = document.getElementById('usernameModal');
    if (usernameModal) {
      usernameModal.addEventListener('show.bs.modal', this.handleUsernameModalShow.bind(this));
    }

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
    this.editNameBtn.textContent = iconClass;
  }

  handleEditName() {
    const isEditing = this.userNameInput.disabled;
    if (!isEditing) {
      // Save changes
      const newUsername = this.userNameInput.value.trim();
      if (this.validateUsername(newUsername)) {
        this.userNameInput.disabled = true;
        this.setEditButtonIcon('✏️');
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
      this.setEditButtonIcon('✅');
    }
  }

  handleUsernameKeypress(e) {
    if (e.key === 'Enter') {
      const newUsername = this.userNameInput.value.trim();
      if (this.validateUsername(newUsername)) {
        this.userNameInput.disabled = true;
        this.setEditButtonIcon('✏️');
        localStorage.setItem('chatUsername', newUsername);
        this.addSystemMessage(`Username changed to ${newUsername}`);
      }
    }
  }

  handleMobileUsernameSave() {
    const mobileInput = document.getElementById('userNameInputMobile');
    if (!mobileInput) return;

    const newUsername = mobileInput.value.trim();
    if (this.validateUsername(newUsername)) {
      this.userNameInput.value = newUsername;
      localStorage.setItem('chatUsername', newUsername);
      this.addSystemMessage(`Username changed to ${newUsername}`);
      
      // Hide modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('usernameModal'));
      if (modal) {
        modal.hide();
      }
    }
  }

  handleUsernameModalShow() {
    const mobileInput = document.getElementById('userNameInputMobile');
    if (mobileInput) {
      mobileInput.value = this.userNameInput.value;
    }
  }

  handleMessageKeypress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  // Show rules modal
  showRulesModal() {
    const rulesModal = document.getElementById('rulesModal');
    if (rulesModal) {
      const modal = (bootstrap.Modal.getOrCreateInstance
        ? bootstrap.Modal.getOrCreateInstance(rulesModal)
        : new bootstrap.Modal(rulesModal));
      modal.show();
    }
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
    const wrap = document.createElement('div');
    wrap.className = 'chat-system-message text-center my-3 p-3 border rounded-3 bg-primary bg-opacity-10';
    
    // Create elements safely instead of using innerHTML
    const iconDiv = document.createElement('div');
    iconDiv.className = 'mb-2';
    const icon = document.createElement('i');
    icon.textContent = '👋';
    icon.style.fontSize = '24px';
    iconDiv.appendChild(icon);
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'text-primary fw-bold mb-2';
    titleDiv.textContent = '歡迎來到 DSE Best 聊天室！ Welcome to DSE Best Chatroom!';
    
    const descDiv = document.createElement('div');
    descDiv.className = 'small mb-2';
    descDiv.textContent = '請花一分鐘閱讀聊天室規則，確保大家都有良好的交流體驗。Please take a moment to read the chat rules to ensure a positive experience for everyone.';
    
    const button = document.createElement('button');
    button.className = 'btn btn-primary btn-sm';
    button.id = 'welcomeRulesBtn';
    const buttonIcon = document.createElement('i');
    buttonIcon.textContent = '📖';
    buttonIcon.style.fontSize = '16px';
    button.appendChild(buttonIcon);
    button.appendChild(document.createTextNode(' 閱讀規則 Read Rules'));
    
    wrap.appendChild(iconDiv);
    wrap.appendChild(titleDiv);
    wrap.appendChild(descDiv);
    wrap.appendChild(button);
    
    this.chatMessages.appendChild(wrap);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    
    // Add click handler for the welcome rules button
    const welcomeRulesBtn = document.getElementById('welcomeRulesBtn');
    if (welcomeRulesBtn) {
      welcomeRulesBtn.addEventListener('click', this.showRulesModal.bind(this));
    }
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
      const badgeIcon = document.createElement('i');
      badgeIcon.textContent = '🛡️';
      badgeIcon.style.fontSize = '16px';
      badge.appendChild(badgeIcon);
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
    
    // Message content - CRITICAL: Use textContent to prevent XSS
    const textSpan = document.createElement('span');
    textSpan.textContent = String(text || '').substring(0, 500); // Limit length as extra safety
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
      statusTextEl.innerHTML = `[${text}] | ${onlineCount} ${onlineCount === 1 ? 'User' : 'Users'} Online`;
    }
    
    if (statusIndicator) {
      statusIndicator.className = `status-indicator ${connected ? 'connected' : 'connecting'}`;
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
      ':sun:': '☀️',
      ':moon:': '🌙',
      ':rainbow:': '🌈',
      ':coffee:': '☕',
      ':pizza:': '🍕',
      ':birthday:': '🎂',
      ':party:': '🎉',
      ':music:': '🎵',
      ':book:': '📚',
      ':pencil:': '✏️',
      ':check:': '✅',
      ':cross:': '❌',
      ':question:': '❓',
      ':exclamation:': '❗',
      ':thinking:': '🤔',
      ':cool:': '😎',
      ':wink:': '😉',
      ':kiss:': '😘',
      ':surprised:': '😮',
      ':sleepy:': '😴',
      ':sick:': '🤒',
      ':dizzy:': '😵',
      ':clap:': '👏',
      ':wave:': '👋',
      ':pray:': '🙏',
      ':muscle:': '💪',
      ':brain:': '🧠',
      ':eyes:': '👀',
      ':ear:': '👂',
      ':nose:': '👃',
      ':tongue:': '👅',
      ':lips:': '💋',
      ':nail:': '💅',
      ':selfie:': '🤳',
      ':dance:': '💃',
      ':run:': '🏃',
      ':swim:': '🏊',
      ':bike:': '🚴',
      ':car:': '🚗',
      ':bus:': '🚌',
      ':train:': '🚆',
      ':plane:': '✈️',
      ':rocket:': '🚀',
      ':house:': '🏠',
      ':school:': '🏫',
      ':hospital:': '🏥',
      ':bank:': '🏦',
      ':church:': '⛪',
      ':mountain:': '⛰️',
      ':beach:': '🏖️',
      ':ocean:': '🌊',
      ':tree:': '🌳',
      ':flower:': '🌸',
      ':rose:': '🌹',
      ':tulip:': '🌷',
      ':sunflower:': '🌻',
      ':cactus:': '🌵',
      ':apple:': '🍎',
      ':banana:': '🍌',
      ':orange:': '🍊',
      ':grape:': '🍇',
      ':strawberry:': '🍓',
      ':watermelon:': '🍉',
      ':pineapple:': '🍍',
      ':peach:': '🍑',
      ':cherry:': '🍒',
      ':kiwi:': '🥝',
      ':avocado:': '🥑',
      ':tomato:': '🍅',
      ':corn:': '🌽',
      ':carrot:': '🥕',
      ':potato:': '🥔',
      ':bread:': '🍞',
      ':cheese:': '🧀',
      ':meat:': '🥩',
      ':chicken:': '🍗',
      ':bacon:': '🥓',
      ':hamburger:': '🍔',
      ':fries:': '🍟',
      ':hotdog:': '🌭',
      ':taco:': '🌮',
      ':burrito:': '🌯',
      ':sushi:': '🍣',
      ':ramen:': '🍜',
      ':soup:': '🍲',
      ':salad:': '🥗',
      ':icecream:': '🍦',
      ':donut:': '🍩',
      ':cookie:': '🍪',
      ':candy:': '🍬',
      ':chocolate:': '🍫',
      ':popcorn:': '🍿',
      ':beer:': '🍺',
      ':wine:': '🍷',
      ':cocktail:': '🍸',
      ':tea:': '🍵',
      ':juice:': '🧃',
      ':milk:': '🥛',
      ':water:': '💧',
      ':dog:': '🐶',
      ':cat:': '🐱',
      ':mouse:': '🐭',
      ':hamster:': '🐹',
      ':rabbit:': '🐰',
      ':fox:': '🦊',
      ':bear:': '🐻',
      ':panda:': '🐼',
      ':koala:': '🐨',
      ':tiger:': '🐯',
      ':lion:': '🦁',
      ':cow:': '🐮',
      ':pig:': '🐷',
      ':frog:': '🐸',
      ':monkey:': '🐵',
      ':chicken:': '🐔',
      ':penguin:': '🐧',
      ':bird:': '🐦',
      ':duck:': '🦆',
      ':eagle:': '🦅',
      ':owl:': '🦉',
      ':bat:': '🦇',
      ':wolf:': '🐺',
      ':horse:': '🐴',
      ':unicorn:': '🦄',
      ':zebra:': '🦓',
      ':deer:': '🦌',
      ':cow:': '🐄',
      ':sheep:': '🐑',
      ':goat:': '🐐',
      ':camel:': '🐪',
      ':elephant:': '🐘',
      ':rhino:': '🦏',
      ':hippo:': '🦛',
      ':giraffe:': '🦒',
      ':kangaroo:': '🦘',
      ':badger:': '🦡',
      ':otter:': '🦦',
      ':skunk:': '🦨',
      ':sloth:': '🦥',
      ':turtle:': '🐢',
      ':snake:': '🐍',
      ':lizard:': '🦎',
      ':dragon:': '🐲',
      ':fish:': '🐟',
      ':shark:': '🦈',
      ':whale:': '🐳',
      ':dolphin:': '🐬',
      ':octopus:': '🐙',
      ':crab:': '🦀',
      ':lobster:': '🦞',
      ':shrimp:': '🦐',
      ':squid:': '🦑',
      ':bug:': '🐛',
      ':ant:': '🐜',
      ':bee:': '🐝',
      ':butterfly:': '🦋',
      ':spider:': '🕷️',
      ':scorpion:': '🦂',
      ':mosquito:': '🦟'
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
      authUrl: 'https://dse.best/api/chat-auth',
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
      fetch('/api/chat-auth', {
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

    // Enhanced validation with security checks
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

    // Additional client-side length and content verification
    if (processedText.length > this.MAX_MESSAGE_LENGTH || sender.length > this.MAX_USERNAME_LENGTH) {
      this.addSystemMessage('Input exceeds maximum allowed length');
      this.isSending = false;
      this.setInputState(false);
      return;
    }

    // First moderate the message
    fetch('/api/chat-auth', {
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
        return fetch('/api/chat-auth', {
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
    fetch('/api/chat-auth', {
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
