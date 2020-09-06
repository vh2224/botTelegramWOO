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
    ctx.reply('Por Favor, digite o numero do seu pedido')
});

botTelegram.on('text', async(ctx, next) => {
    const idPedido = ctx.update.message.text
    axios.get(`${url_site}/wp-json/wc/v3/orders/?consumer_key=${ck_token}&consumer_secret=${cs_token}`).then(resposta => {
        const item = resposta.data.find(item => item.id == idPedido)

        if (item.id) {
            if (item.status == 'on-hold') {
                ctx.reply(`
            Seu pedido é o: ${item.id}
total do seu pedido deu: ${item.total} R$
o email do seu pedido é ${item.billing.email}
metodo de pagamento escolhido foi: ${item.payment_method_title}`)
                if (item.payment_method == 'bacs') {
                    ctx.reply(`A conta para deposito é: 
Banco: Caixa Economica Federal
Agencia: 0100
Operação: 013
Conta Poupança: 0000000-0
Thiago Lindao
CPF: 000.000.000-00

Ao depositar, favor mandar o comprovante no telegram para @Sandrinnn`)
                } else {
                    ctx.reply(`
a Carteira bitcoin para ser enviado o bitcoin é: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

OBS: ao fazer a transação via bitcoin, favor adicionar na descrição do envio, o numero do seu pedido

ao fazer o envio do Bitcoin para nossa carteira, favor mandar mensagem para o telegram @Sandrinnn com a descrição que foi enviada o bitcoin`)
                }
            }
            if (item.status == 'processing') {
                ctx.reply(`
            Seu pedido é o: ${item.id}
total do seu pedido deu: ${item.total} R$
o email do seu pedido é ${item.billing.email}
metodo de pagamento escolhido foi: ${item.payment_method_title}`)
                if (item.payment_method == 'bacs') {
                    ctx.reply(`A conta para deposito é: 
Banco: Caixa Economica Federal
Agencia: 0100
Operação: 013
Conta Poupança: 0000000-0
Thiago Lindao
CPF: 000.000.000-00

Ao depositar, favor mandar o comprovante no telegram para @Sandrinnn`)
                } else {
                    ctx.reply(`
a Carteira bitcoin para ser enviado o bitcoin é: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

OBS: ao fazer a transação via bitcoin, favor adicionar na descrição do envio, o numero do seu pedido
                    
ao fazer o envio do Bitcoin para nossa carteira, favor mandar mensagem para o telegram @Sandrinnn com a descrição que foi enviada o bitcoin`)
                }
            } else if (item.status == 'completed') {
                ctx.reply(`Seu pedido já foi pago e esta sendo processado, por favor aguarde nosso contato para receber o seu produto.`)
            }

        }


    }).catch((error) => {
        console.log(error);
    });
    next()
});
botTelegram.startPolling()