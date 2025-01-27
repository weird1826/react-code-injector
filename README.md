# React Code Injector: Dynamic Code Injection for React Applications

React Code Injector is a powerful library that enables dynamic code injection in React applications with robust security features and customizable configurations.

This library provides a flexible and secure way to inject dynamic content into your React components. It offers various security levels and customizable configurations to ensure safe code injection while maintaining the integrity of your application.

## Repository Structure

```
.
├── dist/                 # Compiled output
├── src/                  # Source code
│   ├── codeInjector.tsx  # Main CodeInjector component
│   ├── index.ts          # Entry point
│   ├── securityConfig.tsx# Security configuration
│   └── useCodeInjection.tsx # Custom hook for code injection
├── package.json          # Project metadata and dependencies
├── rollup.config.js      # Rollup configuration
└── tsconfig.json         # TypeScript configuration
```

## Usage Instructions

### Installation

Ensure you have React 19.0.0 or later installed in your project. Then, install the React Code Injector:

```bash
npm install react-code-injector
```

### Getting Started

1. Import the CodeInjector component:

```javascript
import { CodeInjector } from 'react-code-injector';
```

2. Use the CodeInjector component in your React application:

```jsx
function App() {
  const fetchCode = async (codeId) => {
    // Implement your code fetching logic here
    return '<div>Dynamically injected content</div>';
  };

  return (
    <CodeInjector
      codeId="unique-code-id"
      enabled={true}
      onFetch={fetchCode}
      securityLevel="MODERATE"
    />
  );
}
```

### Configuration Options

The CodeInjector component accepts the following props:

- `codeId` (string): A unique identifier for the code to be fetched.
- `enabled` (boolean): Determines whether the code should be injected.
- `onFetch` (function): A function that fetches the code content for the given `codeId`.
- `onError` (optional function): Called when an error occurs during fetch or injection.
- `loadingComponent` (optional React element): Displayed while the code is being fetched.
- `errorComponent` (optional React element): Displayed if an error occurs.
- `securityLevel` (optional string): Determines the level of sanitization applied to the fetched code.
- `customSecurityConfig` (optional object): A custom security configuration object for sanitization.

### Security Levels

The library provides four predefined security levels:

- `STRICT`: Allows only basic HTML tags and attributes, forbids scripts.
- `MODERATE`: Allows more tags and attributes, still forbids script evaluation.
- `MINIMAL`: Allows all tags and attributes, forbids script evaluation.
- `NONE`: No restrictions (use with caution).

### Custom Security Configuration

You can provide a custom security configuration using the `customSecurityConfig` prop:

```jsx
<CodeInjector
  // ... other props
  customSecurityConfig={{
    ALLOWED_TAGS: ['div', 'span', 'p'],
    ALLOWED_ATTR: ['class', 'id'],
    FORBID_TAGS: ['script'],
    FORBID_ATTR: ['onerror', 'onload']
  }}
/>
```

### Error Handling

To handle errors during code injection:

```jsx
<CodeInjector
  // ... other props
  onError={(error) => console.error('Injection error:', error)}
  errorComponent={<div>An error occurred while loading the content.</div>}
/>
```

### Performance Optimization

To optimize performance:

1. Use the `enabled` prop to control when injection occurs.
2. Implement efficient code fetching in the `onFetch` function.
3. Use appropriate security levels to balance safety and performance.

### Troubleshooting

Common issues and solutions:

1. Content not appearing:
   - Ensure `enabled` is set to `true`.
   - Check if `onFetch` is returning the expected content.
   - Verify that the security level isn't too restrictive.

2. Security-related issues:
   - Review the chosen `securityLevel` or `customSecurityConfig`.
   - Check the browser console for any DOMPurify warnings.

3. Performance issues:
   - Optimize the `onFetch` function for faster code retrieval.
   - Consider using a less restrictive security level if appropriate.

For debugging:

- Set `securityLevel` to `"NONE"` temporarily to see if content is being blocked by security settings.
- Use browser developer tools to inspect the injected content and check for any errors.

## Data Flow

The data flow in the React Code Injector follows these steps:

1. The `CodeInjector` component is rendered with specified props.
2. When `enabled` is true, the component initiates the code fetching process.
3. The `onFetch` function is called with the provided `codeId`.
4. The fetched code is sanitized using DOMPurify based on the specified security level.
5. The sanitized code is injected into the DOM using a ref and innerHTML.
6. The `useCodeInjection` hook manages the injection state.
7. When `enabled` becomes false or the component unmounts, the injected code is removed.

```
[CodeInjector Component] -> [Fetch Code] -> [Sanitize Code] -> [Inject Code] -> [DOM]
         ^                                                            |
         |                                                            |
         +-------------------------(state)---------------------------+
```

Note: The actual injection is managed by the `useCodeInjection` hook, which provides methods to inject and eject the code safely.