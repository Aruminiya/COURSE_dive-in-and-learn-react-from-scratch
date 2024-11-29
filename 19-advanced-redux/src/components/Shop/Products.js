import ProductItem from './ProductItem';
import classes from './Products.module.css';

const productsData = [
  { id: '1', title: 'Product 1', price: 100 },
  { id: '2', title: 'Product 2', price: 200 },
  { id: '3', title: 'Product 3', price: 300 },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productsData.map((product) => (
          <ProductItem
            key={product.id}
            {...product}
            quantity={1}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
