import React, { useEffect, useState, useMemo } from 'react';

import { getAllPrograms, getEnrolledPrograms, enrollProgram } from '../state/Program/Action';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';
import { openLoginModal } from '../state/UI/uiSlice';

// Material-UI components for a polished UI
import { TextField, Select, MenuItem, FormControl, InputLabel, Skeleton, Pagination, Typography } from '@mui/material';
import { Search } from 'lucide-react';
import { ProgramCard } from '../components/Programs/ProgramCard';
import { useDispatch, useSelector } from 'react-redux';

const SKELETON_COUNT = 6;

export const Programs = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const { auth } = useSelector(state => state);
    const { programs, isLoading, error, enrolled } = useSelector(state => state.program);

    // State for filtering and sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const programsPerPage = 9;

    useEffect(() => {
        dispatch(getAllPrograms());
        if (jwt) {
            dispatch(getEnrolledPrograms(jwt));
        }
    }, [dispatch, jwt]);

    const handleEnroll = (programId) => {
        if (!jwt) {
            dispatch(openLoginModal());
        } else {
            dispatch(enrollProgram(jwt, programId));
        }
    };

    // Memoize the filtering and sorting logic for performance
    const filteredAndSortedPrograms = useMemo(() => {
        let processedPrograms = [...programs];

        // Apply search and category filters
        processedPrograms = processedPrograms.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter === "All" || p.category === categoryFilter)
        );

        // Apply sorting
        switch (sortOrder) {
            case "rating":
                processedPrograms.sort((a, b) => b.rating - a.rating);
                break;
            case "price_asc":
                processedPrograms.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "price_desc":
                processedPrograms.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case "newest":
            default:
                processedPrograms.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
                break;
        }
        return processedPrograms;
    }, [programs, searchTerm, categoryFilter, sortOrder]);

    const pageCount = Math.ceil(filteredAndSortedPrograms.length / programsPerPage);
    const paginatedPrograms = filteredAndSortedPrograms.slice((currentPage - 1) * programsPerPage, currentPage * programsPerPage);
    const uniqueCategories = ["All", ...new Set(programs.map(p => p.category))];

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <PageTopBanner pageTitle="Our Programs" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* --- Filters Sidebar --- */}
                    <aside className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg h-fit">
                        <Typography variant="h6" className="font-bold mb-4">Filter & Sort</Typography>
                        <div className="space-y-6">
                            <TextField
                                label="Search Programs"
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{ endAdornment: <Search size={20} className="text-gray-400" /> }}
                            />
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)}>
                                    {uniqueCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Sort By</InputLabel>
                                <Select value={sortOrder} label="Sort By" onChange={(e) => setSortOrder(e.target.value)}>
                                    <MenuItem value="newest">Newest</MenuItem>
                                    <MenuItem value="rating">Highest Rated</MenuItem>
                                    <MenuItem value="price_asc">Price: Low to High</MenuItem>
                                    <MenuItem value="price_desc">Price: High to Low</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </aside>

                    {/* --- Programs Grid --- */}
                    <main className="lg:col-span-3">
                        {error && <Typography color="error">Failed to load programs.</Typography>}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {isLoading ? (
                                Array.from(new Array(SKELETON_COUNT)).map((_, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <Skeleton variant="rectangular" height={192} />
                                        <div className="p-4">
                                            <Skeleton variant="text" width="40%" />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" width="80%" />
                                        </div>
                                    </div>
                                ))
                            ) : paginatedPrograms.length > 0 ? (
                                paginatedPrograms.map((program) => (
                                    <ProgramCard
                                        key={program.id}
                                        program={program}
                                        isEnrolled={enrolled?.some(e => e.program.id === program.id)}
                                        onEnroll={() => handleEnroll(program.id)}
                                    />
                                ))
                            ) : (
                                <div className="md:col-span-2 xl:col-span-3 text-center py-16">
                                    <Typography variant="h6">No programs found.</Typography>
                                    <Typography color="text.secondary">Try adjusting your search or filters.</Typography>
                                </div>
                            )}
                        </div>
                        {!isLoading && pageCount > 1 && (
                            <div className="flex justify-center mt-12">
                                <Pagination count={pageCount} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
