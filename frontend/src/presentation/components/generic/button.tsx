import React, { ReactNode } from 'react';

type ButtonProps = {
  name: string;
  onClick?: () => void;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  name,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <button
      className=" text-rose-900 bg-rose-200 py-2 px-4 rounded-md hover:bg-rose-300 hover:text-rose-800 flex items-center justify-center"
      onClick={onClick}
    >
      <p className="font-medium">{name}</p>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
