import { Link, useLocation } from 'react-router-dom';

export default function DesktopMenu({ items }) {
    const location = useLocation();
    const isActive = (p) => location.pathname === p;

    return (
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 text-gray-900">
            {items.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`hover:text-gray-600 transition ${
                        isActive(item.path) ? 'underline' : ''
                    }`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}
