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

            <div className="mx-auto max-w-4xl p-6">
                <div className="mb-6">
                    <img
                        src={product.image ? product.image : '/imgs/ejemplo.jpg'}
                        alt={product.title}
                        className="max-h-[500px] w-full rounded-xl object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-cyan-700 p-4">
                        <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
                        <p className="mb-4">{product.description}</p>

                        <ul className="space-y-2">
                            <li>
                                <strong>Marca:</strong> {product.brand_id}
                            </li>
                            <li>
                                <strong>Modelo:</strong> {product.model}
                            </li>
                            <li>
                                <strong>Año:</strong> {product.year}
                            </li>
                            <li>
                                <strong>Kilometraje:</strong> {product.mileage} km
                            </li>
                            <li>
                                <strong>Combustible:</strong> {product.fuel_type}
                            </li>
                            <li>
                                <strong>Transmisión:</strong> {product.transmission}
                            </li>
                            <li>
                                <strong>Categoría:</strong> {product.category_id}
                            </li>
                            <li>
                                <strong>Ubicación:</strong> {product.location_id}
                            </li>
                            <li>
                                <strong>Precio:</strong> ${product.price}
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg bg-cyan-700 p-4">
                        <h2 className="mb-2 text-xl font-semibold">Publicado por</h2>
                        <p>
                            <strong>Nombre:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <MessageCircleMore />
                            <span>7715251436</span>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
