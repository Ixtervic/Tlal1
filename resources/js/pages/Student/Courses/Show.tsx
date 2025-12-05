import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { MessageCircleMore } from 'lucide-react';

interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    brand_id: string;
    model: string;
    year: number;
    mileage: number;
    fuel_type: string;
    transmission: string;
    price: number;
    category_id: string;
    location_id: string;
}

interface User {
    name: string;
    email: string;
}

interface ShowProps {
    auth: {
        user: any;
    };
    product: Product;
    user: User;
}

export default function Show({ auth, product, user }: ShowProps) {
    return (
        <AppLayout>
            <Head title={`Producto: ${product.title}`} />

            <div className="mx-auto max-w-6xl p-6">
                {/* Imagen del producto */}
                <div className="mb-8">
                    <img
                        src={product.image ? product.image : '/imgs/ejemplo.jpg'}
                        alt={product.title}
                        className="max-h-[500px] w-full rounded-xl object-cover shadow-lg"
                    />
                </div>

                {/* Detalles del producto y usuario */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Detalles del producto */}
                    <div className="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <h1 className="mb-4 text-3xl font-semibold text-gray-800">{product.title}</h1>
                        <p className="mb-4 text-gray-700">{product.description}</p>

                        <ul className="space-y-3 text-gray-600">
                            <li>
                                <strong className="font-semibold">Marca:</strong> {product.brand_id}
                            </li>
                            <li>
                                <strong className="font-semibold">Modelo:</strong> {product.model}
                            </li>
                            <li>
                                <strong className="font-semibold">Año:</strong> {product.year}
                            </li>
                            <li>
                                <strong className="font-semibold">Kilometraje:</strong> {product.mileage} km
                            </li>
                            <li>
                                <strong className="font-semibold">Combustible:</strong> {product.fuel_type}
                            </li>
                            <li>
                                <strong className="font-semibold">Transmisión:</strong> {product.transmission}
                            </li>
                            <li>
                                <strong className="font-semibold">Categoría:</strong> {product.category_id}
                            </li>
                            <li>
                                <strong className="font-semibold">Ubicación:</strong> {product.location_id}
                            </li>
                            <li>
                                <strong className="font-semibold">Precio:</strong> ${product.price}
                            </li>
                        </ul>
                    </div>

                    {/* Información del vendedor */}
                    <div className="rounded-lg bg-gray-100 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Publicado por</h2>
                        <p className="mb-3 text-gray-700">
                            <strong className="font-semibold">Nombre:</strong> {user.name}
                        </p>
                        <p className="mb-3 text-gray-700">
                            <strong className="font-semibold">Email:</strong> {user.email}
                        </p>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <MessageCircleMore className="text-gray-600" />
                            <span className="text-lg">7715251436</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
