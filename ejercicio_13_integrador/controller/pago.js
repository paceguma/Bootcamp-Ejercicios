const mercadopago = require('mercadopago')

// Agrega credenciales (ACCESS TOKEN - Del vendedor)
mercadopago.configure({
    access_token: 'TEST-2787063466007642-121811-4727fda725e7216d75f34eafe961e8d7-31875538',
});

console.log(' Configuración de SDK de mercadopago ok!')

const feedBack = (req,res) => {
    let infoPago = {
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	};

    res.redirect('/')
}

module.exports = {
    feedBack
}