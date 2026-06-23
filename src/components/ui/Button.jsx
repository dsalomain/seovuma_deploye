import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = ''
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

// Made with Bob
