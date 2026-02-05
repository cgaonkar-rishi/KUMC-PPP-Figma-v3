import { Bell, Mail, User, Settings, LogOut, UserCircle, FlaskConical, Shield, FileText, ChevronRight, DollarSign, UserRound, Calendar as CalendarIcon, LayoutDashboard, HelpCircle, Building2, MapPin, ChevronLeft, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate?: (page: string) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export function Header({ currentPage, onNavigate, isSidebarCollapsed, onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileMenu(false);
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const notifications = [
    { id: 1, title: 'New participant enrolled', message: 'John Smith has been enrolled in CHS-2026-001', time: '5 min ago', type: 'success', read: false },
    { id: 2, title: 'Visit reminder', message: 'Sarah Johnson has a scheduled visit at 10:30 AM', time: '15 min ago', type: 'info', read: false },
    { id: 3, title: 'Study milestone reached', message: 'DPT-2025-019 has reached 200 participants', time: '1 hour ago', type: 'success', read: false },
    { id: 4, title: 'Document pending review', message: 'Protocol amendment requires your approval', time: '2 hours ago', type: 'warning', read: true },
    { id: 5, title: 'Visit completed', message: 'Michael Brown completed follow-up visit', time: '3 hours ago', type: 'info', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'studies':
        return 'Studies';
      case 'funding':
        return 'Funding and Grants';
      case 'organizations':
        return 'Organizations & Locations';
      case 'participants':
        return 'Participants';
      case 'visits':
        return 'Visits';
      case 'payments':
        return 'Payments';
      case 'reports':
        return 'Reports';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'studies':
        return 'Studies Management';
      case 'funding':
        return 'Funding Management';
      case 'organizations':
        return 'Organizations & Locations Management';
      case 'participants':
        return 'Participants Management';
      case 'visits':
        return 'Study Visits';
      case 'payments':
        return 'Participant Reimbursements';
      case 'reports':
        return 'Reports & Analytics';
      case 'settings':
        return 'System Settings';
      default:
        return 'Dashboard Overview';
    }
  };

  const getPageIcon = () => {
    switch (currentPage) {
      case 'dashboard':
        return DollarSign;
      case 'studies':
        return FlaskConical;
      case 'funding':
        return Building2;
      case 'organizations':
        return Building2;
      case 'participants':
        return UserRound;
      case 'visits':
        return CalendarIcon;
      case 'payments':
        return DollarSign;
      case 'reports':
        return FileText;
      case 'settings':
        return Settings;
      default:
        return LayoutDashboard;
    }
  };

  const PageIcon = getPageIcon();
  const iconBgColor = currentPage === 'payments' ? 'bg-green-600' : 'bg-ku-blue';

  return (
    <header className="bg-white border-b border-gray-200 flex items-center h-16">
      {/* Logo Section - Blended white background */}
      <div className={`h-16 bg-white flex items-center justify-between px-6 border-r border-gray-200 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {!isSidebarCollapsed && (
          <div className="flex-1 mr-2">
            <svg viewBox="0 0 200 40" className="w-full h-10" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#0051BA">KUMC</text>
              <text x="10" y="38" fontFamily="Arial, sans-serif" fontSize="8" fill="#0051BA">Medical Center</text>
            </svg>
          </div>
        )}
        {isSidebarCollapsed && (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#0051BA">K</text>
            </svg>
          </div>
        )}
        <button 
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          {isSidebarCollapsed ? <ChevronRight size={20} className="text-gray-700" aria-hidden="true" /> : <ChevronLeft size={20} className="text-gray-700" aria-hidden="true" />}
        </button>
      </div>

      {/* Header Content */}
      <div className="flex-1 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center shadow-md ring-2 ring-white">
            <div className="text-white font-bold text-xl tracking-tight">
              P<span className="text-sm align-super">3</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-bold leading-none">✓</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-ku-blue font-semibold tracking-tight">
              Participant Payment Portal
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Navigation Links Group */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate?.('dashboard')}
              aria-label="Go to dashboard"
              className="px-3 py-2 hover:bg-blue-600 text-gray-700 hover:text-white rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 border-2 border-blue-500 hover:border-blue-600 flex items-center gap-2 font-medium text-sm"
            >
              <LayoutDashboard size={18} aria-hidden="true" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate?.('help')}
              aria-label="Help and support"
              className="px-3 py-2 hover:bg-purple-600 text-gray-700 hover:text-white rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 border-2 border-purple-500 hover:border-purple-600 flex items-center gap-2 font-medium text-sm"
            >
              <HelpCircle size={18} aria-hidden="true" />
              <span>Help</span>
            </button>
          </div>

          {/* Dropdown Utilities Group - Background Container */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl px-2 py-1.5">
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                aria-expanded={showNotifications}
                aria-haspopup="true"
                className="relative p-2 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <Bell size={20} className="text-gray-600 hover:text-amber-600 transition-colors" aria-hidden="true" />
                {unreadCount > 0 && (
                  <>
                    <span className="sr-only">{unreadCount} unread notifications</span>
                    <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-md" aria-hidden="true">
                      {unreadCount}
                    </span>
                  </>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div 
                  role="region"
                  aria-label="Notifications panel"
                  className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3>Notifications</h3>
                    <button className="text-sm text-ku-blue hover:text-ku-blue-dark">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-orange-500' :
                            'bg-ku-blue'
                          }`}></div>
                          <div className="flex-1">
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-ku-blue hover:text-ku-blue-dark">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                aria-label="Settings menu"
                aria-expanded={showSettingsMenu}
                aria-haspopup="true"
                className="p-2 hover:bg-slate-50 hover:text-slate-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
              >
                <Settings size={20} className="text-gray-600 hover:text-slate-700 transition-colors" aria-hidden="true" />
              </button>

              {/* Settings Menu Panel */}
              {showSettingsMenu && (
                <div 
                  role="menu"
                  aria-label="Settings menu"
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                >
                  {/* Header Section with Gradient */}
                  <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-gray-800 p-5">
                    {/* Decorative Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 shadow-lg">
                        <Settings size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">Settings</p>
                        <p className="text-xs text-slate-300">System configuration</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        onNavigate?.('organizations');
                        setShowSettingsMenu(false);
                      }}
                      role="menuitem"
                      className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Building2 size={16} className="text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm">Organizations & Locations</span>
                        <p className="text-xs text-gray-500">Manage org structure</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        onNavigate?.('funding');
                        setShowSettingsMenu(false);
                      }}
                      role="menuitem"
                      className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <DollarSign size={16} className="text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm">Funding and Grants</span>
                        <p className="text-xs text-gray-500">Manage funding sources</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        onNavigate?.('security');
                        setShowSettingsMenu(false);
                      }}
                      role="menuitem"
                      className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                        <Shield size={16} className="text-amber-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm">Roles and Permissions</span>
                        <p className="text-xs text-gray-500">Security & access control</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-label="User profile menu"
              aria-expanded={showProfileMenu}
              aria-haspopup="true"
              className="relative focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-full"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 ring-2 ring-white hover:ring-blue-200 cursor-pointer">
                AU
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </button>

            {/* Profile Menu Panel */}
            {showProfileMenu && (
              <div 
                role="menu"
                aria-label="User profile menu"
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
              >
                {/* Header Section with Gradient */}
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-5">
                  {/* Decorative Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 shadow-lg">
                      <span className="text-white font-bold text-base">AU</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-blue-100 mb-0.5">Welcome back,</p>
                      <p className="text-white font-semibold">Admin User</p>
                      <p className="text-xs text-blue-100">admin@ppp.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button 
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <UserCircle size={16} className="text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-sm">My Profile</span>
                      <p className="text-xs text-gray-500">View and edit profile</p>
                    </div>
                  </button>
                  
                  <button 
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <Settings size={16} className="text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-sm">Settings</span>
                      <p className="text-xs text-gray-500">Preferences & account</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => onNavigate?.('sso')}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                      <Shield size={16} className="text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-sm">View SSO Login</span>
                      <p className="text-xs text-gray-500">Authentication details</p>
                    </div>
                  </button>
                </div>

                {/* Logout Section */}
                <div className="border-t border-gray-100 p-2 bg-gray-50">
                  <button 
                    onClick={() => onNavigate?.('sso')}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-red-50 flex items-center gap-3 text-red-600 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <LogOut size={16} className="text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-sm">Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}