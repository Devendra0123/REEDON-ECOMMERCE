interface Category {
    name: string;
    link: string;
    image: string
  }

export const categories: Category[] = [
    {
        name:'Best deal',
        link:'/product/category?category_id=best-deal',
        image:'/best_deal.png'
    },
    {
        name:'Best seller',
        link:'/product/category?category_id=best-seller',
        image:'/best_seller.png'
    },
    {
        name:'Dresses',
        link:'/product/category?category_id=dresses',
        image:'/dress.jpg'
    },
    {
        name:'Books',
        link:'/product/category?category_id=books',
        image:'/books.jpg'
    },
    {
        name:'Health & Personal care',
        link:'/product/category?category_id=health-and-personal-care',
        image:'/health_and_fitness.jpg'
    },
    {
        name:'Electronic Goods',
        link:'/product/category?category_id=electronic-goods',
        image:'/electronic_goods.jpg'
    },
]