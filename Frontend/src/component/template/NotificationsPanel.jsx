import React, { useState } from 'react';
import { X, Bell, CheckCircle, AlertCircle, Edit, MessageCircle, MoreHorizontal } from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    user: 'Abagael Luth',
    action: 'deleted Volley against violence',
    time: '2 min ago',
    type: 'delete',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    user: 'Lucille Pena',
    action: 'commented on file Guest list',
    time: '25 min ago',
    type: 'comment',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    user: 'Abagael Luth',
    action: 'edited Volley against violence',
    time: '16 October',
    type: 'edit',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    user: 'Sallie Moran',
    action: 'commented on file Guest list',
    time: '12 October',
    type: 'comment',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(2);

  const getActionIcon = (type) => {
    switch (type) {
      case 'delete':
        return <X className="text-red-500" size={16} />;
      case 'comment':
        return <MessageCircle className="text-blue-500" size={16} />;
      case 'edit':
        return <Edit className="text-green-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-96">
      {/* Notifications Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{unreadCount}</span>
          )}
        </div>
        <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-100">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors 
              ${index < unreadCount ? 'bg-blue-50' : ''}`}
          >
            <div className="relative">
              <img src={notification.avatar} alt={notification.user} className="w-10 h-10 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
                {getActionIcon(notification.type)}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-gray-800">{notification.user}</span> {notification.action}
              </p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
