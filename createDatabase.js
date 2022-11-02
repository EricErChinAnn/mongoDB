db.sales.find({
    $and: [
        { "couponUsed": false },
        {"items.name":"envelopes"},
        {"items.quantity":{"$gt":8}}
    ]
}, {
    "storeLocation": 1,
    "items": 1,
    "couponUsed": 1
})






db.accounts.find({
    "limit":{"$gt":1000},
    "products":
    {$all:["InvestmentFund","InvestmentStock"]}
    
},{
"account_id":1,
"products":1,
"limit":1
})