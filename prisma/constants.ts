export const categories = [
    {
        name: 'Седаны',
    },
    {
        name: 'Купе',
    },
    {
        name: 'Внедорожники',
    },
    {
        name: 'Минивены',
    },
    {    
        name: 'Электро',
    },
];

export const brands = [
    {
        name: 'Honda',
    },
    {
        name: 'Toyota',
    },
    {
        name: 'BMW',
    },
    {
        name: 'Mercedes-Benz',
    },
    {
        name: 'Jeep',
    },
    {
        name: 'Tesla',
    },
    {
        name: 'Nissan',
    },
];

export const services = [
    {
        name: 'Детское автокресло',
        price: 10,
    },
    {
        name: 'Держатель для телефона',
        price: 5,
    },
    {
        name: 'Дополнительный водитель',
        price: 15,
    },
    {
        name: 'Помощь на дороге',
        price: 50,
    },
].map((service, index) => ({ id: index + 1, ...service }));

export const vehicles = [
    {
        name: 'Honda Civic',
        imageUrl: 'https://www.ixbt.com/img/n1/news/2024/0/1/2024-honda-civic-rs-jdm_large.png',
        categoryId: 1,
        brandId: 1,
        price: 50,
        description: 'Компактный и надежный седан с экономичным расходом топлива и стильным дизайном.',
        year: 2024,
        mileage: 15000,
        transmission: 'Автомат',
        fuelType: 'Бензин',
        engineSize: 1.8,
        horsepower: 140,
        seats: 5,
        doors: 4,
        driveType: 'Передний',
        color: 'Чёрный',
        vin: '1HGBH41JXMN109186'
    },
    {
        name: 'Toyota Camry',
        imageUrl: 'https://i.pinimg.com/736x/fc/e0/0b/fce00b1df488c389916f9994a23fca10.jpg',
        categoryId: 1,
        brandId: 2,
        price: 55,
        description: 'Просторный и комфортный седан с высоким уровнем безопасности и надежности.',
        year: 2023,
        mileage: 20000,
        transmission: 'Автомат',
        fuelType: 'Бензин',
        engineSize: 2.5,
        horsepower: 203,
        seats: 5,
        doors: 4,
        driveType: 'Передний',
        color: 'Белый',
        vin: '4T1BF1FK1DU174642'
    },
    {
        name: 'BMW M4',
        imageUrl: 'https://www.shutterstock.com/image-vector/sport-powerful-shiny-grey-bmw-600nw-2116906469.jpg',
        categoryId: 2,
        brandId: 3,
        price: 100,
        description: 'Спортивное купе с мощным двигателем и агрессивным дизайном для любителей скорости.',
        year: 2023,
        mileage: 10000,
        transmission: 'Автомат',
        fuelType: 'Бензин',
        engineSize: 3.0,
        horsepower: 473,
        seats: 4,
        doors: 2,
        driveType: 'Задний',
        color: 'Серый',
        vin: 'WBS4A9C01J5C42345'
    },
    {
        name: 'Mercedes-Benz C-Class Coupe',
        imageUrl: 'https://imgcdn.oto.com/large/gallery/color/25/2036/mercedes-benz-c-class-coupe-color-317652.jpg',
        categoryId: 2,
        brandId: 4,
        price: 120,
        description: 'Элегантное и роскошное купе с передовыми технологиями и плавной ездой.',
        year: 2022,
        mileage: 5000,
        transmission: 'Автомат',
        fuelType: 'Бензин',
        engineSize: 2.0,
        horsepower: 255,
        seats: 4,
        doors: 2,
        driveType: 'Задний',
        color: 'Тёмно-серый',
        vin: 'WDDWK4JB2KR050193'
    },
    {
        name: 'Toyota Land Cruiser',
        imageUrl: 'https://i.pinimg.com/736x/53/af/d6/53afd61d5bee8e67ca04352c2c6f8cfe.jpg',
        categoryId: 3,
        brandId: 2,
        price: 90,
        description: 'Мощный внедорожник с выдающейся проходимостью и надежностью.',
        year: 2021,
        mileage: 30000,
        transmission: 'Автомат',
        fuelType: 'Бензин',
        engineSize: 4.6,
        horsepower: 381,
        seats: 7,
        doors: 5,
        driveType: 'Полный',
        color: 'Белый',
        vin: 'JTMHV05J9JH090043'
    },
    {
        name: 'Jeep Wrangler',
        imageUrl: 'https://i.pinimg.com/736x/e9/90/58/e990589ae02284b8a2a492973ab02dae.jpg',
        categoryId: 3,
        brandId: 5,
        price: 85,
        description: 'Классический внедорожник с легендарной проходимостью и открытым верхом.',
        year: 2020,
        mileage: 25000,
        transmission: 'Механика',
        fuelType: 'Бензин',
        engineSize: 3.6,
        horsepower: 285,
        seats: 4,
        doors: 2,
        driveType: 'Полный',
        color: 'Чёрный',
        vin: '1C4BJWAG8LL120530'
    },
    {
        name: 'Honda Odyssey',
        imageUrl: 'https://i.pinimg.com/736x/d9/1e/36/d91e36a99e4c1fc9c15f63895af6b631.jpg',
        categoryId: 4,
        brandId: 1,
        price: 70,
        description: 'Просторный минивэн для семьи с комфортным салоном и современной мультимедиа системой.',
        year: 2021,
        mileage: 18000,
        transmission: 'Автомат',
        fuelType: 'Бензин',
        engineSize: 3.5,
        horsepower: 280,
        seats: 8,
        doors: 5,
        driveType: 'Передний',
        color: 'Бежевый',
        vin: '5FNRL6H78BB014567'
    },
    {
        name: 'Toyota Sienna',
        imageUrl: 'https://i.pinimg.com/736x/91/a5/65/91a565c7cabfa00e99e3a39a6cd3198f.jpg',
        categoryId: 4,
        brandId: 2,
        price: 75,
        description: 'Практичный семейный минивэн с просторным интерьером и экономичным двигателем.',
        year: 2022,
        mileage: 12000,
        transmission: 'Автомат',
        fuelType: 'Гибрид',
        engineSize: 2.5,
        horsepower: 245,
        seats: 7,
        doors: 5,
        driveType: 'Передний',
        color: 'Белый',
        vin: '5TDDZ3DC3NS098532'
    },
    {
        name: 'Tesla Model 3',
        imageUrl: 'https://www.motorbiscuit.com/wp-content/uploads/2021/08/Tesla-Model-3-1.jpg?w=1024&h=568&strip=all&quality=89',
        categoryId: 5,
        brandId: 6,
        price: 100,
        description: 'Современный электрический седан с автопилотом и высокой дальностью хода.',
        year: 2023,
        mileage: 5000,
        transmission: 'Автомат',
        fuelType: 'Электро',
        engineSize: 0,
        horsepower: 283,
        seats: 5,
        doors: 4,
        driveType: 'Задний',
        color: 'Тёмно-серый',
        vin: '5YJ3E1EA7KF415873'
    },
    {
        name: 'Nissan Leaf',
        imageUrl: 'https://blogmedia.dealerfire.com/wp-content/uploads/sites/376/2018/03/Color-Options-for-the-2018-Nissan-LEAF-b2_o.jpg',
        categoryId: 5,
        brandId: 7,
        price: 80,
        description: 'Популярный электромобиль с отличной энергоэффективностью и удобным управлением.',
        year: 2020,
        mileage: 22000,
        transmission: 'Автомат',
        fuelType: 'Электро',
        engineSize: 0,
        horsepower: 147,
        seats: 5,
        doors: 4,
        driveType: 'Передний',
        color: 'Белый',
        vin: '1N4AZ1CP0LC320104'
    }
];



