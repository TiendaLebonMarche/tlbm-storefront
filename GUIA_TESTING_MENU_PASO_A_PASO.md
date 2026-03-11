# 🧪 Guía Paso a Paso: Testing del Menú y Header

**Objetivo:** Verificar que el menú y header responden correctamente en todos los dispositivos

**Tiempo estimado:** 15-20 minutos
**Requisitos:** Navegador web, proyecto running (`npm run dev`)

---

## 🚀 Inicio Rápido

### Paso 1: Iniciar el Proyecto

```bash
cd c:\tiendalebonmarche\tlbm-storefront
npm run dev
```

✅ Espera a que diga: `▲ [vercel] Ready in XXXms`

---

### Paso 2: Abrir en Navegador

1. Abre **Chrome**, **Edge** o **Firefox**
2. Navega a: `http://localhost:3000`

---

## 📱 Testing por Dispositivo

### 🔵 TEST 1: MOBILE PEQUEÑO (320px - iPhone SE)

**Abre DevTools:**
- Presiona `F12` 
- Presiona `Ctrl + Shift + M` (Device Toolbar)
- Selecciona **iPhone SE** o establece ancho **320px**

**Checklist:**

```
Logo:
□ ¿Logo "LE BON MARCHÉ" está centrado?
□ ¿Es legible el tamaño (text-xl)?
□ ¿Font serif se ve bien?

Menú Hamburger:
□ ¿Icono hamburger (≡) visible?
□ ¿3 líneas horizontales?
□ ¿Color blanco en fondo negro?

Search & Cart:
□ ¿Icono de búsqueda visible?
□ ¿Icono de carrito visible?
□ ¿Ambos clickeables?

Top Bar:
□ ¿Top bar está OCULTO? (hidden en mobile)

Spacing:
□ ¿No hay overflow horizontal?
□ ¿Todos los elementos caben?
□ ¿Separados por gaps claros?
```

---

### 🔵 TEST 2: MOBILE MÉDIO (375px - iPhone 12)

**DevTools:**
- Selecciona **iPhone 12** o ancho **375px**

**Checklist:**

```
Logo:
□ ¿Logo buen tamaño?
□ ¿Sigue centrado?
□ ¿Sin truncamiento?

Menú:
□ ¿Hamburger accesible?
□ ¿Fácil de ver y tocar?

Desktop Nav:
□ ¿Menu items (Ofertas, Tecnología, etc.) ESCONDIDOS?
   (Deben estar hidden hasta 768px)

Overall:
□ ¿Interfaz limpia?
□ ¿Minimalista?
□ ¿Sin clutter?
```

---

### 🔵 TEST 3: MOBILE GRANDE (425px - iPhone 15 Pro)

**DevTools:**
- Ancho **425px**

**Checklist:**

```
Logo Size:
□ ¿Tamaño proporcional?
□ ¿Bien centrado?

Mobile Menu:
□ ¿Hamburger funcionando?
□ □ Click en hamburger
□ □ Menú abre (transición 500ms)
□ □ Backdrop blur de fondo
□ □ Menú items visible:
    - Inicio
    - Ofertas
    - Tecnología
    - Sonido
    - Hogar
    - [Separador]
    - Más ▸ (expandible)
    - [Separador]
    - Blog
    - Mi Cuenta
□ □ Close button (×) visible top-right
□ □ Click close cierra menú
```

---

### 🟢 TEST 4: TABLET (768px - iPad)

**DevTools:**
- Selecciona **iPad** o ancho **768px**

**Importante:** 768px es el breakpoint `md` en Tailwind

**Checklist:**

```
DESKTOP NAV AHORA VISIBLE:
□ ¿Menú izquierdo aparece?
   - Ofertas | Tecnología | Sonido | Hogar
□ ¿Logo centrado ENTRE los dos menús?
□ ¿Menú derecho aparece?
   - Más | Blog

Logo:
□ ¿Tamaño aumenta a text-2xl?
□ ¿Sigue centrado?
□ ¿Hover scale effect funciona? (mueve mouse sobre él)

Top Bar:
□ ¿Ahora VISIBLE en la parte superior?
□ ¿Muestra información:
   - 📦 Envíos a todo el país
   - 💬 WhatsApp
   - 🛡️ Garantía Ley 1480

Hover Effects:
□ Hover en nav links:
   □ ¿Color cambia a gold?
   □ □ ¿Subrayado animado se expande?
   □ □ ¿Duración suave (300ms)?

Hamburger:
□ ¿Hamburger desaparece? (hidden md:hidden)
□ ¿Solo icono MENU visible en desktop? (si )

Overall:
□ ¿Layout balanced?
□ ¿Profesional?
□ ¿Luxury brand feeling?
```

---

### 🟢 TEST 5: TABLET GRANDE (1024px - iPad Pro)

**DevTools:**
- Ancho **1024px** (breakpoint `lg`)

**Checklist:**

```
Logo:
□ ¿Tamaño aumenta más? (text-3xl)
□ ¿Muy visible como focal point?
□ ¿Centering perfecto?

Nav Spacing:
□ ¿Gaps más grandes? (lg:gap-10)
□ ¿Menos crowded?
□ ¿Más elegant?

Menu Items:
□ ¿Font sizes optimal?
□ ¿Hover effects smooth?

Top Bar:
□ ¿Info completamente visible?
□ ¿Sin wrapping?

Professional Look:
□ ¿Se ve premium?
□ ¿Luxury brand?
□ ¿Bien organizado?
```

---

### 🔴 TEST 6: DESKTOP (1440px - Laptop)

**DevTools:**
- Ancho **1440px** (typical 1080p laptop)

**Checklist:**

```
Logo:
□ ¿Perfectamente centrado?
□ ¿Font size optimal? (text-3xl)
□ ¿Prominence como focal point?

Navigation:
□ ¿Left nav well-spaced?
□ ¿Right nav balanced?
□ ¿Gaps comfortable (gap-8 lg:gap-10)?

Hover Effects:
□ □ Hover en "Ofertas":
   □ □ Color → gold ✓
   □ □ Underline animates ✓
   □ □ Suave transition ✓
□ □ Hover en logo:
   □ □ Scale 105% ✓
   □ □ Color → gold ✓
   □ □ Smooth ✓

Top Bar:
□ ¿Info clearly visible?
□ ¿Spacing good?

Icons:
□ ¿Search icon present?
□ ¿Cart icon present?
□ ¿Positioned well?

Scroll Effect:
□ □ Scroll down la página:
   □ □ Background cambia → white ✓
   □ □ Text color → black ✓
   □ □ Shadow aparece ✓
   □ □ Top bar → background gold ✓
   □ □ Top bar text → black ✓
   □ □ Transition smooth (300ms) ✓

Overall:
□ ¿Professional appearance?
□ ¿Luxury feeling?
□ ¿Premium brand?
```

---

### 🔴 TEST 7: ULTRA-WIDE (1920px - 4K Monitor)

**DevTools:**
- Ancho **1920px**

**Checklist:**

```
Logo:
□ ¿Sigue centrado?
□ ¿No está fuera de lugar?

Navigation:
□ ¿No excesivamente esparcida?
□ ¿Sigue balanced?

Padding:
□ ¿Padding responsive? (lg:px-12)
□ ¿No se estira demasiado?

Overall:
□ ¿Sigue professional?
□ ¿Luxury brand maintained?
```

---

## 🎨 Testing de Animaciones

### Animation Test: Underline on Nav Links

**Steps:**
1. En desktop (1024px+)
2. Move mouse lentamente sobre "Ofertas"
3. **Expected:** Línea dorada se expande de izquierda a derecha bajo el texto
4. **Duration:** ~300ms (smooth, not instant)
5. Repite con otros items: Tecnología, Sonido, Hogar, Blog

**Checklists:**
```
□ Animation visible?
□ Smooth easing?
□ Color correcto (gold #C5A059)?
□ Duración 300ms?
□ No jumpy?
□ Replicates en todos los links?
```

---

### Animation Test: Logo Hover Scale

**Steps:**
1. Desktop (1024px+)
2. Move mouse sobre "LE BON MARCHÉ" logo
3. **Expected:** 
   - Logo crece 5% (scale-105)
   - Color cambia a gold
4. **Duration:** Smooth transition

**Checklist:**
```
□ Logo grows slightly?
□ Color changes to gold?
□ Smooth transition?
□ Reverts when mouse leaves?
```

---

### Animation Test: Menu Items Border-Left (Mobile)

**Steps:**
1. Mobile o tablet (< 1024px)
2. Click hamburger para abrir menú
3. Hover sobre un item del menú (p.ej. "Ofertas")
4. **Expected:**
   - Text → gold
   - Background slightly lighter
   - Padding-left increases (pl-4)
   - Border-left → gold
5. **Duration:** 200ms smooth

**Checklist:**
```
□ Border-left appears gold?
□ Padding-left animates?
□ Color transitions smooth?
□ No jumpy behavior?
□ Multiple items replicates effect?
```

---

### Animation Test: "Más" Dropdown Arrow

**Steps:**
1. Mobile menu open
2. Hover sobre "Más"
3. Click "Más" para expandir
4. **Expected:** 
   - Arrow (▸) rota 90° smooth
   - Submenu items appear
5. **Duration:** 300ms

**Checklist:**
```
□ Arrow rotates?
□ Submenu slides in?
□ Smooth rotation?
□ Arrow rotates back on close?
```

---

### Animation Test: Menu Slide (Mobile)

**Steps:**
1. Mobile (320-425px)
2. Click hamburger
3. **Expected:** Menu slides in from left
   - Transition: 500ms ease-out
   - Backdrop blur visible
4. Click close
5. **Expected:** Menu slides out
   - Transition: 400ms ease-in

**Checklist:**
```
□ Slides in smoothly?
□ Doesn't jump/teleport?
□ Backdrop blur visible?
□ Slides out smoothly?
□ Close button works?
```

---

## 🚨 Verificaciones de Errores

### Console Errors

**Steps:**
1. Abre DevTools (F12)
2. Pestaña **Console**
3. Recarga la página (Ctrl+R)
4. Interactúa con menu/header

**Expected:** ✅ Cero rojo errors

**Checklist:**
```
□ No red errors in console?
□ No TypeScript errors?
□ No hydration errors?
□ No layout shift warnings?
```

---

### Mobile Overflow

**Steps:**
1. Mobile view (320-425px)
2. Abre DevTools
3. Pestaña **Elements** o **Inspector**

**Checklist:**
```
□ No horizontal scrollbar?
□ No content overflow-x?
□ All elements fit within viewport?
```

---

### Build Status

**Steps:**
```bash
npm run build
```

**Expected:**
```
✓ Compiled successfully
✓ Route (app)                                Size
✓ Next.js build optimization finished
ℹ  Skipping validation of types
```

**Checklist:**
```
□ Build success (0 errors)?
□ Build time < 60s?
□ All routes pre-rendered?
```

---

## 📊 Resumen de Testing

### Quick Checklist (TL;DR)

```bash
# Mobile (320-425px)
□ Logo centrado
□ Hamburger visible
□ Menu funciona
□ No overflow

# Tablet (768px)
□ Desktop nav visible
□ Top bar visible
□ Hover effects work
□ Logo centered

# Desktop (1024px+)
□ Full layout
□ All animations
□ Scroll effects
□ Professional look

# Animations
□ Underline animation
□ Logo scale
□ Border-left accent
□ Menu slide

# Overall
□ No errors
□ No warnings
□ Build success
□ Professional appearance
```

---

## 🎯 Documentación de Hallazgos

### Template para Registrar Problemas

Si encuentras un issue:

```markdown
### Bug: [Nombre]

**Device:** [iPhone SE / iPad / Desktop]
**Breakpoint:** [320px / 768px / 1440px]
**Expected:** [Lo que debería pasar]
**Actual:** [Lo que está pasando]
**Steps to Reproduce:**
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Screenshot:** [Si es posible]
```

---

## ✅ Testing Complete

Cuando hayas verificado todo, marca como completado:

- [x] Mobile testing (320-425px)
- [x] Tablet testing (768-1024px)
- [x] Desktop testing (1440-1920px)
- [x] Animation testing
- [x] Error checking
- [x] Scroll effects
- [x] Build validation

**Status:** ✅ LISTO PARA PRODUCCIÓN

---

## 🔗 Recursos Relacionados

- **Cambios:** Ver [RESUMEN_MEJORAS_MENU_HEADER.md](RESUMEN_MEJORAS_MENU_HEADER.md)
- **Especificaciones:** Ver [TESTING_MENU_DEVICES.md](TESTING_MENU_DEVICES.md)
- **Demo Interactivo:** Abrir [PROBADOR_MENU_INTERACTIVO.html](PROBADOR_MENU_INTERACTIVO.html)

---

**Última actualización:** 2024
**Versión:** 1.0
**Status:** ✅ Completado
