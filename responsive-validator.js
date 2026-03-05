// =============================================================================
// 📱 SCRIPT DE VALIDACIÓN RESPONSIVA - LE BON MARCHÉ
// =============================================================================
// Copia y pega este código en la Consola de DevTools (F12 → Console)
// Ejecuta cualquiera de las funciones para validar

const ResponsiveValidator = {
  /**
   * 🔍 VALIDACIÓN 1: Verificar overflow horizontal
   * Uso: ResponsiveValidator.checkHorizontalScroll()
   */
  checkHorizontalScroll() {
    console.log('🔍 Checking horizontal overflow...');
    const htmlWidth = document.documentElement.scrollWidth;
    const windowWidth = window.innerWidth;
    const overflow = htmlWidth - windowWidth;

    if (overflow > 0) {
      console.error(`❌ OVERFLOW DETECTED: ${overflow}px extra width`);
      return { pass: false, overflow };
    } else {
      console.log('✅ No horizontal overflow detected');
      return { pass: true, overflow: 0 };
    }
  },

  /**
   * 🔘 VALIDACIÓN 2: Verificar tamaño mínimo de botones
   * Uso: ResponsiveValidator.checkButtonSizes()
   */
  checkButtonSizes() {
    console.log('🔘 Checking button sizes (minimum 44x44px)...');
    const MIN_SIZE = 44;
    const buttons = document.querySelectorAll('button, [role="button"]');
    const tooSmall = [];

    buttons.forEach((btn, idx) => {
      const rect = btn.getBoundingClientRect();
      if (rect.height < MIN_SIZE || rect.width < MIN_SIZE) {
        tooSmall.push({
          index: idx,
          element: btn.tagName,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          text: btn.textContent.slice(0, 30)
        });
      }
    });

    if (tooSmall.length > 0) {
      console.warn(`⚠️ Found ${tooSmall.length} buttons smaller than 44x44px:`);
      console.table(tooSmall);
      return { pass: false, tooSmall };
    } else {
      console.log(`✅ All ${buttons.length} buttons are >= 44x44px`);
      return { pass: true, count: buttons.length };
    }
  },

  /**
   * 🖼️ VALIDACIÓN 3: Verificar imágenes
   * Uso: ResponsiveValidator.checkImages()
   */
  checkImages() {
    console.log('🖼️ Checking images...');
    const images = document.querySelectorAll('img');
    const issues = [];
    const imageData = [];

    images.forEach((img, idx) => {
      if (!img.src) {
        issues.push({ index: idx, issue: 'Missing src' });
      }
      if (!img.alt && !img.getAttribute('aria-label')) {
        issues.push({ index: idx, issue: 'Missing alt text' });
      }

      const ratio = img.naturalWidth > 0 ? (img.naturalWidth / img.naturalHeight).toFixed(2) : 'loading';
      imageData.push({
        index: idx,
        alt: img.alt || '(no alt)',
        width: img.naturalWidth,
        height: img.naturalHeight,
        ratio: ratio,
        loading: img.loading || 'eager'
      });
    });

    console.log(`Found ${images.length} images`);
    if (issues.length > 0) {
      console.warn(`⚠️ Found ${issues.length} issues:`);
      console.table(issues);
    } else {
      console.log('✅ All images have alt text');
    }
    console.table(imageData.slice(0, 10)); // Show first 10
    return { pass: issues.length === 0, issues, imageCount: images.length };
  },

  /**
   * 📐 VALIDACIÓN 4: Verificar espaciado y gaps
   * Uso: ResponsiveValidator.checkSpacing()
   */
  checkSpacing() {
    console.log('📐 Checking spacing (grid/flex gaps)...');
    const containers = document.querySelectorAll('[class*="grid"], [class*="flex"]');
    const spacingData = [];

    containers.forEach((container, idx) => {
      const computed = window.getComputedStyle(container);
      const gap = computed.gap;
      const display = computed.display;
      const gridCols = computed.gridTemplateColumns;
      const flexDir = computed.flexDirection;

      if (display.includes('grid') || display.includes('flex')) {
        spacingData.push({
          index: idx,
          display: display,
          gap: gap || 'auto',
          cols: gridCols ? gridCols.split(' ').length : 'flex',
          class: container.className.slice(0, 30)
        });
      }
    });

    console.log(`✅ Found ${spacingData.length} grid/flex containers`);
    console.table(spacingData.slice(0, 15));
    return { pass: true, containerCount: spacingData.length };
  },

  /**
   * ♿ VALIDACIÓN 5: Accesibilidad básica
   * Uso: ResponsiveValidator.checkAccessibility()
   */
  checkAccessibility() {
    console.log('♿ Checking accessibility...');
    const issues = [];

    // Check form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    const inputsWithoutLabel = [];
    inputs.forEach(input => {
      const hasLabel = !!input.getAttribute('aria-label') || 
                       !!input.getAttribute('placeholder') ||
                       !!document.querySelector(`label[for="${input.id}"]`);
      if (!hasLabel) inputsWithoutLabel.push(input);
    });

    // Check headings order
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    const headingIssues = [];
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      if (level > lastLevel + 1 && lastLevel > 0) {
        headingIssues.push(`Skip from H${lastLevel} to H${level}`);
      }
      lastLevel = level;
    });

    // Check color contrast (simple check)
    const lowContrast = [];
    document.querySelectorAll('p, span, button').forEach(el => {
      const computed = window.getComputedStyle(el);
      const color = computed.color;
      const bg = computed.backgroundColor;
      // Very simplified check
      if (color === 'rgb(128, 128, 128)' && bg === 'rgb(255, 255, 255)') {
        lowContrast.push(el);
      }
    });

    const results = {
      h1Count: document.querySelectorAll('h1').length,
      inputsTotal: inputs.length,
      inputsWithoutLabel: inputsWithoutLabel.length,
      headingOrder: headingIssues,
      possibleLowContrast: lowContrast.length
    };

    console.log('✅ Accessibility Check Results:');
    console.table(results);

    return { pass: results.inputsWithoutLabel === 0, ...results };
  },

  /**
   * 📊 VALIDACIÓN 6: Verificar tipografía y tamaños
   * Uso: ResponsiveValidator.checkTypography()
   */
  checkTypography() {
    console.log('📝 Checking typography...');
    const textElements = document.querySelectorAll('h1, h2, h3, p, span, a, button');
    const fontSizes = {};
    const fontFamilies = {};

    textElements.forEach(el => {
      const computed = window.getComputedStyle(el);
      const size = computed.fontSize;
      const family = computed.fontFamily;
      const weight = computed.fontWeight;

      fontSizes[size] = (fontSizes[size] || 0) + 1;
      fontFamilies[family] = (fontFamilies[family] || 0) + 1;

      // Check minimum size
      const sizeNum = parseInt(size);
      if (sizeNum < 12 && el.closest('body')) {
        console.warn(`⚠️ Very small font: ${size} on ${el.tagName}`);
      }
    });

    console.log('🎨 Font sizes found:');
    console.table(fontSizes);
    console.log('📚 Font families found:');
    console.table(fontFamilies);

    return { pass: true, fontSizeCount: Object.keys(fontSizes).length };
  },

  /**
   * ⚡ VALIDACIÓN 7: Performance básico
   * Uso: ResponsiveValidator.checkPerformance()
   */
  checkPerformance() {
    console.log('⚡ Checking performance metrics...');

    // Check image file sizes
    const images = Array.from(document.querySelectorAll('img'));
    console.log(`📷 Total images: ${images.length}`);

    // Check script sizes
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    console.log(`📜 Total external scripts: ${scripts.length}`);

    // Check CSS files
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    console.log(`🎨 Total CSS files: ${stylesheets.length}`);

    // Performance API
    if (performance.timing) {
      const perf = performance.timing;
      const pageLoadTime = perf.loadEventEnd - perf.navigationStart;
      const connectTime = perf.responseEnd - perf.requestStart;
      const renderTime = perf.domComplete - perf.domLoading;

      console.log('⏱️ Timing metrics:');
      console.table({
        'Page Load': pageLoadTime + 'ms',
        'Connect Time': connectTime + 'ms',
        'Render Time': renderTime + 'ms'
      });
    }

    return { 
      pass: true, 
      images: images.length, 
      scripts: scripts.length, 
      stylesheets: stylesheets.length 
    };
  },

  /**
   * ✅ VALIDACIÓN COMPLETA: Ejecuta todas las pruebas
   * Uso: ResponsiveValidator.runFullCheck()
   */
  runFullCheck() {
    console.clear();
    console.log('%c🚀 FULL RESPONSIVE VALIDATION CHECK', 'font-size: 16px; font-weight: bold; color: #C5A059;');
    console.log('%cTesting at: ' + window.innerWidth + 'x' + window.innerHeight, 'color: #666;');
    console.log('');

    const results = {
      overflow: this.checkHorizontalScroll(),
      buttons: this.checkButtonSizes(),
      images: this.checkImages(),
      spacing: this.checkSpacing(),
      accessibility: this.checkAccessibility(),
      typography: this.checkTypography(),
      performance: this.checkPerformance()
    };

    console.log('');
    console.log('%c📊 SUMMARY', 'font-size: 14px; font-weight: bold;');
    const passed = Object.values(results).filter(r => r.pass).length;
    const total = Object.keys(results).length;
    console.log(`%c${passed}/${total} checks passed`, 
      passed === total ? 'color: #22c55e; font-weight: bold;' : 'color: #ef4444; font-weight: bold;'
    );

    return results;
  },

  /**
   * 📋 UTILITY: Mostrar breakpoint actual
   * Uso: ResponsiveValidator.showCurrentBreakpoint()
   */
  showCurrentBreakpoint() {
    const width = window.innerWidth;
    let breakpoint = '';

    if (width < 640) breakpoint = 'Mobile (< 640px)';
    else if (width < 768) breakpoint = 'Small Tablet (640-768px)';
    else if (width < 1024) breakpoint = 'Tablet (768-1024px)';
    else if (width < 1280) breakpoint = 'Small Desktop (1024-1280px)';
    else breakpoint = 'Desktop (> 1280px)';

    console.log(`📱 Current viewport: ${width}x${window.innerHeight}`);
    console.log(`🎯 Breakpoint: ${breakpoint}`);
  },

  /**
   * 🎨 UTILITY: Highlight todos los elementos con la clase específica
   * Uso: ResponsiveValidator.highlightClass('product-card')
   */
  highlightClass(className) {
    document.querySelectorAll('.' + className).forEach(el => {
      el.style.outline = '3px solid #C5A059';
      el.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
    });
    console.log(`✅ Highlighted all .${className} elements`);
  }
};

// =============================================================================
// 🎯 EJEMPLOS DE USO
// =============================================================================

console.log('%c💡 EJEMPLOS DE USO:', 'font-weight: bold; font-size: 12px;');
console.log(`
// 1. Verificar overflow
ResponsiveValidator.checkHorizontalScroll()

// 2. Verificar tamaño de botones
ResponsiveValidator.checkButtonSizes()

// 3. Verificar imágenes
ResponsiveValidator.checkImages()

// 4. Verificar espaciado
ResponsiveValidator.checkSpacing()

// 5. Verificar accesibilidad
ResponsiveValidator.checkAccessibility()

// 6. Verificar tipografía
ResponsiveValidator.checkTypography()

// 7. Verificar performance
ResponsiveValidator.checkPerformance()

// 8. Ejecutar todas las pruebas (RECOMENDADO)
ResponsiveValidator.runFullCheck()

// 9. Mostrar breakpoint actual
ResponsiveValidator.showCurrentBreakpoint()

// 10. Highlight elementos específicos
ResponsiveValidator.highlightClass('product-card')
`);

// =============================================================================
// 🎬 AUTO-EJECUCIÓN (opcional)
// =============================================================================
// Descomenta para que se ejecute automáticamente
// ResponsiveValidator.runFullCheck();
