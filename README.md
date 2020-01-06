# Back-End

Sauti Africa empowers small business owners, particularly women, to improve their business and economic opportunities to grow out of poverty.  You will build a platform to enable these business owners to create listing for items they have for sale. 


### Your URL link: African-Marketplace-4 https://africanmarket2.herokuapp.com

## Table Schema

{
CREATE TABLE user (
    id         INTEGER       NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    password   VARCHAR (128) NOT NULL,
    username   VARCHAR (128) NOT NULL,
    first_name VARCHAR (128),
    last_name  VARCHAR (128),
    email      VARCHAR (128) 
);
}
```

```
{
CREATE TABLE item (
    id          INTEGER       NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (128) NOT NULL,
    description VARCHAR (128) NOT NULL,
    price       FLOAT         NOT NULL,
    city        VARCHAR (128) NOT NULL,
    country     VARCHAR (128) NOT NULL,
    user_id     INTEGER       NOT NULL,
    FOREIGN KEY (
        user_id
    )
    REFERENCES user (id) ON DELETE RESTRICT
                         ON UPDATE CASCADE
);}
```

```
{
CREATE TABLE category (
    id      INTEGER       NOT NULL
                          PRIMARY KEY AUTOINCREMENT,
    type    VARCHAR (128) NOT NULL,
    item_id INTEGER       NOT NULL,
    FOREIGN KEY (
        item_id
    )
    REFERENCES item (id) ON DELETE RESTRICT
                         ON UPDATE CASCADE
);
}
```

```
{
CREATE TABLE user_item (
    item_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (
        item_id
    )
    REFERENCES item (id) ON DELETE RESTRICT
                         ON UPDATE CASCADE,
    FOREIGN KEY (
        user_id
    )
    REFERENCES user (id) ON DELETE RESTRICT
                         ON UPDATE CASCADE,
    PRIMARY KEY (
        user_id,
        item_id
    )
);
}
```

## End Points

| GET users |
| --- |
| api/user |
| --- |
| get all users |

| POST |
| ---- | 
|  /api/auth/register |
| ---- |
| required - username and password |
| register request |

{
	"username": "mike12",
	"password": "pass",
	"email": "mike2@aol.com"
}

| Status: 201 Created |

```
{
    "newUser": {
        "id": 5,
        "username": "mike12",
        "first_name": null,
        "last_name": null,
        "email": "mike2@aol.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJtaWtlMTIiLCJpYXQiOjE1NzgzMzg5MDksImV4cCI6MTU3ODc3MDkwOX0.tpMk9ha8dewCRCvAzHs3LmSU3Zr-GS8dxY2lDIvaOOg"
}
```

| POST |
| --- |
| /api/auth/login |
| required - username and password |
| login request |

```
{
	"username": "mike12",
	"password": "pass"
	
}
```

| Status: 200 OK |

```
{
    "login": {
        "id": 5,
        "username": "mike12",
        "first_name": null,
        "last_name": null,
        "email": "mike2@aol.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJtaWtlMTIiLCJpYXQiOjE1NzgzMzkxNDMsImV4cCI6MTU3ODc3MTE0M30.NB52XS64QJ6bvFFdL8tdXSoUfKRHRHx-Ee_APdEiwOw"
}
```

| GET user by id |
| ---- |
| api/user/:id |
| --- |
| Restricted endpoint Token required |
 
| GET search by item name |
| ---- |
| api/item/search/:value |
| --- |
| You can compare the price of corn for example |

| GET item |
| --- |
| /api/item |
| --- |
| See all item for sale |

| GET item by Id |
| --- |
| /api/item/:id |
| --- |
| returns a single item by id |

| POST new item |
| --- |
| /api/item |
| --- |
| "name", "city", "country", "price", and "user_id" |
| token required |
| required fields to add item to user "name", "city", "country", "price", and "user_id" |

```
{
	"name": "raddish",
    "description": "red",
    "price": 2.12,
    "city": "Zaria",
    "country": "Nigeria",
    "user_id": 1
}
```

| POST category to new item |
| --- |
| api/category  |
| --- |
| Token required  |

```
{
	"type": "vegetable",
    "item_id": 3
}
```

| Put edit a item by id |
| --- |
| api/item/:id |
| --- |
| token required |
| edit name or description or city or country or price |

| DEL a item by id |
| --- |
| /api/item/:id  |
| --- |
| token required  |

| Delete a category |
| ---- |
| BaseURL/api/category |
| ---- |
| token required |
