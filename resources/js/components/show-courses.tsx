import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    brand_id: string;
    model: string;
    year: number;
    mileage: string;
    fuel_type: string;
    transmission: string;
    price: number;
    category_id: string;
    location_id: string;
    created_at: string;
}

interface ProductsCardsProps {
    products: Product[];
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
    const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState<string>('newest');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [filterYear, setFilterYear] = useState<number | ''>('');
    const [filterModel, setFilterModel] = useState<string>('');

    useEffect(() => {
        let filtered = [...products];

        // Filtro de precio
        filtered = filtered.filter((product) => {
            const meetsMin = product.price >= minPrice;
            const meetsMax = maxPrice !== '' ? product.price <= maxPrice : true;
            return meetsMin && meetsMax;
        });

        // Filtro de año
        if (filterYear !== '') {
            filtered = filtered.filter((product) => product.year === Number(filterYear));
        }

        // Filtro de modelo (búsqueda parcial, no sensible a mayúsculas)
        if (filterModel.trim() !== '') {
            const search = filterModel.trim().toLowerCase();
            filtered = filtered.filter((product) => product.model.toLowerCase().includes(search));
        }

        // Ordenar
        switch (sortOption) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
        }

        setSortedProducts(filtered);
    }, [products, sortOption, minPrice, maxPrice, filterYear, filterModel]);

    return (
        <Card className="mt-4 w-full border-none shadow-none">
            <CardContent className="p-4">
                <div className="mb-4 grid gap-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Ordenar por */}
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-300">Ordenar por:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="rounded-md border border-gray-700 p-2 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="newest">Más recientes</option>
                            <option value="oldest">Más antiguos</option>
                            <option value="price-asc">Precio: menor a mayor</option>
                            <option value="price-desc">Precio: mayor a menor</option>
                        </select>
                    </div>

                    {/* Filtro de precio */}
                    <div className="flex items-center gap-2">
                        <label className="text-gray-300">Precio mínimo:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="w-24 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            placeholder="0"
                            min={0}
                        />
                        <label className="text-gray-300">Precio máximo:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-24 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            placeholder="Ej: 50000"
                            min={0}
                        />
                    </div>

                    {/* Filtro por año */}
                    <div className="flex items-center gap-2">
                        <label className="text-gray-300">Año:</label>
                        <input
                            type="number"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-32 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            placeholder="Ej: 2021"
                        />
                    </div>

                    {/* Filtro por modelo */}
                    <div className="flex items-center gap-2">
                        <label className="text-gray-300">Modelo:</label>
                        <input
                            type="text"
                            value={filterModel}
                            onChange={(e) => setFilterModel(e.target.value)}
                            className="w-32 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            placeholder="Ej: Civic"
                        />
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
                            <div key={product.id} className="rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                                <img
                                    src={product.image ? product.image : './imgs/ejemplo.jpg'}
                                    alt={`Producto ${product.id}`}
                                    className="mb-3 h-40 w-full rounded-md object-cover"
                                />
                                <div className="font-semibold text-gray-800">Modelo: {product.model}</div>
                                <div className="text-gray-600">Marca: {product.brand_id}</div>
                                <div className="text-gray-600">Año: {product.year}</div>
                                <div className="mt-2 font-bold text-green-600">${product.price}</div>
                                <a href={route('products.show', product.id)} className="mt-2 inline-block text-blue-500 hover:underline">
                                    Ver más
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No se encontraron productos.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductsCards;
