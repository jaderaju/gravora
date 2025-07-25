// src/components/common/Button.jsx
import React from "react";

export default function Button({ icon, className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded ${className}`}
      {...props}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </button>
  );
}
