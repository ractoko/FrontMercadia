import { Order, Status } from "src/app/pages/account/orders/order.component";
import { User } from "src/app/pages/account/users/user.component";

export let USERS : User[] = [{
    position: 1,
    name: 'Pedro',
    lastname: 'Gonzalez',
    email: 'test@test.com',
    password: 'test1',
    edit: true,
    remove: true
  },
  {
    position: 2,
    name: 'Elsa',
    lastname: 'Torres',
    email: 'test1@test.com',
    password: 'test2',
    edit: true,
    remove: true
  }];

export let ORDERS: Order[] = [
    {
        id: 1,
        user: {
            position: 1,
            name: 'Pedro',
            lastname: 'Gonzalez',
            email: 'test@test.com',
            password: 'test1',
            edit: true,
            remove: true
          },
        date: new Date('01/10/2022'),
        total: 96,
        products: [{
            product: 
                {
                    "id": 2,
                    "title": "pepino",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
                    "type": "fashion",
                    "brand": "zara",
                    "collection": ["best sellers"],
                    "category": "Women",
                    "price": 22,
                    "sale": false,
                    "discount": 18.19,
                    "stock": 2,
                    "new": false,
                    "tags": [],
                    "variants": [],
                    "images": [{
                        "image_id": 211,
                        "id": 2,
                        "alt": "Pepino",
                        "src": "assets/images/product/fashion/Pepino.jpg",
                        "variant_id": []
                    }]
                },
            quantity: 3
        },{
            product: {
                "id": 3,
                "title": "cebolla morada",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
                "type": "fashion",
                "brand": "denim",
                "collection": ["featured products"],
                "category": "Women",
                "price": 32,
                "sale": false,
                "discount": 6.25,
                "stock": 0,
                "new": false,
                "tags": [],
                "variants": [],
                "images": [{
                    "image_id": 311,
                    "id": 3,
                    "alt": "Cebolla Morada",
                    "src": "assets/images/product/fashion/Cebolla Morada.jpg",
                    "variant_id": []
                }]
            },
            quantity: 2
        }],
        address: {
            street: 'test',
            number: 123,
            colony: 'test',
            state: 'Nuevo León',
            municipality: 'Santa Catarina',
            country: 'México',
            zip: '66350'
        },
        paymentMethod: 'Tarjeta',
        isPaid: true,
        dateDelivery: new Date('01/11/2022'),
        status: Status.Enviado,
        active: true
    }
];