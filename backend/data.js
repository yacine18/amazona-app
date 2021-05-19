import bcrypt from 'bcrypt';

const data = {
    users:[
        {
            name: 'Yassine Hilali',
            email: 'admin@belchoix.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'John Doe',
            email: 'john@belchoix.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        },
    ],
    products:[
        {
            name:'iPhone 12 Pro',
            category: 'Phones',
            image: '/images/product-1.jpg',
            price: 1200,
            countStock:1115,
            brand: 'Apple',
            rating:4.5,
            numReviews: 4,
            description: 'iPhone 12 Pro Max'
        },
        {
            name:'iPhone 12 Pro',
            category: 'Phones',
            image: '/images/product-1.jpg',
            price: 1200,
            countStock:0,
            brand: 'Apple',
            rating:4.5,
            numReviews: 14,
            description: 'iPhone 12 Pro Max'
        },
        {
            name:'iPhone 12 Pro',
            category: 'Phones',
            image: '/images/product-1.jpg',
            price: 1200,
            brand: 'Apple',
            countStock:10,
            rating:4.5,
            numReviews: 10,
            description: 'iPhone 12 Pro Max'
        },
        {
            name:'iPhone 12 Pro',
            category: 'Phones',
            image: '/images/product-1.jpg',
            price: 1200,
            countStock:1,
            brand: 'Apple',
            rating:4.5,
            numReviews: 5,
            description: 'iPhone 12 Pro Max'
        },
        {
            name:'iPhone 12 Pro',
            category: 'Phones',
            image: '/images/product-1.jpg',
            price: 1200,
            countStock:1,
            rating:4.5,
            brand: 'Apple',
            numReviews: 40,
            description: 'iPhone 12 Pro Max'
        },
        {
            name:'iPhone 12 Pro',
            category: 'Phones',
            image: '/images/product-1.jpg',
            price: 1200,
            countStock:1,
            brand: 'Apple',
            rating:4.5,
            numReviews: 25,
            description: 'iPhone 12 Pro Max'
        },
    ]
}

export default data