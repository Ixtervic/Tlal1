<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = mb_strtolower($request->input('message'));

        $reply = $this->generateReply($userMessage);

        return response()->json([
            'reply' => $reply,
        ]);
    }

private function generateReply(string $message): string
{
    // Normalizamos texto
    $msg = mb_strtolower($message);

    // === SALUDOS ===
    if (str_contains($msg, 'hola') || str_contains($msg, 'buenas') || str_contains($msg, 'hey')) {
        return '¡Hola! 👋 Soy TlalliBot. Puedo ayudarte con temas de agricultura sustentable y con la navegación dentro de la plataforma.';
    }

    // ==========================
    //  BLOQUE: NAVEGACIÓN APP
    // ==========================

    // Ver cursos disponibles
    if (
        (str_contains($msg, 'ver cursos') || str_contains($msg, 'lista de cursos')) ||
        (str_contains($msg, 'dónde') && str_contains($msg, 'cursos')) ||
        (str_contains($msg, 'donde') && str_contains($msg, 'cursos'))
    ) {
        return "Para ver los cursos disponibles, dirígete a la sección “Cursos” en el menú principal.\nAhí podrás ver la lista de cursos sobre producción agrícola sustentable y entrar al detalle de cada uno. 🌱";
    }

    // Cómo inscribirse a un curso
    if (
        str_contains($msg, 'inscrib') || // inscribir, inscribirme, inscripción
        str_contains($msg, 'registrarme a un curso') ||
        str_contains($msg, 'apuntarme a un curso')
    ) {
        return "Para inscribirte a un curso:\n1️⃣ Ve a la sección “Cursos”.\n2️⃣ Elige el curso que te interese.\n3️⃣ Dentro de la página del curso, da clic en el botón “Inscribirme” o similar.\nSi ya estás inscrito, normalmente verás un botón para continuar con el curso. ✅";
    }

    // Mis cursos / progreso
    if (
        str_contains($msg, 'mis cursos') ||
        str_contains($msg, 'mi progreso') ||
        str_contains($msg, 'qué cursos estoy tomando') ||
        str_contains($msg, 'que cursos estoy tomando')
    ) {
        return "Para ver tus cursos activos o tu progreso, entra a la sección “Mis cursos” (o similar en el menú).\nAhí podrás revisar en qué módulo vas y retomar tus clases fácilmente. 📚";
    }

    // Navegación: perfil / configuración
    if (
        str_contains($msg, 'perfil') ||
        str_contains($msg, 'configuración de cuenta') ||
        str_contains($msg, 'editar mi nombre') ||
        str_contains($msg, 'editar mi correo')
    ) {
        return "Para editar tu perfil:\n1️⃣ Ve a la sección “Settings” o “Configuración”.\n2️⃣ Entra a “Profile”.\nAhí podrás actualizar tu nombre, correo y otros datos de tu cuenta. 👤";
    }

    // Cambiar contraseña
    if (
        str_contains($msg, 'cambiar contraseña') ||
        str_contains($msg, 'olvidé mi contraseña') ||
        str_contains($msg, 'olvide mi contraseña') ||
        str_contains($msg, 'password')
    ) {
        return "Para cambiar tu contraseña:\n1️⃣ Ve a Settings → Password.\n2️⃣ Ingresa tu contraseña actual y la nueva.\n3️⃣ Guarda los cambios.\nSi olvidaste tu contraseña al iniciar sesión, usa la opción de “Olvidé mi contraseña” en la pantalla de login. 🔐";
    }

    // Apariencia / tema oscuro
    if (
        str_contains($msg, 'tema oscuro') ||
        str_contains($msg, 'dark mode') ||
        str_contains($msg, 'modo oscuro') ||
        (str_contains($msg, 'apariencia') && str_contains($msg, 'cambiar'))
    ) {
        return "Para cambiar la apariencia de la aplicación (por ejemplo, activar el tema oscuro):\n1️⃣ Ve a Settings → Appearance.\n2️⃣ Elige el tema que prefieras (claro/oscuro).\n3️⃣ Guarda los cambios si es necesario. 🌓";
    }

    // Navegación genérica / estoy perdido
    if (
        str_contains($msg, 'no encuentro') ||
        str_contains($msg, 'dónde está') ||
        str_contains($msg, 'donde está') ||
        str_contains($msg, 'me perdí') ||
        str_contains($msg, 'no sé dónde')
    ) {
        return "Parece que hay algo que no encuentras 🤔.\nTe recomiendo revisar el menú principal y la sección “Cursos”, “Mis cursos” o “Settings” según lo que busques.\nSi me dices exactamente qué sección quieres abrir (por ejemplo: cursos, mis cursos, perfil, contraseña), te explico paso a paso cómo llegar. 🧭";
    }

    // ================================
    //  BLOQUE: AGRICULTURA SUSTENTABLE
    // ================================

    // ¿Qué es agricultura sustentable?
    if (
        str_contains($msg, 'qué es la agricultura sustentable') ||
        (str_contains($msg, 'agricultura') && str_contains($msg, 'sustentable')) ||
        str_contains($msg, 'agricultura sostenible')
    ) {
        return "La agricultura sustentable es un enfoque de producción que busca proteger el ambiente, mantener la salud del suelo, ahorrar recursos como agua y energía, y producir alimentos de manera responsable.\nSu objetivo es asegurar que podamos cultivar hoy sin comprometer la capacidad de las futuras generaciones. 🌱🌎";
    }

    // Beneficios de la agricultura sustentable
    if (
        (str_contains($msg, 'beneficios') && str_contains($msg, 'agricultura')) ||
        str_contains($msg, 'para qué sirve la agricultura sustentable') ||
        str_contains($msg, 'para que sirve la agricultura sustentable')
    ) {
        return "Algunos beneficios de la agricultura sustentable son:\n• Suelos más fértiles y saludables\n• Mejor uso y ahorro del agua\n• Menos uso de químicos tóxicos\n• Mayor biodiversidad\n• Producción más económica y eficiente\n• Cultivos más resistentes a plagas y cambios climáticos\nEs un modelo que cuida tanto a las personas como al planeta 🌍💚.";
    }

    // Técnicas de agricultura sustentable
    if (
        (str_contains($msg, 'técnicas') || str_contains($msg, 'tecnicas') || str_contains($msg, 'prácticas') || str_contains($msg, 'practicas')) &&
        str_contains($msg, 'sustentable')
    ) {
        return "Algunas técnicas comunes de agricultura sustentable son:\n• Rotación de cultivos\n• Compostaje\n• Agricultura orgánica\n• Riego eficiente (por goteo, por ejemplo)\n• Control biológico de plagas\n• Policultivos\n• Conservación del suelo con cubiertas vegetales\nEstas prácticas ayudan a mejorar la productividad sin dañar el entorno 🌾.";
    }

    // Suelos y fertilidad
    if (
        str_contains($msg, 'cómo mejorar el suelo') ||
        str_contains($msg, 'como mejorar el suelo') ||
        str_contains($msg, 'fertilidad del suelo') ||
        str_contains($msg, 'mejorar mi tierra') ||
        str_contains($msg, 'suelo sano')
    ) {
        return "Para mejorar la fertilidad del suelo puedes:\n• Aplicar compost y materia orgánica\n• Usar rotación de cultivos\n• Mantener cubiertas vegetales\n• Evitar arar en exceso\n• No usar químicos en exceso\nUn suelo sano produce cultivos más fuertes y nutritivos 🌱.";
    }

    // Agua y riego
    if (str_contains($msg, 'riego') || str_contains($msg, 'agua')) {
        return "En agricultura sustentable se recomienda:\n• Usar riego por goteo para ahorrar agua\n• Regar en horas de menor sol (mañana/tarde)\n• Recolectar agua de lluvia\n• Mantener cobertura en el suelo para reducir evaporación\nEstas técnicas pueden reducir significativamente el consumo de agua 💧.";
    }

    // Plagas
    if (str_contains($msg, 'plaga') || str_contains($msg, 'control de plagas')) {
        return "La agricultura sustentable prefiere métodos ecológicos, como:\n• Control biológico (usar insectos benéficos)\n• Plantas repelentes o asociadas\n• Manejo integrado de plagas\n• Mantener el suelo y las plantas saludables\nAsí se reduce el uso de pesticidas químicos dañinos 🐞🌿.";
    }

    // Cursos específicos (ejemplo)
    if (str_contains($msg, 'curso') && str_contains($msg, 'semillas')) {
        return 'El curso de semillas enseña selección, conservación y manejo de semillas para una producción sustentable 🌱. Puedes buscarlo en la sección de Cursos.';
    }

  

    // === RESPUESTA GENÉRICA ===
    return "Puedo ayudarte con temas como:\n• Navegación en la plataforma (cursos, mis cursos, perfil, contraseña, apariencia)\n• Agricultura sustentable y prácticas ecológicas\n• Dudas generales sobre los cursos\n\nCuéntame: ¿quieres ayuda sobre la plataforma o sobre agricultura sustentable? 🌿🙂";
}


}
