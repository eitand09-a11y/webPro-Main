const puppeteer = require('puppeteer');

// הכתובת שהשרת שלך מגיש (ללא /client/ כי הגדרת static על התיקייה הזו)
const APP_URL = 'http://localhost:5500/src/sing-in-up/sign-in-up.html';

describe('Authentication E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      slowMo: 50, // עוזר לראות מה קורה אם משנים ל-false
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Sign In form submission', async () => {
    const testEmail = `test_${Date.now()}@test.com`;
    const testPass = '123456';

    await page.goto(APP_URL, { waitUntil: 'networkidle2' });

    // שלב 1: הרשמה (כדי שיהיה משתמש להתחבר איתו)
    await page.click('#register');
    await page.waitForSelector('.sign-up input[name="userName"]', { visible: true });
    await page.type('.sign-up input[name="userName"]', 'Tester');
    await page.type('.sign-up input[name="userEmail"]', testEmail);
    await page.type('.sign-up input[name="userPassword"]', testPass);
    await page.click('.sign-up button[type="submit"]');

    // מחכים שהשרת יחזיר תשובה חיובית (נניח 2 שניות)
    await new Promise(r => setTimeout(r, 2000));

    // שלב 2: התחברות
    await page.click('#login');
    await page.waitForSelector('.sign-in input[name="userEmail"]', { visible: true });
    await page.type('.sign-in input[name="userEmail"]', testEmail);
    await page.type('.sign-in input[name="userPassword"]', testPass);

    // לחיצה ומעבר דף
    await Promise.all([
      page.click('.sign-in button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {
          console.log("Navigation timeout - verify if URL changed");
      }),
    ]);

    expect(page.url()).toContain('home-page.html');
  }, 60000);
});
