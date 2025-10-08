# Single Stair NC Design System

A comprehensive design system for consistent styling and easy refactoring across the Single Stair NC platform.

## 🎨 Color System

### Semantic Colors
Use these semantic color tokens instead of hardcoded values:

```css
/* Surfaces */
bg-surface-primary      /* Main backgrounds (#ffffff) */
bg-surface-secondary    /* Secondary backgrounds (#f5f5f5) */
bg-surface-tertiary     /* Subtle backgrounds (#fafafa) */
bg-surface-inverse      /* Dark/inverted backgrounds (#000000) */

/* Content/Text */
text-content-primary    /* Main text (#000000) */
text-content-secondary  /* Secondary text (#525252) */
text-content-tertiary   /* Subtle text (#737373) */
text-content-inverse    /* Light text on dark (#ffffff) */
text-content-disabled   /* Disabled text (#a3a3a3) */

/* Borders */
border-border-primary   /* Main borders (#000000) */
border-border-secondary /* Subtle borders (#d4d4d4) */
border-border-focus     /* Focus rings (#000000) */

/* Feedback */
text-feedback-success   /* Success state (#16a34a) */
text-feedback-warning   /* Warning state (#ea580c) */
text-feedback-error     /* Error state (#dc2626) */
text-feedback-info      /* Info state (#2563eb) */
```

### Neutral Gray Scale
For custom implementations:

```css
neutral-50   /* #f9fafb */
neutral-100  /* #f3f4f6 */
neutral-200  /* #e5e7eb */
neutral-300  /* #d1d5db */
neutral-400  /* #9ca3af */
neutral-500  /* #6b7280 */
neutral-600  /* #4b5563 */
neutral-700  /* #374151 */
neutral-800  /* #1f2937 */
neutral-900  /* #111827 */
```

## 📝 Typography System

### Display Text (Headlines)
```css
text-display-xl    /* 4.5rem, Hero headlines */
text-display-lg    /* 3.75rem, Page headlines */
text-display-md    /* 3rem, Section headlines */
text-display-sm    /* 2.25rem, Sub-headlines */
```

### Headings
```css
text-heading-xl    /* 1.875rem, Card titles */
text-heading-lg    /* 1.5rem, Content titles */
text-heading-md    /* 1.25rem, Sub-titles */
text-heading-sm    /* 1.125rem, Small headings */
```

### Body Text
```css
text-body-lg       /* 1.125rem, Large body text */
text-body          /* 1rem, Default body text */
text-body-sm       /* 0.875rem, Small body text */
text-body-secondary /* Same as text-body but with secondary color */
```

### Special Text
```css
text-caption       /* 0.75rem, Captions/meta text, uppercase */
text-label         /* 0.875rem, Form labels */
```

### Typography Components
Pre-built typography components with proper styling:

```css
.text-display-xl   /* Display XL with proper font-weight and line-height */
.text-display-lg   /* Display LG with proper font-weight and line-height */
.text-heading-xl   /* Heading XL with proper font-weight and tracking */
.text-body-lg      /* Body large with proper line-height */
.text-caption      /* Caption with uppercase and tracking */
```

## 📏 Spacing System

### Design Tokens
```css
space-tight         /* 0.5rem (8px) - Tight spacing */
space-element       /* 1rem (16px) - Element spacing */
space-content       /* 1.5rem (24px) - Content spacing */
space-section       /* 4rem (64px) - Section spacing mobile */
space-section-lg    /* 6rem (96px) - Section spacing desktop */
```

### Usage
```css
p-tight            /* padding: 0.5rem */
p-element          /* padding: 1rem */
p-content          /* padding: 1.5rem */
py-section         /* padding-top/bottom: 4rem */
py-section-lg      /* padding-top/bottom: 6rem */
```

## 🧩 Component System

### Buttons
```css
.btn-primary       /* Brand background, white text */
.btn-secondary     /* Light background, dark text */
.btn-ghost         /* Transparent background */

/* Size modifiers */
.btn-large         /* Larger padding and text */
.btn-small         /* Smaller padding and text */
```

### Cards
```css
.card-standard     /* Standard card with subtle shadow */
.card-small        /* Smaller card */
.card-inverse      /* Dark card */
```

### Surfaces
```css
.surface-primary   /* Primary background with primary text */
.surface-secondary /* Secondary background with primary text */
.surface-inverse   /* Dark background with light text */
```

### Links
```css
.link-primary      /* Primary link with hover effects */
.link-inverse      /* Inverse link for dark backgrounds */
```

## 🎭 Shadow System

### Subtle Shadows
```css
.shadow-soft       /* Subtle drop shadow */
.shadow-sm         /* Small shadow */
.shadow-md         /* Medium shadow */
.shadow-lg         /* Large shadow */
```

## 🖼️ Border System

```css
.border-standard   /* Standard border */
.border-focus      /* Focus border styling */
```

## 🔧 Utility Classes

### Layout
```css
.container-custom     /* Responsive container with max-width */
.section-padding      /* Responsive section padding */
```

### Text
```css
.text-balance         /* Balanced text wrapping */
.text-gradient        /* Gradient text effect */
.line-clamp-1         /* Single line truncation */
.line-clamp-2         /* Two line truncation */
.line-clamp-3         /* Three line truncation */
.line-clamp-4         /* Four line truncation */
.line-clamp-5         /* Five line truncation */
```

### Effects
```css
.glass               /* Glass morphism effect */
.scrollbar-hide      /* Hide scrollbars */
.disabled            /* Disabled state */
.loading             /* Loading state with pulse */
```

### Focus
```css
.focus-standard      /* Standard focus ring */
```

## 🚀 Usage Examples

### Hero Section
```jsx
<div className="surface-primary section-padding">
  <div className="container-custom">
    <h1 className="text-display-xl mb-content">
      SINGLE STAIR HOUSING
    </h1>
    <p className="text-body-lg text-body-secondary mb-section">
      Building better communities through better design.
    </p>
    <button className="btn-primary btn-large">
      Learn More
    </button>
  </div>
</div>
```

### Article Card
```jsx
<article className="card-brutal p-content">
  <h3 className="text-heading-lg mb-element">
    Article Title
  </h3>
  <p className="text-body text-body-secondary mb-element line-clamp-3">
    Article description that will be truncated after three lines...
  </p>
  <a href="#" className="link-brutal">
    Read More
  </a>
</article>
```

### Button Group
```jsx
<div className="flex gap-element">
  <button className="btn-primary">
    Primary Action
  </button>
  <button className="btn-secondary">
    Secondary Action
  </button>
  <button className="btn-ghost">
    Tertiary Action
  </button>
</div>
```

## 📱 Responsive Design

The design system includes responsive modifiers:

```css
/* Section padding adapts to screen size */
.section-padding  /* py-section lg:py-section-lg */

/* Typography scales on larger screens */
text-display-xl   /* Maintains readability across devices */

/* Container adapts with proper padding */
.container-custom /* Responsive padding: px-4 sm:px-6 lg:px-8 */
```

## 🔄 Migration Guide

### Before (Old Approach)
```css
className="bg-white text-black border-2 border-black p-6 text-xl font-black"
```

### After (Design System)
```css
className="surface-primary border-standard p-content text-heading-lg"
```

## 🎯 Best Practices

1. **Use semantic tokens** instead of hardcoded colors
2. **Compose components** with the design system classes
3. **Prefer component classes** over utility composition for common patterns
4. **Use responsive spacing** tokens for consistency
5. **Test with design system** classes before creating custom styles

## 🛠️ Development

### Adding New Components
1. Define the component in `globals.css` under `@layer components`
2. Use semantic color tokens
3. Follow the naming convention: `.component-variant`
4. Document the component in this file

### Updating Colors
1. Update semantic tokens in `tailwind.config.ts`
2. Ensure backwards compatibility with legacy colors
3. Test across all components
4. Update documentation

This design system ensures consistent styling across the platform and makes refactoring much easier by providing semantic, reusable design tokens and components.





