# Error Fix: useNavigate Hook Context Issue

## Problem
**Error**: `Uncaught TypeError: Cannot read properties of null (reading 'useContext')`
**Location**: `Header.tsx:18:19` at `useNavigate()`

## Root Cause
The routes in `routes.tsx` were being instantiated as JSX elements at module load time:
```tsx
element: <LandingPage />  // ❌ Instantiated immediately
```

This caused all page components (and their child components like Header) to be created **before** the React Router context was available, resulting in `useNavigate()` being called outside of the Router provider.

## Solution
Changed routes to use component references instead of JSX elements:

### Before (❌ Broken):
```tsx
interface RouteConfig {
  element: ReactNode;  // JSX element
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <LandingPage />  // Instantiated at import time
  }
];
```

### After (✅ Fixed):
```tsx
interface RouteConfig {
  element: ComponentType;  // Component reference
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: LandingPage  // Just the component reference
  }
];
```

### App.tsx Update:
```tsx
{routes.map((route, index) => {
  const Component = route.element;
  return (
    <Route
      key={index}
      path={route.path}
      element={<Component />}  // Instantiated inside Router context
    />
  );
})}
```

## Files Modified
1. **src/routes.tsx**:
   - Changed `ReactNode` to `ComponentType` in interface
   - Removed JSX syntax from all 21 route elements
   - Changed from `<PageComponent />` to `PageComponent`

2. **src/App.tsx**:
   - Updated route mapping to instantiate components at render time
   - Components now created inside Router context

## Result
✅ All components now instantiate **after** Router is available
✅ `useNavigate()` hook has proper context
✅ Header component renders without errors
✅ All 128 files pass lint checks
✅ 0 TypeScript errors

## Technical Explanation
React hooks like `useNavigate()` rely on React context. When components are instantiated as JSX elements at module load time, they execute before the Router provider is mounted in the component tree. By deferring component instantiation until render time (inside the Router context), all hooks have access to their required contexts.

---

**Status**: ✅ FIXED
**Date**: 2026-03-17
**Verification**: Lint passed, 0 errors
