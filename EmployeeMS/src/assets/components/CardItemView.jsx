import React, { useState } from 'react';

const CardItemView = ({ icon: Icon, text }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: isHovered ? '#FFD700' : '#fff', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} 
        >
            <div style={styles.iconContainer}>
                <Icon size={24} />
            </div>
            <div style={styles.textContainer}>
                {text}
            </div>
        </div>
    );
};

const styles = {
    iconContainer: {
        marginRight: '10px',
    },
    textContainer: {
        flex: 1,
        fontSize: '16px',
    },
};

export default CardItemView;