const Telegraf = require('telegraf');
const { get } = require('http');
const WooCommerceAPI = require("@woocommerce/woocommerce-rest-api").default;
const axios = require('axios');
require('dotenv').config();

const botTelegram = new Telegraf(process.env.BOT_TOKEN)
const url_site = process.env.URL_SITE
const ck_token = process.env.CK_TOKEN
const cs_token = process.env.CS_TOKEN

botTelegram.start(ctx => {
    const user = ctx.update.message.from.id
    ctx.reply('Por Favor senhor, digite o numero do seu pedido')
    console.log(user)
});

botTelegram.on('text', async(ctx) => {
    const idPedido = ctx.update.message.text
    axios.get(`${url_site}/wp-json/wc/v3/orders/${idPedido}/?consumer_key=${ck_token}&consumer_secret=${cs_token}`).then(resposta => {
        console.log(`Seu pedido é o: ${resposta.data.id}`);
        console.log(`total do seu pedido deu: ${resposta.data.total} R$`);
        console.log(`o email do seu pedido é ${resposta.data.billing.email}`);
        console.log(`metodo de pagamento escolhido foi: ${resposta.data.payment_method_title}`);
        ctx.reply(`
        Seu pedido é o: ${resposta.data.id}
total do seu pedido deu: ${resposta.data.total} R$
o email do seu pedido é ${resposta.data.billing.email}
metodo de pagamento escolhido foi: ${resposta.data.payment_method_title}`)

    }).catch((error) => {
        console.log(error.response.data);
    });

});


botTelegram.startPolling()