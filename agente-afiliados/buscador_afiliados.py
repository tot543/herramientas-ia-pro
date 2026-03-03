import asyncio
import json
import re
import pandas as pd
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

# Cargar datos
def load_data():
    with open("mis_datos.json", "r", encoding="utf-8") as f:
        user_data = json.load(f)
    with open("ias_target.txt", "r", encoding="utf-8") as f:
        targets = [line.strip() for line in f.readlines() if line.strip()]
    return user_data, targets

# Palabras clave para buscar enlaces de afiliados
AFFILIATE_KEYWORDS = re.compile(
    r'(affiliate|partner|referral|ambassador|earn\s*money|afiliado)', 
    re.IGNORECASE
)

async def find_affiliate_link(page, base_url):
    """Busca un enlace de afiliado en la página actual."""
    print(f"Buscando enlace de afiliados en {base_url}...")
    
    # 1. Buscar en todos los enlaces
    links = await page.eval_on_selector_all("a", "elements => elements.map(el => ({text: el.innerText.trim(), href: el.href}))")
    
    for link in links:
        text = link.get('text', '') or ''
        href = link.get('href', '') or ''
        
        # Filtros heurísticos
        if AFFILIATE_KEYWORDS.search(text) or AFFILIATE_KEYWORDS.search(href):
            # Filtrar enlaces irrelevantes que puedan tener palabras parecidas
            if 'support' not in href.lower() and 'privacy' not in href.lower():
                 print(f"  Encontrado posible enlace: '{text}' -> {href}")
                 return href
                 
    # 2. Si falla, intentar buscar usando selectores específicos de footer
    try:
        footer_links = await page.eval_on_selector_all("footer a", "elements => elements.map(el => ({text: el.innerText.trim(), href: el.href}))")
        for link in footer_links:
            text = link.get('text', '') or ''
            href = link.get('href', '') or ''
            if AFFILIATE_KEYWORDS.search(text) or AFFILIATE_KEYWORDS.search(href):
                 print(f"  Encontrado enlace en footer: '{text}' -> {href}")
                 return href
    except Exception as e:
        pass
        
    return None

async def fill_form(page, user_data):
    """Intenta rellenar el primer formulario que encuentre usando heurística."""
    print("      Buscando formulario en la página de afiliados...")
    try:
        # Esperar un poco a que cargue el contenido dinámico
        await page.wait_for_timeout(3000)
        
        # Buscar todos los inputs del formulario
        inputs = await page.query_selector_all("input, textarea")
        
        if not inputs:
            print("      No se encontraron campos de formulario normales. Puede ser un iframe (ej. Typeform) o protecciones.")
            return False, "Not Found (Posible IFrame/Typeform)"

        filled_fields = 0
        
        for input_el in inputs:
            is_visible = await input_el.is_visible()
            is_enabled = await input_el.is_enabled()
            if not is_visible or not is_enabled:
                continue

            input_type = await input_el.get_attribute("type")
            input_name = await input_el.get_attribute("name") or ""
            input_id = await input_el.get_attribute("id") or ""
            input_placeholder = await input_el.get_attribute("placeholder") or ""
            
            combined_identifier = f"{input_name} {input_id} {input_placeholder}".lower()
            tag_name = await page.evaluate("el => el.tagName", input_el)

            try:
                if 'email' in combined_identifier or input_type == 'email':
                    await input_el.fill(user_data["email_contacto"])
                    filled_fields += 1
                elif any(word in combined_identifier for word in ['name', 'nombre', 'first']):
                    await input_el.fill(user_data["nombre"])
                    filled_fields += 1
                elif any(word in combined_identifier for word in ['url', 'site', 'website', 'web']):
                    await input_el.fill(user_data["url_mi_web"])
                    filled_fields += 1
                elif tag_name.lower() == 'textarea' or 'how' in combined_identifier or 'promote' in combined_identifier:
                    await input_el.fill(user_data["texto_promocion_ingles"])
                    filled_fields += 1
            except Exception as e:
                print(f"      Error llenando campo {input_name}: {e}")
                
        if filled_fields > 0:
            print(f"      Se rellenaron {filled_fields} campos. Buscando botón de envío...")
            # Intento de submit
            submit_buttons = await page.query_selector_all("button[type='submit'], input[type='submit'], button:has-text('Submit'), button:has-text('Apply'), button:has-text('Join')")
            
            if submit_buttons:
                for btn in submit_buttons:
                    if await btn.is_visible() and await btn.is_enabled():
                        print("      Clicando botón Submit!")
                        await btn.click()
                        await page.wait_for_timeout(3000) # Esperar a ver si hay redirección o error
                        return True, "Formulario Rellenado y Enviado"
            
            return False, f"Se llenaron {filled_fields} campos pero no se encontró botón Submit."
        else:
            return False, "No se encontraron campos reconocibles."
            
    except Exception as e:
        return False, f"Error interactuando con formulario: {str(e)}"

async def process_target(page, target, user_data):
    result = {
        "Target URL": target,
        "Affiliate URL": "Not Found",
        "Status": "Failed",
        "Reason": ""
    }
    
    try:
        print(f"\n[{target}] Navegando a la página principal...")
        response = await page.goto(target, wait_until="domcontentloaded", timeout=30000)
        
        # Superar posibles interstitials o popups iniciales esperando
        await page.wait_for_timeout(2000)
        
        affiliate_url = await find_affiliate_link(page, target)
        
        if affiliate_url:
            # Asegurar que es URL absoluta
            affiliate_url = urljoin(target, affiliate_url)
            result["Affiliate URL"] = affiliate_url
            
            print(f"[{target}] Navegando a la página de afiliados: {affiliate_url}")
            await page.goto(affiliate_url, wait_until="domcontentloaded", timeout=30000)
            
            success, reason = await fill_form(page, user_data)
            
            if success:
                result["Status"] = "Success"
                result["Reason"] = reason
            else:
                result["Status"] = "Partial/Failed"
                result["Reason"] = reason
        else:
            result["Reason"] = "No se encontró enlace de afiliados"
            
    except PlaywrightTimeoutError:
         print(f"[{target}] Timeout cargando la página.")
         result["Reason"] = "Timeout"
    except Exception as e:
         print(f"[{target}] Error inesperado: {e}")
         result["Reason"] = f"Error: {str(e)[:50]}..."
         
    return result

async def main():
    user_data, targets = load_data()
    results = []
    
    async with async_playwright() as p:
        # User agent realista
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        
        # HEADLESS=FALSE PARA VER CÓMO TRABAJA VISUALMENTE
        browser = await p.chromium.launch(headless=False, slow_mo=500)
        context = await browser.new_context(
            user_agent=user_agent,
            viewport={'width': 1280, 'height': 800},
            ignore_https_errors=True
        )
        
        page = await context.new_page()
        
        for target in targets:
            # Asegurar https
            if not target.startswith("http"):
                target = "https://" + target
                
            res = await process_target(page, target, user_data)
            results.append(res)
            
            # Pausa entre peticiones para ser más humano
            await page.wait_for_timeout(2000)
            
        await browser.close()
        
    # Guardar en CSV
    df = pd.DataFrame(results)
    df.to_csv("resultados_aplicacion.csv", index=False)
    print("\nProceso terminado. Resultados guardados en resultados_aplicacion.csv")

if __name__ == "__main__":
    asyncio.run(main())
