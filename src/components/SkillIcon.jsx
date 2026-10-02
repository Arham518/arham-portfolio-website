import React from 'react';

export const SkillIcon = ({ type, className = "w-5 h-5" }) => {
  switch (type) {
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#00D8FE" />
          <g stroke="#00D8FE" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'js':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" rx="4" fill="#F7DF1E" />
          <path d="M18.5 22.8c.6.9 1.4 1.5 2.5 1.5 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.3-2-1.9l-.7-.3c-2-.9-3.3-2-3.3-4.3 0-2.1 1.6-3.8 4.1-3.8 1.8 0 3.1.7 4 2.2l-2.2 1.4c-.5-.8-1-1.1-1.8-1.1-.8 0-1.4.5-1.4 1.1 0 .8.5 1.1 1.7 1.6l.7.3c2.4 1 3.7 2.1 3.7 4.6 0 2.6-2 4-4.5 4-2.5 0-4.1-1.2-4.9-2.9l2.2-1.4zM8 23.2c.4.7 1 1.1 1.8 1.1 1 0 1.6-.6 1.6-2.1v-9.3h2.7v9.4c0 2.8-1.6 4.1-4.2 4.1-2.2 0-3.7-1.1-4.4-2.7l2.5-.5z" fill="#000000" />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path d="M5 3l2.4 24.3L16 30l8.6-2.7L27 3H5z" fill="#E44D26" />
          <path d="M16 5.2v22.4l6.6-2.1L24.6 5.2H16z" fill="#F16529" />
          <path d="M16 11.2h4.5l-.3 3.6H16v3.2h4.2l-.4 4.5-3.8 1-3.8-1-.3-3.2H9.3l.5 5.8 6.2 1.7 6.2-1.7.9-9.5H9.7l-.3-3.6H16v-2h-6.7l-.3-3.2H16v3.2z" fill="#FFFFFF" />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path d="M5 3l2.4 24.3L16 30l8.6-2.7L27 3H5z" fill="#1572B6" />
          <path d="M16 5.2v22.4l6.6-2.1L24.6 5.2H16z" fill="#33A9DC" />
          <path d="M16 11.2h4.5l-.3 3.6H16v3.2h4.2l-.4 4.5-3.8 1-3.8-1-.3-3.2H9.3l.5 5.8 6.2 1.7 6.2-1.7.9-9.5H9.7l-.3-3.6H16v-2h-6.7l-.3-3.2H16v3.2z" fill="#FFFFFF" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="#38BDF8">
          <path d="M16 9.6c-4.8 0-7.8 2.4-9 7.2 1.8-2.4 3.9-3.3 6.3-2.7 1.4.3 2.3 1.3 3.4 2.4 1.8 1.8 3.8 3.9 8.3 3.9 4.8 0 7.8-2.4 9-7.2-1.8 2.4-3.9 3.3-6.3 2.7-1.4-.3-2.3-1.3-3.4-2.4-1.8-1.8-3.8-3.9-8.3-3.9zm-9 9.6c-4.8 0-7.8 2.4-9 7.2 1.8-2.4 3.9-3.3 6.3-2.7 1.4.4 2.3 1.3 3.4 2.4 1.8 1.8 3.8 3.9 8.3 3.9 4.8 0 7.8-2.4 9-7.2-1.8 2.4-3.9 3.3-6.3 2.7-1.4-.3-2.3-1.3-3.4-2.4-1.8-1.8-3.8-3.9-8.3-3.9z" />
        </svg>
      );
    case 'bootstrap':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" rx="6" fill="#7952B3" />
          <path d="M11 8h5.3c2.4 0 4 .6 5 1.6.8.9 1.2 2 1.2 3.3 0 1.7-.8 3-2.3 3.8v.1c2 .8 3 2.3 3 4.2 0 1.5-.5 2.7-1.4 3.7-1.2 1.2-2.9 1.7-5.5 1.7H11V8zm3.2 2.7v4.6h2c1.2 0 2-.2 2.6-.7.5-.4.8-1 .8-1.7 0-.7-.3-1.3-.8-1.7-.5-.4-1.4-.5-2.6-.5h-2zm0 7v5.2h2.4c1.3 0 2.2-.2 2.8-.7.6-.5.9-1.2.9-2 0-.8-.3-1.5-.9-2-.6-.5-1.6-.7-3-.7h-2.2z" fill="#FFFFFF" />
        </svg>
      );
    case 'redux':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="#764ABC">
          <path d="M21.5 6.2c-2.4 0-4.6 1.4-5.5 3.5-.9-2.1-3.1-3.5-5.5-3.5-3.4 0-6.2 2.8-6.2 6.2 0 4.8 7.3 10.3 11.7 13.4 4.4-3.1 11.7-8.6 11.7-13.4 0-3.4-2.8-6.2-6.2-6.2zm-5.5 17.5c-3.5-2.7-9.5-7.5-9.5-11.3 0-2.2 1.8-4 4-4s4 1.8 4 4v.5h3v-.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 3.8-6 8.6-9.5 11.3z" />
        </svg>
      );
    case 'api':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" rx="4" fill="#4F46E5" />
          <text x="16" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">API</text>
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path d="M28.7 14.3L17.7 3.3c-.8-.8-2-.8-2.8 0l-2.4 2.4 3.5 3.5c.8-.3 1.8-.1 2.4.5.6.6.8 1.6.5 2.4l3.4 3.4c.8-.3 1.8-.1 2.4.5.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.7-.7-.9-1.7-.5-2.6l-3.2-3.2v6.6c.3.2.5.5.6.8.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.9-.9-.9-2.4 0-3.3.4-.4.9-.6 1.4-.6v-6.9c-.5-.1-1-.3-1.4-.7-.7-.7-.9-1.7-.5-2.6L7.3 10.4 3.3 14.4c-.8.8-.8 2 0 2.8l11.1 11.1c.8.8 2 .8 2.8 0l11.5-11.2c.8-.8.8-2 0-2.8z" fill="#F05032" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="#539E43">
          <path d="M16 2.5L3.5 9.7v14.4L16 31.3l12.5-7.2V9.7L16 2.5zm0 3.6l9.4 5.4v10.9L16 27.8l-9.4-5.4V11.5L16 6.1z" />
          <circle cx="16" cy="17" r="4" fill="#539E43" />
        </svg>
      );
    case 'flask':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 4h6M16 4v9l-7 12a2 2 0 001.7 3h16.6a2 2 0 001.7-3l-7-12V4" />
          <path d="M11 20h10" />
        </svg>
      );
    case 'c':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" rx="4" fill="#00599C" />
          <path d="M16.5 9.5c-4.1 0-6.8 2.9-6.8 6.5s2.7 6.5 6.8 6.5c2.6 0 4.6-1.2 5.5-2.6l-2-1.4c-.7.9-1.9 1.6-3.5 1.6-2.5 0-4-1.7-4-4.1s1.5-4.1 4-4.1c1.6 0 2.8.7 3.5 1.6l2-1.4c-.9-1.4-2.9-2.6-5.5-2.6z" fill="#FFFFFF" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path d="M15.8 3.1c-4.1 0-3.8 1.8-3.8 1.8l.1 1.9h3.8v.6H8.6s-2.6.3-2.6 3.8 2.3 3.6 2.3 3.6h1.4v-1.8s-.1-2.1 2-2.1h3.4s1.9 0 1.9-1.9V5.2s.3-2.1-1.2-2.1zm-2.2 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#387EB8" />
          <path d="M16.2 28.9c4.1 0 3.8-1.8 3.8-1.8l-.1-1.9h-3.8v-.6h7.3s2.6-.3 2.6-3.8-2.3-3.6-2.3-3.6h-1.4v1.8s.1 2.1-2 2.1h-3.4s-1.9 0-1.9 1.9v3.8s-.3 2.1 1.2 2.1zm2.2-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFE052" />
        </svg>
      );
    case 'responsive':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};
