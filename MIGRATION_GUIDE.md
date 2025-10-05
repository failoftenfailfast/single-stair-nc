# Design System Migration Guide

This guide shows how to migrate from hardcoded styles to the new centralized design system.

## 🔄 Before & After Examples

### Typography Migration

#### Before (Hardcoded)
```jsx
<h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-none">
  HOW CAN A STAIRCASE MAKE HOUSING MORE AFFORDABLE?
</h1>
```

#### After (Design System)
```jsx
<h1 className="text-display-lg md:text-display-xl text-balance mb-section">
  HOW CAN A STAIRCASE MAKE HOUSING MORE AFFORDABLE?
</h1>
```

**Benefits:**
- ✅ Consistent sizing across breakpoints
- ✅ Semantic naming (display vs. heading vs. body)
- ✅ Built-in responsive behavior
- ✅ Easy to refactor - change one place, updates everywhere

### Color Migration

#### Before (Hardcoded)
```jsx
<section className="bg-white text-black border-b-2 border-black">
  <p className="text-gray-600">Secondary text content</p>
  <div className="bg-black text-white">Inverse content</div>
</section>
```

#### After (Design System)
```jsx
<section className="surface-primary border-b-2 border-border-primary">
  <p className="text-content-secondary">Secondary text content</p>
  <div className="surface-inverse">Inverse content</div>
</section>
```

**Benefits:**
- ✅ Semantic color names that describe purpose
- ✅ Easy theme changes by updating tokens
- ✅ Consistent color usage across components
- ✅ Automatic text color pairing with backgrounds

### Spacing Migration

#### Before (Hardcoded)
```jsx
<div className="py-16 lg:py-24 mb-12 px-6 gap-4">
  <p className="mb-6">Content with manual spacing</p>
  <button className="px-12 py-4">Large button</button>
</div>
```

#### After (Design System)
```jsx
<div className="section-padding mb-section-lg px-content gap-element">
  <p className="mb-content">Content with semantic spacing</p>
  <button className="btn-primary btn-large">Large button</button>
</div>
```

**Benefits:**
- ✅ Semantic spacing names (section, content, element, tight)
- ✅ Responsive spacing built-in
- ✅ Consistent spacing ratios
- ✅ Pre-built component classes for common patterns

### Button Migration

#### Before (Hardcoded)
```jsx
<button className="inline-flex items-center justify-center bg-black px-6 py-3 text-base font-bold text-white border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 shadow-brutal">
  Click Me
</button>
```

#### After (Design System)
```jsx
<button className="btn-primary">
  Click Me
</button>
```

**Benefits:**
- ✅ Single class replaces 15+ utility classes
- ✅ Consistent button behavior across the site
- ✅ Easy to update all buttons by modifying one CSS class
- ✅ Size variants: `btn-large`, `btn-small`

### Card Component Migration

#### Before (Hardcoded)
```jsx
<article className="bg-white border-2 border-black shadow-brutal hover:shadow-brutal-hover transition-all p-6">
  <h3 className="text-xl font-black mb-4 leading-tight">
    Card Title
  </h3>
  <p className="text-sm text-gray-600 leading-relaxed mb-6">
    Card description text
  </p>
</article>
```

#### After (Design System)
```jsx
<article className="card-brutal p-content">
  <h3 className="text-heading-lg mb-element">
    Card Title
  </h3>
  <p className="text-body-sm text-content-secondary mb-content">
    Card description text
  </p>
</article>
```

**Benefits:**
- ✅ Pre-built card styling with hover effects
- ✅ Semantic typography classes
- ✅ Consistent spacing patterns
- ✅ Card variants: `card-brutal`, `card-brutal-sm`, `card-inverse`

## 📋 Migration Checklist

### Phase 1: Layout & Structure
- [ ] Replace `bg-white` → `surface-primary`
- [ ] Replace `bg-black` → `surface-inverse` 
- [ ] Replace `bg-gray-50` → `surface-secondary`
- [ ] Replace manual padding → `section-padding`
- [ ] Replace manual containers → `container-custom`

### Phase 2: Typography
- [ ] Replace large headings → `text-display-*`
- [ ] Replace medium headings → `text-heading-*`
- [ ] Replace body text → `text-body*`
- [ ] Replace small text → `text-caption`
- [ ] Replace `text-black` → `text-content-primary`
- [ ] Replace `text-gray-*` → `text-content-secondary/tertiary`

### Phase 3: Interactive Elements
- [ ] Replace button classes → `btn-primary/secondary/ghost`
- [ ] Replace link styles → `link-brutal/inverse`
- [ ] Replace borders → `border-brutal`
- [ ] Replace shadows → `shadow-brutal*`

### Phase 4: Spacing & Layout
- [ ] Replace `mb-8, mb-12` → `mb-section`
- [ ] Replace `mb-4, mb-6` → `mb-content/element`
- [ ] Replace `gap-4` → `gap-element`
- [ ] Replace `space-x-2` → `space-x-tight`

### Phase 5: Utilities
- [ ] Replace text truncation → `line-clamp-*`
- [ ] Replace manual focus styles → `focus-brutal`
- [ ] Replace disabled states → `disabled`
- [ ] Replace loading states → `loading`

## 🎯 Common Patterns

### Hero Section
```jsx
// ✅ New Pattern
<section className="section-padding surface-primary">
  <div className="container-custom text-center">
    <h1 className="text-display-xl mb-content text-balance">
      Hero Title
    </h1>
    <p className="text-body-lg text-content-secondary mb-section">
      Hero description
    </p>
    <button className="btn-primary btn-large">
      Call to Action
    </button>
  </div>
</section>
```

### Article Card Grid
```jsx
// ✅ New Pattern
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-element">
  {articles.map(article => (
    <article key={article.id} className="card-brutal p-content">
      <h3 className="text-heading-lg mb-element line-clamp-2">
        {article.title}
      </h3>
      <p className="text-body text-content-secondary mb-content line-clamp-3">
        {article.description}
      </p>
      <a href={article.url} className="link-brutal">
        Read More →
      </a>
    </article>
  ))}
</div>
```

### Form Components
```jsx
// ✅ New Pattern
<form className="surface-primary p-section border-brutal">
  <div className="mb-content">
    <label className="text-label mb-tight block">
      Name
    </label>
    <input 
      type="text"
      className="w-full border-brutal p-element focus-brutal text-body"
    />
  </div>
  <button className="btn-primary w-full">
    Submit
  </button>
</form>
```

## 🔧 Gradual Migration Strategy

### 1. Start with New Components
- All new components should use design system from day one
- Use as learning opportunity for the team

### 2. Update High-Impact Areas First
- Hero sections (most visible)
- Navigation components (used everywhere)
- Button components (frequent updates)

### 3. Component-by-Component Migration
- Pick one component type (e.g., all cards)
- Migrate all instances at once
- Test thoroughly before moving to next component

### 4. Page-by-Page Migration
- Focus on one page at a time
- Update all components on that page
- Easier to test and validate changes

## 🚨 Common Pitfalls to Avoid

### ❌ Don't Mix Old and New Patterns
```jsx
// Bad: mixing hardcoded with design system
<div className="bg-white text-content-primary border-2 border-black">
```

```jsx
// Good: use design system consistently  
<div className="surface-primary border-brutal">
```

### ❌ Don't Override Design System Classes
```jsx
// Bad: overriding system classes
<button className="btn-primary text-red-500">
```

```jsx
// Good: create new variant or use semantic colors
<button className="btn-primary text-feedback-error">
```

### ❌ Don't Skip the Documentation
- Always document new components in `DESIGN_SYSTEM.md`
- Update migration guide with new patterns
- Share learnings with the team

## 📊 Migration Progress Tracking

Track your migration progress by component type:

- [ ] **Layout Components** (Hero, Sections, Containers)
- [ ] **Navigation** (Header, Footer, Breadcrumbs)  
- [ ] **Content** (Typography, Articles, Cards)
- [ ] **Interactive** (Buttons, Links, Forms)
- [ ] **Utility** (Spacing, Colors, Effects)

## 🎉 Post-Migration Benefits

After completing the migration, you'll have:

1. **Faster Development** - New features use pre-built components
2. **Consistent Design** - Automatic design consistency across the site
3. **Easy Theming** - Change colors/spacing in one place
4. **Better Maintenance** - Less CSS to maintain and debug
5. **Improved Performance** - Smaller CSS bundle with reused classes
6. **Team Productivity** - Developers don't need to write custom styles

The design system makes your codebase more maintainable, scalable, and developer-friendly!


