import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import programsData from '../../constants/programsData';

export const BreadCrum = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const getTitleFromId = (id) => {
        const program = programsData[parseInt(id)];
        return program?.title || id;
    };
    return (
        <nav className="text-sm text-gray-600 py-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1">
                <li>
                    <Link to="/" className="text-white hover:underline">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
                    const isLast = index === pathnames.length - 1;

                    const parentPath = pathnames[index - 1];
                    const isProgramId = !isNaN(name) && parentPath === 'programs';
                    const label = isProgramId ? getTitleFromId(name) : decodeURIComponent(name);
                    return (
                        <li key={name} className="flex items-center space-x-1">
                            <span className="mx-1">/</span>
                            {isLast ? (
                                <span className="text-sky-700 capitalize">{label}</span>
                            ) : (
                                <Link to={routeTo} className="text-white hover:underline capitalize">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}


