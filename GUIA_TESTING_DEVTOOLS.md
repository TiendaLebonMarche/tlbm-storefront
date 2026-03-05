# 🔧 Guía Completa de Testing Responsivo en Chrome DevTools

## 1️⃣ ABRIR CHROME DEVTOOLS

### Opción A: Atajo de Teclado
```
Windows/Linux: F12
Mac: Cmd + Option + I
```

### Opción B: Menú
```
Chrome → Más herramientas → Herramientas para desarrolladores
```

### Opción C: Click derecho
```
Click derecho en página → Inspeccionar
```

---

## 2️⃣ ACTIVAR MODO DISPOSITIVO

En Chrome DevTools, busca el icono de **dispositivo móvil** (arriba a la izquierda):

```
┌─────────────────────────────────────┐
│ Console | Sources | Network | ... 🖥️📱 │
│                                     │  👆
│ Esto activa Device Mode             │
└─────────────────────────────────────┘
```

O usa el atajo: **Ctrl + Shift + M** (Windows/Linux) / **Cmd + Shift + M** (Mac)

---

## 3️⃣ SELECCIONAR DISPOSITIVO

Una vez en Device Mode, verás un dropdown que dice "Responsive":

```
┌──────────────────────────────────────────────┐
│ Responsive  375 x 667   100%  ⚙️              │
│ ▼                                             │
│ ┌────────────────────────────────────────┐  │
│ │ Responsive                             │  │
│ │ ─────────────────────────────────────  │  │
│ │ iPhone SE        (375 x 568)           │  │
│ │ iPhone XR        (414 x 896)           │  │
│ │ iPhone 12 Pro    (390 x 844)           │  │
│ │ Pixel 5          (393 x 851)           │  │
│ │ Samsung Galaxy   (353 x 915)           │  │
│ │ iPad Mini        (768 x 1024)          │  │
│ │ iPad Pro         (1024 x 1366)         │  │
│ │ Edit...                                │  │
│ └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## 4️⃣ BREAKPOINTS CLAVE PARA LE BON MARCHÉ

### 📱 Mobile First
```
320px  - iPhone SE (Mínimo)
375px  - iPhone 12/13/14 (Más común)
425px  - iPhone 15 Pro Max (Máximo mobile)
```

### 📱 Tablet
```
768px  - iPad (Estándar)
1024px - iPad Pro / Tablets grandes
```

### 🖥️ Desktop
```
1440px - Laptop estándar (16:9)
1920px - Monitor grande (16:9)
```

---

## 5️⃣ CHECKLIST VISUAL POR BREAKPOINT

### 🔍 EN 375px (iPhone 12)

**Header:**
- [ ] Busca el logo centrado
- [ ] El menú hamburguesa es visible (no el nav completo)
- [ ] El icono carrito está en top-right
- [ ] Sin scroll horizontal en toda la página

**Home Page:**
```
Inspecciona visualmente:
┌────────────────┐
│  Logo Centrado │
├────────────────┤
│  Menú ☰        │  Carrito 🛍️
├────────────────┤
│  Hero Section  │ ← Debe ocupar ancho completo
│  - Imagen      │
│  - Título      │
│  - CTA Button  │
├────────────────┤
│ Trust Badges   │ ← 1 columna
├────────────────┤
│ Collections    │ ← 2 columnas
├────────────────┤
│ Newsletter     │ ← Input stacked
└────────────────┘
```

**Store Page:**
```
┌────────────────┐
│  Search Bar    │
├────────────────┤
│  ▼ Filtros     │ ← Colapsado, expandible
├────────────────┤
│ Product Cards  │ ← 2 columnas
│ ┌──┐ ┌──┐     │
│ │  │ │  │     │
│ └──┘ └──┘     │
│ ┌──┐ ┌──┐     │
│ │  │ │  │     │
│ └──┘ └──┘     │
└────────────────┘
```

**Product Page:**
```
┌────────────────┐
│  Breadcrumb    │
├────────────────┤
│ Image Gallery  │ ← Full width
│ ┌────────────┐ │
│ │            │ │
│ │  Imagen    │ │
│ │            │ │
│ └────────────┘ │
│ ◯ ◯ ◯ ◯ ◯ ◯   │ ← Thumbnails
├────────────────┤
│  Título        │ ← Serif italic
├────────────────┤
│  Badges        │ ← "Nuevo" y/o
│  Rating 5 ⭐  │   "Últimas Unidades"
├────────────────┤
│  Descripción   │
├────────────────┤
│  Precio        │
│  Old  ✗ $150   │
│  New  ✓ $100   │
│  -33% Badge    │
├────────────────┤
│  Variantes     │ ← Botones stacked
│  [Color ▼]    │
│  [Talla ▼]    │
├────────────────┤
│  Stock Badge   │ ← Verde OK / Rojo Agotado
├────────────────┤
│  Trust Badges  │ ← Icono + texto
├────────────────┤
│  Tabs/FAQ      │ ← Expandible
├────────────────┤
│  Related Prods │ ← 2 cols
└────────────────┘
```

---

### 🔍 EN 768px (iPad)

**Lo que cambia:**
- Header: Navegación completa visible
- Home: 2-3 columnas en collections
- Store: 3 columnas de productos
- Product: Gallery side-by-side con info

```
┌──────────────────────────┐
│ Logo | Nav | Search Cart │  ← Nav completa
├──────────────────────────┤
│     Imagen       │        │
│                  │ Info   │
│                  │        │
├──────────────────┴────────┤
│  Tabs & FAQ               │
├──────────────────────────┤
│ Related (3-4 columnas)   │
└──────────────────────────┘
```

---

### 🔍 EN 1440px (Desktop)

**Lo que cambia:**
- Header: Todo expandido, sin hamburger
- Store: Sidebar filtros visible + 4-5 cols productos
- Product: Premium 2-column layout con espaciado óptimo

```
┌─────────────────────────────────────────────────────┐
│ Logo            Nav Link Nav Link Nav  Search  Cart  │
├──────────────┬──────────────────────────────────────┤
│ Filtros      │          Imagen Gallery   │ Info    │
│ [x] Filter1  │  ┌────────────────────┐  │        │
│ [x] Filter2  │  │                    │  │ Título │
│ [$100-$500]  │  │     GRANDE         │  │ Precio │
│              │  │                    │  │ Botón  │
│              │  │  ┌─┬─┬─┬─┬─┐     │ │ Trust  │
│              │  │  └─┴─┴─┴─┴─┘     │ │ FAQ    │
│              │  └────────────────────┘  │        │
├──────────────┴──────────────────────────┴─────────┤
│        Tabs con hover effects, mejor spacing      │
├─────────────────────────────────────────────────────┤
│              Related Products (4-5 cols)           │
└─────────────────────────────────────────────────────┘
```

---

## 6️⃣ PRUEBAS ESPECÍFICAS POR ELEMENTO

### 🔘 Buttons & CTAs
```javascript
// En Console (F12 → Console tab)
// Verifica que todos los botones tengan tamaño mínimo 44px

document.querySelectorAll('button').forEach(btn => {
  const rect = btn.getBoundingClientRect();
  if (rect.height < 44 || rect.width < 44) {
    console.warn('Button too small:', btn, rect);
  }
});
```

### 🖼️ Images
```javascript
// Verifica aspect ratios de imágenes

document.querySelectorAll('img').forEach(img => {
  const ratio = img.naturalWidth / img.naturalHeight;
  console.log(img.getAttribute('alt'), `Ratio: ${ratio.toFixed(2)}`);
});
```

### 📏 Overflow Check
```javascript
// Verifica que no haya overflow horizontal

const htmlWidth = document.documentElement.scrollWidth;
const windowWidth = window.innerWidth;

if (htmlWidth > windowWidth) {
  console.error('❌ OVERFLOW DETECTED:', htmlWidth - windowWidth + 'px extra');
} else {
  console.log('✅ No overflow');
}
```

---

## 7️⃣ INSPECCIONAR ELEMENTOS ESPECÍFICOS

### Hover Estados
1. Abre DevTools (F12)
2. Ve a **Elements** tab
3. Busca un elemento (ej. Product Card)
4. Click derecho → **Force element state** → **:hover**
5. Verifica que el hover CSS aplique correctamente

### Flex/Grid Layout
```
1. Inspecciona un container
2. DevTools mostrará el layout grid/flex
3. Verifica:
   - Gap correcto
   - Número de columnas
   - Alignment
```

### Responsive Images
```
1. Inspecciona <img> tag
2. Verifica:
   - srcset correcto
   - sizes attribute
   - object-fit: cover
```

---

## 8️⃣ CHECKLIST DE PERFORMANCE

En **Network tab**:

```
[ ] Imágenes: < 100KB cada una (excepto hero)
[ ] Total bundle: < 3MB
[ ] First contentful paint: < 2.5s (mobile)
[ ] Largest contentful paint: < 4s (mobile)
```

En **Performance tab** (grabar 5 segundos):

```
[ ] No layout shifts principales
[ ] Animations suave (60fps)
[ ] No scripts bloqueando render
```

---

## 9️⃣ PRUEBAS ESPECIALESPECIALES

### Teclado Navigation (A11y)
```
Presiona TAB repetidamente:
[ ] Todos los botones son accesibles
[ ] Focus indicator visible
[ ] Orden lógico
```

### Dark Mode (si aplica)
```
DevTools → ⋯ → More tools → Rendering
Emulate CSS media feature prefers-color-scheme
```

### Touch Simulation
```
DevTools → ⋯ → More tools → Sensors
Simula gestos (swipe, pinch)
```

---

## 🔟 DATOS DE REFERENCIA

### Viewport Mínimo Soportado
```
320px - iPhone SE (2020)
Todos los elementos deben caber sin scroll horizontal
```

### Fuente Mínima Legible
```
12px - Absolute minimum (metadata, small text)
14px - Regular body text
16px - Mobile friendly (Apple recommends)
```

### Touch Target Mínimo
```
44 x 44 px - Apple Human Interface Guidelines
48 x 48 px - Android Material Design
56 x 56 px - Google Recommended
```

### Espaciado Mínimo Entre Elementos
```
8px - Related elements
16px - Section separators
24px - Major sections
```

---

## ✅ CONCLUSIONES DE TESTING

**Cuando PASAS el testing responsivo:**

```
✅ Ningún elemento sale del viewport
✅ Todos los breakpoints se ven bien
✅ Touch targets accesibles (44px mín)
✅ Imágenes correctas aspect ratio
✅ Tipografía legible en todos los tamaños
✅ Menús funcionan en mobile
✅ Formularios usables en mobile
✅ Performance acceptable (< 3MB bundle)
```

**Cuando FALLAS:**

```
❌ Scroll horizontal en algún breakpoint
❌ Texto cutoff o ilegible
❌ Buttons demasiado pequeños
❌ Imágenes distorsionadas
❌ Menú interfiere con contenido
❌ Lentitud (> 5s load)
```

---

## 📋 NOTAS PARA LE BON MARCHÉ

**Especificidades del proyecto:**

1. **Colores brand:**
   - Black: #1a1a1a
   - Gold: #C5A059
   - Verificar contraste en todos los breakpoints

2. **Tipografía:**
   - Serif (Garamond/Playfair) para títulos
   - Sans-serif (Inter/Segoe) para body
   - Mínimo 14px en mobile

3. **Componentes críticos:**
   - Header menu mobile: Debe tener scroll-blocking blur
   - Product gallery: Thumbnails seleccionables en mobile
   - Botón Add to Cart: Full-width 48px en mobile
   - Trust badges: Stacked en mobile, 3 cols en desktop

---

## 🎯 NEXT STEPS

1. Abre `http://localhost:8000`
2. Presiona **F12** para DevTools
3. Presiona **Ctrl+Shift+M** (Windows) o **Cmd+Shift+M** (Mac)
4. Selecciona dispositivos en el dropdown
5. Usa el checklist en **testing-responsivo.html**
6. Marca items conforme verifiques
7. Exporta resultados

**Happy Testing! 🚀**
