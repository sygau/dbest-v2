// Announcement Bar Configuration
export const announcementConfig = {
  enabled: false,
  content: '📢 Notice: We are looking for suggestions of new features and improvements for our website. Tell us in the Chatroom!',
  type: 'info' as const,
  dismissible: true,
  closable: true,
  autoHide: false,
  autoHideDelay: 5000,
  showOnPages: ['*'],
  
  // Pages where announcement should be hidden
  // Add page paths here to disable announcement on those pages
  // Examples: '/chat', '/admin', '/maintenance', '/lock'
  hideOnPages: ['/chat']
}

// Example configurations you can copy and paste:

// Maintenance Notice
// content: '<strong>🔧 Maintenance:</strong> We will be performing scheduled maintenance tonight from 2:00 AM to 4:00 AM HKT.',
// type: 'warning',

// New Feature Announcement  
// content: '<strong>🎉 New Feature:</strong> Check out our new <a href="/countdown">DSE Countdown Timer</a>!',
// type: 'success',

// Exam Reminder
// content: '<strong>📚 DSE 2025:</strong> Exams are approaching! Review our <strong>cutoff data</strong> and study resources.',
// type: 'info',

// Emergency Notice
// content: '<strong>🚨 Important:</strong> Due to technical issues, some features may be temporarily unavailable.',
// type: 'error',

// Page targeting examples:
// hideOnPages: ['/chat'] - Hide only on chatroom
// hideOnPages: ['/chat', '/admin'] - Hide on chatroom and admin pages
// hideOnPages: ['/chat', '/admin', '/maintenance', '/lock'] - Hide on multiple pages
// showOnPages: ['/'] - Show only on homepage
// showOnPages: ['/', '/about', '/contact'] - Show on specific pages only

// To reset dismissal (run in browser console):
// localStorage.removeItem('dsebest_announcement_dismissed_' + your_announcement_content.slice(0, 50))
