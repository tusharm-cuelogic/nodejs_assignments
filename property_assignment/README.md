1. Property Listing

URL: http://localhost:3000/properties

Method: GET
Parameters: {"page":1}
Output: 
[
    {
        "title": "Shop in new york",
        "address": "301 west street, main avenue, NY 40001",
        "sf": "1000",
        "price": "$2000",
        "property_id":"1"
    },
    {
        "title": "Apartment for rent",
        "address": "Block 4 empire state, NY 64100",
        "sf": "5000",
        "price": "$4000",
        "property_id":"2"
    }
]


2. Property Add

URL: http://localhost:3000/property/add 
Method: POST
Parameters: 
{
    "title": "Shop in new york",
    "address": "Block 4 empire state, NY 64100",
    "zipcode": "60001",
    "sf": "1000",
    "price": "$2000 per month",
    "description": "Very good property to open a shop",
    "property_type": "rent",
}
Output
{"success":"1","message":"Your property has been added."}


3. Property Edit

URL: http://localhost:3000/property/edit  
Method: PUT
Parameters: 
{
    "title": "Shop in new york",
    "address": "Block 4 empire state, NY 64100",
    "zipcode": "60001",
    "sf": "1000",
    "price": "$2000 per month",
    "description": "Very good property to open a shop",
    "property_type": "rent",
    "property_id":"1"
}
Output
{"success":"1","message":"Your property has been added."}


4. Property Details

URL: http://localhost:3000/property/1 
Method: GET
Parameters: {}
Output:
{"title": "Shop in new york",
"address": "301 west street, main avenue, NY 40001",
"sf": "1000",
"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae justo ut risus sollicitudin vulputate consectetur non libero. Nulla efficitur nisi mauris, vitae rutrum dolor fringilla ac. Fusce sed ante congue quam finibus mattis. Phasellus venenatis nunc ac nisl pellentesque aliquet. Ut a elementum leo. Curabitur sed diam nec neque sodales sagittis viverra eget ante. Cras consectetur orci eu vestibulum pharetra. Pellentesque congue varius dui a ornare."
}
