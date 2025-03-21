import React from 'react';

export const Menu = ({ children }: { children: React.ReactNode }) => (
    <nav className="space-y-2">{children}</nav>
);

export const MenuItem = ({ children }: { children: React.ReactNode }) => (
    <div className="p-2 rounded-lg hover:bg-green-600 cursor-pointer">{children}</div>
);
