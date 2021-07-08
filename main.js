const puppeteer = require('puppeteer');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const countdown = new Spinner('Testing...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
const chalk = require('chalk');


const pageTesting = 'https://www.amazon.fr/PlayStation-%C3%89dition-Standard-DualSense-Couleur/dp/B08H93ZRK9/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=ps5&qid=1625561810&sr=8-1'


const app = {
    init: async () => {
        countdown.start();

        // Step 1
        countdown.message(chalk.blue('1 / 4 : Connect to Amazon.fr...'));
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(pageTesting);

        // Step 2
        countdown.message(chalk.blue('2 / 4 : Accepting cookies...'));
        await page.click('#sp-cc-accept');

        // Step 3
        countdown.message(chalk.blue('3 / 4 : Check if the add to cart button is present...'));
        const addToCartButton = await page.$('#add-to-cart-button');
        if (!addToCartButton) {
            countdown.message(chalk.red('This product is currently unavailable. Press Ctrl+C to exit`'));
        }

        // Step 4
        countdown.message(chalk.blue('4 / 4 : Try to click on the add to cart button...'));
        await page.click('#add-to-cart-button');
        if (page.url() === pageTesting) {
            countdown.message(chalk.red('Add to Cart Button cannot be pressed. Press Ctrl+C to exit`'));
        }
    }
}

app.init()



// const puppeteer = require('puppeteer');

// (async () => {
//       const browser = await puppeteer.launch({
//         headless: false
//       });
//       const page = await browser.newPage();
//       await page.goto('https://www.amazon.fr/PlayStation-%C3%89dition-Standard-DualSense-Couleur/dp/B08H93ZRK9/ref=sr_1_1?dchild=1&keywords=ps5&qid=1625565061&sr=8-1');
//       await page.screenshot({
//         path: 'example.png'
//       });

//       // Accepter les cookies
//       await page.click('#sp-cc-accept');
//       let panier = await page.click('#add-to-cart-button',{ delay: 2000 ,clickcount : 5});
//       for (let index = 0; index <= 5; index++, setInterval=2000) {
//         if (panier != null){
//           await page.click('#add-to-cart-button',{ delay: 2000 ,clickcount : 5});
//         }else{
//           await page.click('#add-to-cart-button',{ delay: 2000 ,clickcount : 5});
//           page.reload('https://www.amazon.fr/PlayStation-%C3%89dition-Standard-DualSense-Couleur/dp/B08H93ZRK9/ref=sr_1_1?dchild=1&keywords=ps5&qid=1625565061&sr=8-1',{ delay: 20000 });
//           console.log('page rechargé ');
//         }
        
//       }







      // const result = await page.evaluate(() => {
      //   const refresh = ()=>{
      //     page.goto('https://www.amazon.fr/PlayStation-%C3%89dition-Standard-DualSense-Couleur/dp/B08H93ZRK9/ref=sr_1_1?dchild=1&keywords=ps5&qid=1625565061&sr=8-1');
          
      //   }
      //   return document.getElementById('#add-to-cart-button');
        

      // })
    // })()