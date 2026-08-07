import { Link, useLocation } from 'react-router-dom';

export default function MobileNavLinks({ items, onNavigate }) {
    const location = useLocation();
    const isActive = (p) => location.pathname === p;

    return (
        <>
            {items.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    onClick={onNavigate}
                    className={`block text-lg font-semibold px-4 py-3 rounded-md transition hover:bg-pink-700 ${
                        isActive(item.path) ? 'bg-pink-800' : ''
                    }`}
                >
                    {item.label}
                </Link>
            ))}
        </>
    );
}
