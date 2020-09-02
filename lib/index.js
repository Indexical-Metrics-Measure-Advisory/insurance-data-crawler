const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--proxy-server=http://127.0.0.1:1087'] });
    const page = await browser.newPage();
    insurance_domain_data = {}

    for (let i = 1; i <= 3; i++) {
        await page.goto('https://www.abi.org.uk/data-and-resources/tools-and-resources/glossary/?p=' + i);



        const results = await page.$x("/html/body/div/main/div/div/div[2]/div[2]/dl/dt")

        const descs = await page.$x("/html/body/div/main/div/div/div[2]/div[2]/dl/dd")

        // results[0]
        // data = await (await results[0].getProperty('innerHtml')).jsonValue();



        for (const index in results) {
            const label = await page.evaluate(el => el.textContent, results[index]);
            const desc = await page.evaluate(el => el.textContent, descs[index]);
            const field_name = label.replace("Open", "")
            insurance_domain_data[field_name] = desc
        }


    }

    // console.log(insurance_domain_data)


    let data = JSON.stringify(insurance_domain_data);
    fs.writeFileSync('insurance-data.json', data);

    // await page.screenshot({ path: 'example.png' });

    await browser.close();
})();