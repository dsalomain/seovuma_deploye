import './Card.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  image,
  imageAlt = '',
  footer,
  onClick,
  className = '',
  hoverable = false
}) => {
  const cardClass = `card ${hoverable ? 'card-hoverable' : ''} ${className}`;
  
  return (
    <div className={cardClass} onClick={onClick}>
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children && <div className="card-body">{children}</div>}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

// Made with Bob
