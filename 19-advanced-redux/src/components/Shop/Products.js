import ProductItem from './ProductItem';
import classes from './Products.module.css';
import productsData from './productsData.json';

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
