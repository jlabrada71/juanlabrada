Return url: http://juanlabrada.heroku.com/paymentaccepted


query

curl -v https://api.sandbox.paypal.com/v1/oauth2/token -H "Accept: application/json" -H "Accept-Language: en_US" -u "AfcSqEWnTBPSLbR7FjGUD2rctfWqSAZ3Np1THUDm9K22WRq8cMX8vLRdS_d2As1aRaMWM-y-t4nJZah4:ED35WN20VXBn0uGLzsx8sIb81LgKZdddY_j-QlPzHIsi-mX7vlDJnMGWQ-JHMt-fb1tl6ciRgZxorxO8" -d "grant_type=client_credentials"

response

{
  "scope":"https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/disputes/update-seller https://uri.paypal.com/services/payments/payment/authcapture openid https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/refund https://api.paypal.com/v1/vault/credit-card https://api.paypal.com/v1/payments/.* https://uri.paypal.com/payments/payouts https://api.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/applications/webhooks",
  "access_token":"A21AAGyc6ZTsYpGopr8ew9Nous52zWQrxVgaLHL7vpzo2U0R6Dq2zEwk38p2pNbwdEFOTsMlrvT5c-69fR1ZVCXYiYElzKY5Q",
  "token_type":"Bearer",
  "app_id":"APP-80W284485P519543T",
  "expires_in":32400,
  "nonce":"2020-08-03T22:24:20ZV_99teSDy9val6yg83Hca2MUTRaPXw-WnJxqfMfhzfE"
}

query

curl -v -X POST https://api.sandbox.paypal.com/v2/checkout/orders -H "Content-Type: application/json" -H "Authorization: Bearer A21AAGyc6ZTsYpGopr8ew9Nous52zWQrxVgaLHL7vpzo2U0R6Dq2zEwk38p2pNbwdEFOTsMlrvT5c-69fR1ZVCXYiYElzKY5Q" -d '{ "intent": "CAPTURE","purchase_units": [  {"amount": {"currency_code": "USD","value": "100.00"}}]}'

Response

{ "id":"883410793R6844437",
  "links":[
      {"href":"https://api.sandbox.paypal.com/v2/checkout/orders/883410793R6844437",
        "rel":"self",
        "method":"GET"},
      {"href":"https://www.sandbox.paypal.com/checkoutnow?token=883410793R6844437",
        "rel":"approve",
        "method":"GET"},
      {"href":"https://api.sandbox.paypal.com/v2/checkout/orders/883410793R6844437",
      "rel":"update",
      "method":"PATCH"},
      {"href":"https://api.sandbox.paypal.com/v2/checkout/orders/883410793R6844437/capture",
      "rel":"capture",
      "method":"POST"}
    ],
    "status":"CREATED"
  }


Query

  curl -v -X PATCH https://api.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T \
-H "Content-Type: application/json" \
-H "Authorization: Bearer Access-Token" \
-d '[
  {
"op": "replace",
"path": "/purchase_units/@reference_id=='PUHF'/shipping/address",
"value": {
  "address_line_1": "123 Townsend St",
  "address_line_2": "Floor 6",
  "admin_area_2": "San Francisco",
  "admin_area_1": "CA",
  "postal_code": "94107",
  "country_code": "US"
}
  }
]'


request

curl -v -X POST https://api.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T/authorize \
-H "Content-Type: application/json" \
-H "Authorization: Bearer Access-Token" \
-H "PayPal-Request-Id: 7b92603e-77ed-4896-8e78-5dea2050476a"

capture request
curl -v -X POST https://api.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T/capture \
-H "Content-Type: application/json" \
-H "Authorization: Bearer Access-Token" \
-H "PayPal-Request-Id: 7b92603e-77ed-4896-8e78-5dea2050476a"
