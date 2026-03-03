import { NextRequest, NextResponse } from "next/server";

// Forzar evaluación dinámica (no pre-render en build)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validación server-side
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Email inválido." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("RESEND_API_KEY no configurada");
            return NextResponse.json(
                { error: "Servicio de suscripción no configurado." },
                { status: 500 }
            );
        }

        // Importar Resend dinámicamente para evitar error en build sin API key
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);

        const audienceId = process.env.RESEND_AUDIENCE_ID;

        // Opción 1: Usar Resend Contacts (Audiences) — gestión de contactos nativa
        if (audienceId) {
            await resend.contacts.create({
                email,
                audienceId,
                unsubscribed: false,
            });

            return NextResponse.json(
                { message: "¡Suscripción exitosa! Bienvenido a Blueprint Ops." },
                { status: 200 }
            );
        }

        // Opción 2: Si no hay audiencia configurada, enviar email de bienvenida directo
        await resend.emails.send({
            from: "Blueprint Ops <onboarding@midirectorioia.com>",
            to: email,
            subject: "🎉 Bienvenido a Blueprint Ops — Tu primer Blueprint te espera",
            html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-weight: bold; font-size: 18px; width: 48px; height: 48px; line-height: 48px; border-radius: 12px;">B</div>
            <h1 style="color: #111827; font-size: 24px; margin-top: 16px;">¡Bienvenido a Blueprint Ops!</h1>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Gracias por suscribirte. Cada semana recibirás un <strong>Blueprint operativo</strong> nuevo: 
            flujos de IA paso a paso con prompts reales y herramientas probadas.
          </p>
          
          <div style="background: #f3f4f6; border-radius: 16px; padding: 24px; margin: 24px 0;">
            <p style="color: #374151; font-size: 14px; font-weight: 600; margin-bottom: 8px;">📋 Mientras tanto, explora:</p>
            <a href="https://midirectorioia.com/blog/" style="color: #6366f1; font-weight: 600; text-decoration: none; font-size: 14px;">
              → Ver todos los Blueprints disponibles
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">
            Puedes darte de baja en cualquier momento. Sin spam, lo prometemos.
          </p>
        </div>
      `,
        });

        return NextResponse.json(
            { message: "¡Suscripción exitosa! Revisa tu bandeja de entrada." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en suscripción:", error);
        return NextResponse.json(
            { error: "Hubo un error al procesar tu suscripción. Intenta de nuevo." },
            { status: 500 }
        );
    }
}
