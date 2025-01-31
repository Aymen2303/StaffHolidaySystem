import React from 'react';

const UserInfoCardView = ({ email, position }) => {
  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getFullYear()).slice(-2)}`;
 
  return (
    <div style={styles.card}>
    <div style={styles.userInfoContent}>
        <div>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Position:</strong> {position}</p>
        </div>
        <div  style={styles.dateContainer}>
            <p><strong>Date:</strong> {formattedDate}</p>
        </div>
    </div>
</div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    backgroundColor : "#fff",
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  userInfoContent: {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  dateContainer: {
    textAlign: 'right',
}
};

export default UserInfoCardView;

