import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, setData, get, post } = useForm({
        searched: '',
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setData('searched', value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('search.results', { searched: searchTerm }));
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full rounded-lg border px-4 py-2"
                />
                <button type="submit" className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white">
                    Buscar
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
