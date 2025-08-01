"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { registerApi } from "../admin/users/user.api";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        avatar: "",
    });

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerApi(formData);
        router.push("/login");
        router.refresh();
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{ backgroundImage: "url('data:image/jpeg;base64,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')" }}
        >
            <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-blue-100 shadow-xl rounded-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={formData.avatar || "https://www.ehealth.gov.hk/assets/images/you-and-your-family/personally-reg-01.png"} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-blue-900">
                        Registro de Usuario
                    </CardTitle>
                    <CardDescription>Completa el formulario para registrarte</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nombre completo</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="role">Rol</Label>
                            <Select onValueChange={(value) => handleChange("role", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="developer">Developer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="avatar">URL del Avatar</Label>
                            <Input
                                id="avatar"
                                type="url"
                                placeholder="https://ejemplo.com/avatar.jpg"
                                value={formData.avatar}
                                onChange={(e) => handleChange("avatar", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                            <Button type="submit" className="flex-1 min-w-[120px]">
                                Registrarse
                            </Button>
                            <Button
                                type="button"
                                className="flex-1 min-w-[120px] bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => router.push("/login")}
                            >
                                Volver a Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
