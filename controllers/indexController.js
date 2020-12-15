const mercadopago = require('mercadopago');
const { 
  EXERC_ACCESS_TOKEN, 
  EXERC_INTEGRATOR_ID, 
  MERCADOPAGO_REDIRECT_URL, 
  MERCADOPAGO_NOTIFICATION_URL,
  HOST_URL } = require('../utils/constants');
  
mercadopago.configure({
  access_token: EXERC_ACCESS_TOKEN,
  integrator_id: EXERC_INTEGRATOR_ID
});

module.exports = {
  home: (req, res) => {
    res.render('home');
  },
  detail: (req, res) => {
    res.render('detail', req.query);
  },
  buy: (req, res) => {
    const item = {
      id: '1234',
      picture_url: `${HOST_URL}${req.body.img}`,
      title: req.body.title,
      description: 'Dispositivo móvil de Tienda e-commerce',      
      unit_price: Number(req.body.price),
      quantity: 1
    }
    const preference = {
      back_urls: {
        success: `${MERCADOPAGO_REDIRECT_URL}success`,
        pending: `${MERCADOPAGO_REDIRECT_URL}pending`,
        failure: `${MERCADOPAGO_REDIRECT_URL}failure`
      },
      notification_url: MERCADOPAGO_NOTIFICATION_URL,
      auto_return: 'approved',      
      payer: {
        name:'Lalo',
        surname: 'Landa',
        email: 'test_user_63274575@testuser.com',
        phone: {
          area_code: '11',
          number: 22223333
        },
        adress: {
          zip_code: '1111',
          street_name: 'False',
          street_number: 123
        }
      },
      items: [item],
      payment_methods: {
        installments: 6, 
        excluded_payment_types: [
          { 
            id: 'atm'
          }
        ],
        excluded_payment_methods: [
          { 
            id: 'amex' 
          }
        ]
      },
      external_reference: 'leandrocorbalan88@hotmail.com'
    }
    mercadopago.preferences.create(preference)
    .then(response => {
      global.init_point = response.body.init_point
      res.render('confirm', { init_point: response.body.init_point })
    })
    .catch(err => {
      console.error(err)
      res.send('error')
    })
  },
  mercadopagoRedirect: (req, res) => {
    if (req.query.status.includes('success')) {
        return res.render('success', {
            payment_type: req.query.payment_type, 
            external_reference: req.query.external_reference,
            collection_id: req.query.collection_id
        })
    }
    if (req.query.status.includes('pending')) {
        return res.render('pending')
    }
    if (req.query.status.includes('failure')) {
        return res.render('failure')
    }
    return res.status(404).end()
  },
  mercadopagoNotification: (req, res) => {
      console.log(req.body);
      res.status(200).end('Ok');
  },
  
}