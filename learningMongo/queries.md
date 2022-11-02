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

#
#
#
# Create a new database
Just type
```
use animal_shelter
```

## To add one collection into the database
db.(collection name).insertOne({})
```
db.animals.insertOne({
    "name":"Putty",
    "age":"3",
    "breed":"Hunting Hound",
    "type":"Dog"
})
```

## To add multiple collection into the database
db.(collection name).insertMany([{},{},{}])
```
db.animals.insertMany([
    {
    "name":"Tutty",
    "age":"2",
    "breed":"Ragdoll",
    "type":"Cat"
},{
    "name":"Hutty",
    "age":"31",
    "breed":"Green Tree Python",
    "type":"snake"
}
])
```

## Update the data
db.(collection's name).updateOne({ID},{$set:{data u wanna edit}});
```
db.animals.updateOne({
    "_id":ObjectId("63620763c1fb22c50f2e1d90")
},{
    $set:{
        "name":"Percy"
    }
})
```

## Delete a data
```
db.animals.deleteOne({
    "_id":ObjectId("636206bcc1fb22c50f2e1d8f")
})
```

# Add item into array in a document
```
db.animals.updateOne({
    "_id":ObjectId("63620763c1fb22c50f2e1d91")
},{
    $push:{
        "checkups":{
            "_id":ObjectId(),
            "vetName":"Dr Tan",
            "diagnosis":"HBP",
            "treatment":"medication"
        }
    }
})
```
# Remove an element in the array
```
db.animals.updateOne({
    "_id":ObjectId("63620763c1fb22c50f2e1d90")
},{
    $pull:{
        "checkups":{
            "_id":ObjectId("63620ab7c1fb22c50f2e1d93"),
        }
    }
})
```

## Change one element in an array of object
```
db.animals.updateOne({
    "_id":ObjectId("63620763c1fb22c50f2e1d91"),
    "checkups":{
        "$elemMatch":{
            "_id":ObjectId("63620a0cc1fb22c50f2e1d92")
        }
    }
},{
    $set:{
        "checkups.$.vetName":"Dr SuuSuu"
    }
})
```

## Pushing 2 objects into the same param
```
db.animals.updateOne({
    "_id":ObjectId("63620763c1fb22c50f2e1d90")
},{
    $push:{
        "checkups":{
            "_id":ObjectId(),
            "vetName":"Dr Ace",
            "diagnosis":"STD",
            "treatment":"pills"
        }
    }
})
```

## Edit all data made by a var
```
db.animals.updateMany({
},{
    $set:{
        "checkups.$[eachCheckup].diagnosis":"redacted"
        }
},{
    "arrayFilters":[
        {
            "eachCheckup.vetName":"Dr SuuSuu"
        }
    ]
})
```