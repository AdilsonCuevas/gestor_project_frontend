"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "../admin/users/user.api";
import { useForm } from "react-hook-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import Cookies from "js-cookie";

function Page() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const response = await loginApi(data);

        if (!response.backendTokens) {
            alert("credenciales invalidas");
        }
        Cookies.set("accessToken", response.backendTokens.accessToken, { expires: 1 });
        Cookies.set("refreshToken", response.backendTokens.refreshToken, { expires: 7 });

        return router.push("/admin/dashboard");
    });

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/691/170/464/fondos-de-pantalla-color-azul-abstract-wallpaper-preview.jpg')" }}
        >
            <Card className="w-full max-w-md bg-blue-100 shadow-lg rounded-xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC5jom4gOehCdYga_ifJSBeeshWUCVdWh7iw&s" alt="avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-blue-900">
                        Iniciar sesión
                    </CardTitle>
                    <CardDescription>
                        Asigna las credenciales de tu usuario en los campos siguientes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="username">Correo electrónico</Label>
                            <Input
                                id="username"
                                type="email"
                                placeholder="usuario@correo.com"
                                {...register("username")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("passwork")}
                            />
                        </div>
                        <div className="text-right text-sm">
                            <a href="/forgot" className="text-blue-700 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                            <Button type="submit" className="flex-1 min-w-[120px]">
                                Iniciar Sesion
                            </Button>
                            <Button
                                type="button"
                                className="flex-1 min-w-[120px] bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => router.push("/register")}
                            >
                                Registrarse
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Page;

