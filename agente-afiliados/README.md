# Auto-Afiliador de IA Bot

Este bot automatizado busca programas de afiliados de herramientas de Inteligencia Artificial y automáticamente intenta rellenar los formularios de aplicación.

## Requisitos

- Python 3.9 o superior
- Google Chrome instalado

## Instalación

1. Clona el repositorio o navega a la carpeta principal:
```bash
cd agente-afiliados
```

2. Crea y activa un entorno virtual (opcional pero recomendado):
```bash
python -m venv venv
.\venv\Scripts\activate
```

3. Instala las dependencias necesarias:
```bash
pip install -r requirements.txt
playwright install chromium
```

## Configuración

1. Modifica el archivo **`mis_datos.json`** con tus datos de contacto reales y el texto sobre cómo planeas promocionar los productos.
2. Modifica el archivo **`ias_target.txt`** agregando (una por línea) las URLs completas (incluyendo `https://`) de las IAs a las que deseas aplicar.

## Uso

Para ejecutar el bot, simplemente corre el siguiente comando:

```bash
python buscador_afiliados.py
```

Al terminar, los resultados de la automatización se guardarán en un archivo CSV llamado `resultados_aplicacion.csv`.

## Notas sobre el Bot ("Best-Effort")

Este script está configurado para ejecutarse de manera asíncrona. Emplea expresiones regulares heurísticas tanto para encontrar los posibles enlaces en los *footers* ("Affiliates", "Partners", etc.), como para iterar sobre los elementos `<input>` tratando de coincidir el tipo de registro solicitado (Email, Name, URL, Description) en base a atributos HTML típicos.

*Aviso: Es normal que el bot falle localizando o enviando formularios complejos (Typeform, iFrames) o aquellos con barreras Anti-Bot pesadas (CloudFlare dDoS blocks). Esas webs requerirán aplicación manual (para lo cual el script también guardará la URL del formulario de registro, para facilitarte la tarea).*
