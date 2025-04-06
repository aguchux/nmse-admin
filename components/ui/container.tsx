import React from 'react';

export const DivContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full h-full bg-white p-4 shadow-lg ${className}}`}>
      {children}
    </div>
  );
};

export const DivContainerFluid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full md:w-1/3 flex-grow h-full bg-white p-4 shadow-lg ${className}}`}
    >
      {children}
    </div>
  );
};
