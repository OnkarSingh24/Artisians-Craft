import React from 'react';
import './UserAvatar.css'; 

const getInitial = (Name) => {
  if (!Name) return '?';
  return Name.trim()[0].toUpperCase();
};

const getColorFromName = (Name) => {
  const colors = ['#FFB300', '#FF7043', '#66BB6A', '#42A5F5', '#AB47BC', '#EC407A'];
  let hash = 0;
  for (let i = 0; i < Name.length; i++) {
    hash = Name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const UserAvatar = ({ Name, size = 60 }) => {
  const initial = getInitial(Name);
  const bgColor = getColorFromName(Name);

  return (
    <div
      className="user-avatar"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size / 2,
      }}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;
