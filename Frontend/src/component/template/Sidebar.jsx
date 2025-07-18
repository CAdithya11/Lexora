import { ChevronFirst, ChevronLast, MoreVertical, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import logo from '../../assets/logo.png';
import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg rounded-r-xl overflow-hidden">
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-100">
            <img
              src={logo}
              className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-32' : 'w-0'}`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 shadow-sm transition-all duration-200 hover:shadow"
            >
              {expanded ? <ChevronFirst className="text-gray-600" /> : <ChevronLast className="text-gray-600" />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul
              className={`flex-1 px-3 py-2 overflow-y-auto overflow-x-hidden ${!expanded ? 'scrollbar-thin' : ''}`}
              style={{ scrollbarWidth: 'thin' }}
            >
              {children}
            </ul>
          </SidebarContext.Provider>

          <div className="border-t border-gray-200 flex p-3 bg-gray-50"></div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, children, alwaysOpen = false, locked }) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(alwaysOpen);

  const hasChildren = children && children.length > 0;

  // Ensure the alwaysOpen menu stays open
  useEffect(() => {
    if (alwaysOpen) {
      setIsOpen(true);
    }
  }, [alwaysOpen]);

  return (
    <>
      <li
        className={`relative flex items-center py-2 px-3 my-1.5 font-medium rounded-md cursor-pointer transition-all duration-200 ${
          active
            ? 'bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-600 shadow-md'
            : 'hover:bg-blue-50 text-gray-600 hover:shadow-sm'
        }`}
        onClick={() => hasChildren && !alwaysOpen && setIsOpen(!isOpen)}
      >
        <div className={`${active ? 'text-blue-600' : 'text-gray-500'}`}>{icon}</div>
        <span id={text} className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
          {text}
        </span>

        {hasChildren && expanded && !alwaysOpen && locked === false && (
          <div className="ml-auto">
            {console.log('LOCKED', locked)}
            {isOpen ? (
              <ChevronDown size={16} className="text-gray-500" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            )}
          </div>
        )}

        {locked && (
          <div className="ml-auto">
            <Lock size={16} className="text-gray-500" />
          </div>
        )}

        {hasChildren && expanded && alwaysOpen && locked === false && (
          <div className="ml-auto">
            {console.log('LOCKED', locked)}
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        )}

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-200 ${
              expanded ? (hasChildren ? 'right-8' : 'right-2') : 'top-2'
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 text-sm invisible opacity-0 -translate-x-3 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 shadow-md z-10`}
          >
            {text}
          </div>
        )}
      </li>

      {/* Dropdown menu - shown if open or alwaysOpen is true */}
      {hasChildren && (isOpen || alwaysOpen) && expanded && (
        <div className="ml-6 pl-2 border-l border-blue-100">{children}</div>
      )}
    </>
  );
}

export function SidebarSubItem({ text, active, locked }) {
  if (locked) {
    return;
  }
  return (
    <li
      id={text}
      className={`relative flex items-center py-1.5 px-3 my-1 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${
        active ? 'bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-700' : 'hover:bg-blue-50 text-gray-600'
      }`}
    >
      <span>{text}</span>
    </li>
  );
}
