
import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button', ...rest }) {
    const classes = `btn ${variant === 'secondary' ? 'secondary' : ''} ${className}`.trim();
    return (
        <button type={type} className={classes} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}