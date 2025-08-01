import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-fondo" >
      <div className="w-full max-w-md text-center space-y-6 bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800">
          Sistema de gestión de proyectos.
        </h1>

        <p className="text-gray-600 text-sm md:text-base">
          Bienvenido. Por favor, inicia sesión o regístrate.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" >
            <Button className="w-full sm:w-auto" variant="default">
              Iniciar Sesión
            </Button>
          </Link>

          <Link href="/register" >
            <Button className="w-full sm:w-auto" variant="outline">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
