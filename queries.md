# Showing Database
Demo commands related to database

# Show all Database
```
show databases
```

To set an active database
```
use sample_airbnb
```

To show all collection/data in the database

```
show collections
```


# Find a documents by your critera
* db - the selected database
* listingAndReviews - name of the collection
* .find() - to search for the results
* .pretty() - format is nicely
* .limit(n) - to find the n number of listing
```
db.listingsAndReviews.find().pretty().limit(5);
```

# Projections
Mean only wish to see what you want.
Only want to see name and bed
```
db.listingsAndReviews.find({},{
    "name":1,
    "beds":1
})
```
Name and price
```
db.listingsAndReviews.find({},{
    "name":1,
    "price":1
})
```
If the value is 0 mean to dont show, else 1 is to show.

# Search by critera
If i wanna find only documents with 2 bed
```
db.listingsAndReviews.find({
    "beds":2
},{
    "name":1,
    "beds":1
})
```
Multi critera
```
db.listingsAndReviews.find({
    "beds":2,
    "bedrooms":3
},{
    "name":1,
    "beds":1,
    "bedrooms":1
})
```

## Find an document within an object
```
db.listingsAndReviews.find({
    'address.country':"Brazil"
},{
    "name":1,
    "address.country":1
})
```

Type cls to clear terminal
```
cls
```

# Search via a range
* $gt - Greater than
* $gte - Greater than or equal
* $lt - Lesser than
* $lte - Lesser than or equal
```
db.listingsAndReviews.find({
    "beds":{
        "$gte":3,
        "$lte":6
    },
    "bedrooms":{
        "$gte":3
    }
},{
    "name":1,
    "beds":1,
    "bedrooms":1
})
```

Find all Listing in that is in Brazil or Portugal that have 3 to 6 beds
```
db.listingsAndReviews.find({
    "beds":{
        "$gte":3,
        "$lte":6
    },
    $or:[
        {"address.country":"Brazil"},
        {"address.country":"Portugal"}
    ]
},{
    "name":1,
    "beds":1,
    "address.country":1
})
```
## Find listing that have oven
Find items in an arrey
* Search via amenities with Oven OR Dishwasher
```
db.listingsAndReviews.find({
            "amenities":{$in:["Oven","Dishwasher"]}
},{
    "name":1,
    "beds":1,
    "amenities":1
});
```
* Search via amenities with Oven AND Dishwasher
```
db.listingsAndReviews.find({
         "amenities":{$all:["Oven","Dishwasher"]}
},{
    "name":1,
    "beds":1,
    "amenities":1
});
```

# Find by Date
Find all listing and review before 2019
```
db.listingsAndReviews.find({
    "first_review":{
        "$gt":ISODate("2018-12-31")
    }
},{
    "name":1,
    "first_review":1
})
```

# Search by "String"
Find listing with the word "Spacious"
```
db.listingsAndReviews.find({
    "name":{
        "$regex":"spacious","$options":"i"
    }
},{
    "name":1
})
```
Find via review name
```
db.listingsAndReviews.find({
    "reviews":{
        "$elemMatch":{
            'reviewer_name':"Davi"
        }
    }
},{
    "name":1,
    "reviews.$":1
})
```

# Changing Database
Move from Air BNB to MFlix
```
use sample_mflix;
```

Search via Object Id
```
db.movies.find({
    _id:ObjectId('573a1390f29313caabcd4135')
},{
    "title":1,
})
```