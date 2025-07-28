// DSE 2026 Canvas Countdown Timer
class DSECountdown {
  constructor() {
    // Target DSE 2026 specifically
    this.targetDate = new Date('2026-04-10T09:00:00+08:00');
    this.canvas = document.getElementById('countdownCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.previousNumbers = {};

    // Canvas setup
    if (this.canvas) {
      this.setupCanvas();
    }

    this.init();
  }

  setupCanvas() {
    // Make canvas responsive
    const resizeCanvas = () => {
      const container = this.canvas.parentElement;
      const containerWidth = container.offsetWidth;
      const isMobile = containerWidth < 768;

      // Different aspect ratios for mobile vs desktop
      // Mobile: Optimized aspect ratio for larger boxes with tighter spacing
      // Desktop: Horizontal aspect ratio for single row layout
      const aspectRatio = isMobile ? 0.22 : (900 / 300); // Slightly taller for larger boxes (0.22 = more height)

      this.canvas.style.width = '100%';
      this.canvas.style.height = 'auto';

      // Set actual canvas size for crisp rendering
      const scale = window.devicePixelRatio || 1;
      this.canvas.width = containerWidth * scale;
      this.canvas.height = (containerWidth / aspectRatio) * scale;

      this.ctx.scale(scale, scale);
      this.canvasWidth = containerWidth;
      this.canvasHeight = containerWidth / aspectRatio;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  init() {
    this.startCountdown();

    // Update every second
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  startCountdown() {
    // Initial draw
    this.updateCountdown();
  }

  updateCountdown() {
    const now = new Date().getTime();
    const examTime = this.targetDate.getTime();
    const timeDiff = examTime - now;

    if (timeDiff <= 0) {
      this.handleExamStarted();
      return;
    }

    // Calculate time units
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Draw on canvas
    if (this.ctx) {
      this.drawCountdown(days, hours, minutes, seconds);
    }

    // Update digital display as backup
    this.updateDigitalDisplay(days, hours, minutes, seconds);
  }

  drawCountdown(days, hours, minutes, seconds) {
    if (!this.ctx || !this.canvasWidth) return;

    // Clear canvas (no background needed)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Simplified responsive breakpoints: mobile < 768, everything else is horizontal
    const isMobile = this.canvasWidth < 768;

    if (isMobile) {
      // Mobile: Vertical layout with larger boxes and tighter spacing
      const maxBoxSize = Math.min(this.canvasWidth * 0.85, 220); // Increased max size for larger boxes
      const minGap = 8; // Reduced minimum gap between boxes for tighter spacing

      // Calculate optimal box size and gap to fit all 4 boxes with tighter spacing
      const availableHeight = this.canvasHeight - 30; // Reduced margins (15px top and bottom)
      const totalGaps = 3; // 3 gaps between 4 boxes
      const maxPossibleBoxSize = (availableHeight - (minGap * totalGaps)) / 4;

      const boxSize = Math.min(maxBoxSize, maxPossibleBoxSize);
      const gap = Math.max(minGap, Math.min(12, (availableHeight - (boxSize * 4)) / totalGaps)); // Cap gap at 12px

      const centerX = this.canvasWidth / 2;
      const startY = 15 + boxSize / 2; // Reduced top margin to 15px

      // Draw each time unit vertically with tighter spacing
      this.drawTimeUnit(days, 'DAYS', '天', centerX, startY, boxSize, boxSize, true);
      this.drawTimeUnit(hours, 'HOURS', '小時', centerX, startY + boxSize + gap, boxSize, boxSize, true);
      this.drawTimeUnit(minutes, 'MINUTES', '分鐘', centerX, startY + (boxSize + gap) * 2, boxSize, boxSize, true);
      this.drawTimeUnit(seconds, 'SECONDS', '秒', centerX, startY + (boxSize + gap) * 3, boxSize, boxSize, true);
    } else {
      // Desktop/Tablet: Horizontal layout for all non-mobile screens (768px and above)
      const margin = this.canvasWidth * 0.06; // 6% margin on each side for more space
      const gapBetweenBoxes = this.canvasWidth * 0.03; // 3% gap between boxes
      const totalGaps = gapBetweenBoxes * 3; // 3 gaps between 4 boxes
      const totalMargins = margin * 2; // Left and right margins
      const availableWidth = this.canvasWidth - totalGaps - totalMargins;
      const boxWidth = availableWidth / 4; // Equal width for all boxes
      const centerY = this.canvasHeight / 2;

      // Make boxes more square-like by using a proportional height
      const boxHeight = Math.min(this.canvasHeight * 0.75, boxWidth * 1.2); // Square-ish boxes

      // Calculate positions with even distribution
      const box1X = margin + boxWidth / 2;
      const box2X = box1X + boxWidth + gapBetweenBoxes;
      const box3X = box2X + boxWidth + gapBetweenBoxes;
      const box4X = box3X + boxWidth + gapBetweenBoxes;

      // Draw each time unit horizontally
      this.drawTimeUnit(days, 'DAYS', '天', box1X, centerY, boxWidth, boxHeight, false);
      this.drawTimeUnit(hours, 'HOURS', '小時', box2X, centerY, boxWidth, boxHeight, false);
      this.drawTimeUnit(minutes, 'MINUTES', '分鐘', box3X, centerY, boxWidth, boxHeight, false);
      this.drawTimeUnit(seconds, 'SECONDS', '秒', box4X, centerY, boxWidth, boxHeight, false);
    }
  }

  drawTimeUnit(value, labelEn, labelZh, x, y, boxWidth, boxHeight, isMobile) {
    const ctx = this.ctx;

    // Draw individual box background
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;

    const rectX = x - boxWidth / 2;
    const rectY = y - boxHeight / 2;

    ctx.beginPath();
    ctx.roundRect(rectX, rectY, boxWidth, boxHeight, 15);
    ctx.fill();
    ctx.stroke();

    // Draw number with optimized responsive font size
    ctx.fillStyle = '#ffffff';
    const numberSize = isMobile
      ? Math.min(boxWidth * 0.35, 65)  // Mobile: Increased to 35% of box width, max 65px
      : Math.min(boxWidth * 0.4, 60);  // Desktop: 40% of box width, max 60px
    ctx.font = `bold ${numberSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const displayValue = value.toString().padStart(value >= 100 ? 3 : 2, '0');

    // Position number optimally in the box
    const numberOffset = isMobile ? -boxHeight * 0.1 : -boxHeight * 0.08;
    ctx.fillText(displayValue, x, y + numberOffset);

    // Draw labels with optimized responsive font size
    const labelSize = isMobile
      ? Math.min(boxWidth * 0.11, 20)  // Mobile: Increased to 11% of box width, max 20px
      : Math.min(boxWidth * 0.12, 15); // Desktop: 12% of box width, max 15px
    ctx.font = `bold ${labelSize}px Arial, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = 2;

    // Position labels optimally in the box with better spacing
    const labelSpacing = labelSize + 3; // Slightly more spacing
    const labelStartY = isMobile ? y + boxHeight * 0.2 : y + boxHeight * 0.18;
    ctx.fillText(labelZh, x, labelStartY);
    ctx.fillText(labelEn, x, labelStartY + labelSpacing);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }



  updateDigitalDisplay(days, hours, minutes, seconds) {
    // Update digital display as backup
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  handleExamStarted() {
    if (this.ctx) {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Draw celebration message
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 36px Arial, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('DSE 2026 已開始！', this.canvasWidth / 2, this.canvasHeight / 2 - 20);
      this.ctx.font = 'bold 24px Arial, sans-serif';
      this.ctx.fillText('DSE 2026 Has Started!', this.canvasWidth / 2, this.canvasHeight / 2 + 20);
      this.ctx.fillText('祝所有考生考試順利！💪', this.canvasWidth / 2, this.canvasHeight / 2 + 60);
    }

    // Clear the interval
    clearInterval(this.interval);
  }

  // Cleanup method
  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Initialize countdown when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if countdown canvas exists
  if (document.getElementById('countdownCanvas')) {
    window.dseCountdown = new DSECountdown();
  }
});

// Handle page navigation (for SPA-like behavior)
document.addEventListener('swup:contentReplaced', function() {
  // Cleanup previous countdown
  if (window.dseCountdown) {
    window.dseCountdown.destroy();
  }

  // Initialize new countdown if canvas exists
  if (document.getElementById('countdownCanvas')) {
    window.dseCountdown = new DSECountdown();
  }
});

// Add roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
  };
}
