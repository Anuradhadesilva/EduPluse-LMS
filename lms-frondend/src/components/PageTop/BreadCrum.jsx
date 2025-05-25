import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const BreadCrum = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="text-sm text-gray-600 py-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1">
                <li>
                    <Link to="/" className="text-white hover:underline">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={name} className="flex items-center space-x-1">
                            <span className="mx-1">/</span>
                            {isLast ? (
                                <span className="text-sky-700 capitalize">{decodeURIComponent(name)}</span>
                            ) : (
                                <Link to={routeTo} className="text-white hover:underline capitalize">
                                    {decodeURIComponent(name)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}


