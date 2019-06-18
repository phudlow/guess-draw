
let browser;
beforeAll(async () => {
    browser = await require('puppeteer').launch({
        headless: false,
        executablePath: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    });
});

const firstNickName  = 'Billy';
const secondNickName = 'Jonana291';

// === //
// e2e //
// === //
test('Cannot submit a blank nickname.', async () => {
    const inputSel  = '#welcome form input';

    const page = await browser.newPage();
    await page.goto('localhost:3000');

    // Input is blank
    expect(await page.$eval(inputSel, el => el.value)).toBe("");

    // Submit
    await page.keyboard.press('Enter');

    // Welcome page is still showing
    expect(await page.$('#games-browser')).toBeNull();
    expect(await page.$('#welcome')).toBeTruthy();

    // Input is focused
    const focusedElHandle = await page.evaluateHandle(() => document.activeElement)
    expect(await page.evaluate(el => el === document.activeElement, focusedElHandle)).toBe(true);

    browser.close();
});