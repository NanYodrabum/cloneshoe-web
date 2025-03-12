// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { 
  HomeIcon, 
  PackageIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  ChevronDownIcon,
  ChevronRightIcon,
  LogOutIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon size={20} />,
      path: '/admin/dashboard',
      children: null,
    },
    {
      title: 'Products',
      icon: <PackageIcon size={20} />,
      path: '/admin/products',
      children: [
        { title: 'All Products', path: '/admin/products' },
        { title: 'Add Product', path: '/admin/products/add' },
        { title: 'Categories', path: '/admin/products/categories' },
      ],
    },
    {
      title: 'Orders',
      icon: <ShoppingCartIcon size={20} />,
      path: '/admin/orders',
      children: [
        { title: 'All Orders', path: '/admin/orders' },
        { title: 'Pending Orders', path: '/admin/orders/pending' },
        { title: 'Delivered Orders', path: '/admin/orders/delivered' },
      ],
    },
    {
      title: 'Customers',
      icon: <UsersIcon size={20} />,
      path: '/admin/customers',
      children: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu toggle */}
      <button
        className="fixed z-50 p-2 bg-white rounded-md shadow-md lg:hidden top-4 left-4"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="px-4 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-md ${
                        isActive(item.path)
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleMenu(item.title)}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      {expandedMenu === item.title ? (
                        <ChevronDownIcon size={16} />
                      ) : (
                        <ChevronRightIcon size={16} />
                      )}
                    </button>
                    {expandedMenu === item.title && (
                      <ul className="pl-10 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              to={child.path}
                              className={`block px-4 py-2 text-sm rounded-md ${
                                location.pathname === child.path
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="pt-8 mt-8 border-t">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100">
              <LogOutIcon size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className={`lg:ml-64 transition-all duration-300 p-6`}>
        <div className="py-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;