'use client';

import { Bell, Mail, User, Settings, LogOut, UserCircle, FlaskConical, Shield, FileText, ChevronRight, DollarSign, UserRound, Calendar as CalendarIcon, LayoutDashboard, HelpCircle, Building2, MapPin, ChevronLeft, Menu, Crown, Clipboard, Eye } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { UserRole, getRoleColor, getRoleBadgeColor, getRoleDescription } from '../utils/permissions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  currentPage: string;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  currentUserRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export function HeaderNext({ currentPage, isSidebarCollapsed, onToggleSidebar, currentUserRole = 'Admin', onRoleChange }: HeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const roleSwitcherRef = useRef<HTMLDivElement>(null);

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
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(event.target as Node)) {
        setShowRoleSwitcher(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, type: 'payment', message: 'Payment request PR-2024-0042 requires approval', time: '5 min ago', unread: true },
    { id: 2, type: 'study', message: 'New participant enrolled in Study S-2024-001', time: '1 hour ago', unread: true },
    { id: 3, type: 'system', message: 'Monthly payment report is ready', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'studies': 'Studies',
      'participants': 'Participants',
      'funding': 'Funding & Reference Data',
      'organizations': 'Organizations & Locations',
      'security': 'Security & User Management',
      'payments': 'Payment Requests',
      'payments-wizard': 'Create Payment Request',
      'payment-batches': 'Payment Batches',
      'completed-payments': 'Completed Payments',
      'reports-financial': 'Financial Reporting',
      'reports-1099': '1099 Tax Report',
      'reports-reconciliation': 'Reconciliation Report',
      'help': 'Help & Documentation',
    };
    return titles[currentPage] || 'Participant Payment Portal';
  };

  const availableRoles: UserRole[] = ['Admin', 'Study Coordinator', 'Reviewer'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Left section with toggle and page title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
            
            {/* Role Badge with Switcher */}
            <div className="relative" ref={roleSwitcherRef}>
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md ${getRoleBadgeColor(currentUserRole)}`}
                title="Click to switch role (demo mode)"
              >
                <Crown size={12} />
                <span>{currentUserRole}</span>
                <ChevronRight size={12} className={`transition-transform duration-200 ${showRoleSwitcher ? 'rotate-90' : ''}`} />
              </button>

              {/* Role Switcher Dropdown */}
              {showRoleSwitcher && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Demo Mode: Switch Role</p>
                    <p className="text-xs text-gray-500 mt-0.5">Test different permission levels</p>
                  </div>
                  
                  <div className="py-2">
                    {availableRoles.map((role) => {
                      const isCurrentRole = role === currentUserRole;
                      return (
                        <button
                          key={role}
                          onClick={() => {
                            onRoleChange?.(role);
                            setShowRoleSwitcher(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                            isCurrentRole ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${getRoleColor(role)}`}></div>
                              <div>
                                <p className={`text-sm font-medium ${isCurrentRole ? 'text-blue-700' : 'text-gray-900'}`}>
                                  {role}
                                  {isCurrentRole && <span className="ml-2 text-xs text-blue-600">(Active)</span>}
                                </p>
                                <p className="text-xs text-gray-500">{getRoleDescription(role)}</p>
                              </div>
                            </div>
                            {isCurrentRole && (
                              <Shield size={16} className="text-blue-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="px-4 py-2 border-t border-gray-100 bg-amber-50">
                    <p className="text-xs text-amber-800 flex items-center gap-1.5">
                      <Eye size={12} />
                      <span>Role changes are for demo purposes only</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right section with icons */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-blue-600 font-medium">{unreadCount} new</span>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} className="text-gray-600" />
            </button>

            {/* Settings Dropdown */}
            {showSettingsMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Quick Settings</p>
                </div>
                
                <div role="menu" className="py-2">
                  <Link 
                    href="/funding"
                    onClick={() => setShowSettingsMenu(false)}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <DollarSign size={18} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">Funding & Reference Data</p>
                      <p className="text-xs text-gray-500">Manage grants and codes</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/organizations"
                    onClick={() => setShowSettingsMenu(false)}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <Building2 size={18} className="text-gray-500 group-hover:text-purple-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-purple-700">Organizations & Locations</p>
                      <p className="text-xs text-gray-500">Manage locations</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/security"
                    onClick={() => setShowSettingsMenu(false)}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Shield size={18} className="text-gray-500 group-hover:text-green-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-green-700">Security & User Management</p>
                      <p className="text-xs text-gray-500">Manage users and roles</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/help"
                    onClick={() => setShowSettingsMenu(false)}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <HelpCircle size={18} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">Help & Documentation</p>
                      <p className="text-xs text-gray-500">Get support and guides</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 bg-ku-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
                A
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-ku-blue text-white rounded-full flex items-center justify-center text-lg font-medium shadow-md">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">Admin User</p>
                      <p className="text-sm text-gray-600 truncate">admin@kumc.edu</p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(currentUserRole)}`}>
                          <Crown size={10} />
                          {currentUserRole}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div role="menu" className="py-2">
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <UserCircle size={18} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">My Profile</p>
                      <p className="text-xs text-gray-500">View and edit your profile</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <Clipboard size={18} className="text-gray-500 group-hover:text-purple-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-purple-700">My Studies</p>
                      <p className="text-xs text-gray-500">Studies you're assigned to</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => router.push('/sso')}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 flex items-center gap-3 text-gray-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <Settings size={18} className="text-gray-500 group-hover:text-amber-600 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-amber-700">Account Settings</p>
                      <p className="text-xs text-gray-500">Manage your preferences</p>
                    </div>
                  </button>
                </div>

                {/* Logout Section */}
                <div className="border-t border-gray-100 p-2 bg-gray-50">
                  <button 
                    onClick={() => router.push('/sso')}
                    role="menuitem"
                    className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-red-50 flex items-center gap-3 text-red-600 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    <div>
                      <p className="text-sm font-medium">Sign Out</p>
                      <p className="text-xs text-red-500/80">Logout from your account</p>
                    </div>
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
