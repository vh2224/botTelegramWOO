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
    console.log(error.resposta.data);
});