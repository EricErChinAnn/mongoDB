# All companies founded in the year 2006
```
db.companies.find({
    "founded_year":2006
},{
    "name":1,
    "founded_year":1
})
```
# All companies founded after the year 2000
```
db.companies.find({
    "founded_year":{
        $gt:2000
    }
},{
    "name":1,
    "founded_year":1
})
```
# All companies founded between the year 1900 and 2010
```
db.companies.find({
    "founded_year":{
        $gte:1900,
        $lte:2010
    }
},{
    "name":1,
    "founded_year":1
})
```

# All companies with valuation amount higher than 100 million
```
db.companies.find({
    "ipo.valuation_amount":{
            $gt:100000000
    }
},{
    "name":1,
    "ipo.valuation_amount":1,
    "ipo.valuation_currency_code":1
})
```
# All companies with valuation amount higher than 100 million and with the currency being 'USD'
```
db.companies.find({
    $and:[
    {"ipo.valuation_amount":{
            "$gt":100000000
    }},{
        "ipo.valuation_currency_code":"USD"
    }
]

},{
    "name":1,
    "ipo.valuation_amount":1,
    "ipo.valuation_currency_code":1
})
```

# Use the inspections collection from the sample_training database for the questions below
# Find all businesses which has violations issued
```
db.inspections.find({
    "result":"Violation Issued"
},{
    "business_name":1,
})
```

# Find all business which has violations, and are in the city of New York.
```
db.inspections.find({
    "address.city": {
        "$regex":"New York",
        "$options":"i"
    },
    "result":"Violation Issued"
},{
    "business_name":1,
    "address.city":1,
    "result":1
})
```

# Count how many businesses there in the city of New York
```
db.inspections.count({
    "address.city": {
        "$regex":"New York",
        "$options":"i"
    }
})
```
# Count how many businesses there are in the city of Ridgewood and does not have violations (hint: google for "not equal" in Mongo)
```
db.inspections.count({
    "address.city":"RIDGEWOOD",
    "result":{$ne:"Violation Issued"}
})
```

# Use the accounts document from the sample_analytics database and answer the following questions:
# Find all accounts that have the InvestmentStock product
```
db.accounts.find({
    "products":"InvestmentStock",
},{
    "account_id":1,
    "products":1
})
```
# Find all accounts that have both the Commodity and InvestmentStock product
```
db.accounts.find({
    "products":{$all:["InvestmentStock","Commodity"]}
},{
    "account_id":1,
    "products":1
})
```
# Find all accounts that have either Commodity OR CurrencyService product
```
db.accounts.find({
    $or:[
        {"products":"CurrencyService"},
        {"products":"Commodity"}
    ]
},{
    "account_id":1,
    "products":1
})
```
# Find all accounts that does not have CurrencyService product
```
db.accounts.find({
    "products":{$ne:"CurrencyService"}
},{
    "account_id":1,
    "products":1
})
```
# Find all products have a limit of more than 1000, and offer both InvestmentStock and InvestmentFund products
```
db.accounts.find({
    $and:[
        {"limit":{$gt:1000}},
        {"products":"InvestmentFund"},
        {"products":"InvestmentStock"}
    ]
},{
    "account_id":1,
    "products":1,
    "limit":1
})
```

# Use the sales collection from the sample_supplies and answer the following questions:
# Show the items sold from the stores at Denver and Seattle.
```
db.sales.find({
    $or:[
        {"storeLocation":"Denver"},
        {"storeLocation":"Seattle"}
    ]
},{
    "storeLocation":1
})
```
# Show the items sold from the stores at Denver and where the customer's satisfaction is at least 3.
```
db.sales.find({
    $and:[
        {"storeLocation":"Denver"},
        {"customer.satisfaction":{$gte:3}}
    ]
},{
    "storeLocation":1,
    "customer.satisfaction":1
})
```
# Show all onlines sales made at Denver and sales made through phone at Seattle
```
db.sales.find({
    $and:[
        {"storeLocation":"Seattle"},
        {"purchaseMethod":"Phone"}
    ]
},{
    "storeLocation":1,
    "purchaseMethod":1
})
```
# Show all sales that does not use a coupon
```
db.sales.find({
    "couponUsed":false
},{
    "storeLocation":1,
    "purchaseMethod":1,
    "couponUsed":1
})
```
# Show all envelopes sales where more than 8 envelopes are sold and no coupon are used.
```

```
