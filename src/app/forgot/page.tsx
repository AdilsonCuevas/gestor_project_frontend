'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { forgotApi } from "../admin/users/user.api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await forgotApi(email);
        setSubmitted(true);
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlpSWHzX-P0jcx7E_r_J2otJ_XpMKDY6wxA&s')" }} // Asegúrate de que exista
        >
            <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-blue-100 shadow-lg rounded-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src="data:image/png;base64,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" alt="avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-blue-900">
                        Recuperar contraseña
                    </CardTitle>
                    <CardDescription>
                        Ingresa tu correo electrónico para recibir instrucciones
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                                <Button type="submit" className="flex-1 min-w-[120px]">
                                    Enviar instrucciones
                                </Button>
                                <Button
                                    type="button"
                                    className="flex-1 min-w-[120px] bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => router.push('/login')}
                                >
                                    Volver a Login
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-green-700 text-center">
                            Si el correo existe en el sistema, recibirás un enlace para restablecer tu contraseña.
                        </p>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
