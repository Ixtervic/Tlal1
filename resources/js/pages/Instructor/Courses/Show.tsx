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
                        className="h-[400px] w-full transform rounded-xl object-cover shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                    />
                </div>

                {/* Detalles del producto y vendedor */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Detalles del producto */}
                    <div className="rounded-lg bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <h1 className="mb-4 text-3xl font-semibold text-gray-800">{product.title}</h1>
                        <p className="mb-6 text-gray-600">{product.description}</p>

                        <ul className="space-y-3 text-gray-700">
                            <li>
                                <strong className="font-medium">Marca:</strong> {product.brand_id}
                            </li>
                            <li>
                                <strong className="font-medium">Modelo:</strong> {product.model}
                            </li>
                            <li>
                                <strong className="font-medium">Año:</strong> {product.year}
                            </li>
                            <li>
                                <strong className="font-medium">Kilometraje:</strong> {product.mileage} km
                            </li>
                            <li>
                                <strong className="font-medium">Combustible:</strong> {product.fuel_type}
                            </li>
                            <li>
                                <strong className="font-medium">Transmisión:</strong> {product.transmission}
                            </li>
                            <li>
                                <strong className="font-medium">Categoría:</strong> {product.category_id}
                            </li>
                            <li>
                                <strong className="font-medium">Ubicación:</strong> {product.location_id}
                            </li>
                            <li>
                                <strong className="font-medium">Precio:</strong> ${product.price}
                            </li>
                        </ul>
                    </div>

                    {/* Información del vendedor */}
                    <div className="rounded-lg bg-gray-50 p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Publicado por</h2>
                        <p className="mb-4 text-gray-700">
                            <strong className="font-medium">Nombre:</strong> {user.name}
                        </p>
                        <p className="mb-4 text-gray-700">
                            <strong className="font-medium">Email:</strong> {user.email}
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
