const puppeteer = require('puppeteer');

// וודא בדפדפן שזו הכתובת המדויקת שפותחת את הדף!
const APP_URL = 'http://localhost:5500/src/sing-in-up/sign-in-up.html';

describe('Authentication E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
    page = await browser.newPage();
  }, 30000); // הגדלת זמן טעינת דפדפן

  afterAll(async () => {
    await browser.close();
  });

  test('Sign Up form submission', async () => {
    await page.goto(APP_URL, { waitUntil: 'networkidle2' });

    await page.waitForSelector('#register', { visible: true, timeout: 5000 });
    await page.click('#register');

    const signUpNameInput = '.sign-up input[name="userName"]';
    await page.waitForSelector(signUpNameInput, { visible: true });

    await page.type(signUpNameInput, 'User' + Math.floor(Math.random() * 1000));
    await page.type('.sign-up input[name="userEmail"]', `test${Date.now()}@test.com`);
    await page.type('.sign-up input[name="userPassword"]', '123456');

    let loggedSuccess = false;
    page.on('console', msg => {
      if (msg.text().includes('sing up successful')) loggedSuccess = true;
    });

    await page.click('.sign-up button[type="submit"]');
    
    await new Promise(r => setTimeout(r, 3000)); 
    expect(loggedSuccess).toBe(true);
  }, 30000); // הגדלת זמן הטסט ל-30 שניות

    test('Sign In form submission', async () => {
    // 1. ניצור משתמש חדש וייחודי כדי להשתמש בו בבדיקה
    const testEmail = `login_test_${Date.now()}@test.com`;
    const testPass = '123456';
    
    await page.goto(APP_URL, { waitUntil: 'networkidle2' });

    // 2. נעבור להרשמה ונרשום את המשתמש הזה
    await page.click('#register');
    await page.waitForSelector('.sign-up input[name="userName"]', { visible: true });
    await page.type('.sign-up input[name="userName"]', 'LoginTester');
    await page.type('.sign-up input[name="userEmail"]', testEmail);
    await page.type('.sign-up input[name="userPassword"]', testPass);
    await page.click('.sign-up button[type="submit"]');
    
    // נחכה רגע שההרשמה תסתיים בשרת
    await new Promise(r => setTimeout(r, 2000));

    // 3. עכשיו נעבור למסך ה-Sign In (נלחץ על הכפתור שמחזיר אותנו)
    await page.click('#login');
    await page.waitForSelector('.sign-in input[name="userEmail"]', { visible: true });

    // 4. נזין את הפרטים של המשתמש שכרגע יצרנו
    await page.type('.sign-in input[name="userEmail"]', testEmail);
    await page.type('.sign-in input[name="userPassword"]', testPass);

    // 5. נלחץ על כניסה ונחכה למעבר דף
    await Promise.all([
      page.click('.sign-in button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
          console.log("Navigation timeout - checking URL anyway");
      }),
    ]);

    // 6. בדיקה סופית שהגענו לדף הבית
    expect(page.url()).toContain('home-page.html');
  }, 40000); // הגדלנו ל-40 שניות כי יש פה הרשמה + התחברות
});
