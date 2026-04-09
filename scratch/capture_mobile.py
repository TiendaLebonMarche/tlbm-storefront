from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile Device (iPhone 12)
        iphone_12 = p.devices['iPhone 12']
        context = browser.new_context(**iphone_12)
        page = context.new_page()
        page.goto('http://localhost:8000')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000) # Wait for animations
        page.screenshot(path='c:/tiendalebonmarche/tlbm-storefront/artifacts/mobile_hero.png')
        browser.close()

if __name__ == '__main__':
    run()
