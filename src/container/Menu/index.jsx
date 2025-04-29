// import { useEffect, useState } from "react";

// import { api } from "../../services/api";
// import {
//   Container,
//   Banner,
//   CategoryMenu,
//   ProductsContainer,
//   CategoryButton,
// } from "./styles";
// import { formatPrice } from "../../utils/formatPrice";
// import { CardProduct } from "../../components/CardProduct";
// import { useLocation, useNavigate } from "react-router-dom";

// export function Menu() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const navigate = useNavigate();

//   const { search } = useLocation();

//   const queryParams = new URLSearchParams(search);

//   const [activeCategory, setActiveCategory] = useState(() => {
//     const categoryId = +queryParams.get("categoria");
//     //o sinal de + converte para numbem (nesse caso vinha como string)

//     if (categoryId) {
//       return categoryId;
//     }
//     return 0;
//   });

//   useEffect(() => {
//     async function loadCategories() {
//       const { data } = await api.get("/categories");

//       const newCategories = [{ id: 0, name: "Todas" }, ...data];

//       setCategories(newCategories);
//     }

//     async function loadProducts() {
//       const { data } = await api.get("/products");

//       const newProducts = data.map((product) => ({
//         currencyValue: formatPrice(product.price),
//         ...product,
//       }));

//       setProducts(newProducts);
//     }

//     loadCategories();
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     if (activeCategory === 0) {
//       setFilteredProducts(products);
//     } else {
//       const newFiltredProducts = products.filter(
//         (product) => product.category_id === activeCategory
//       );

//       setFilteredProducts(newFiltredProducts);
//     }
//   }, [products, activeCategory]);

//   return (
//     <Container>
//       <Banner>
//         <h1>
//           O Melhor
//           <br />
//           Hamburguer
//           <br />
//           Esta Aqui
//           <span>Menu Mais Completo de Todos os Tempos.</span>
//         </h1>
//       </Banner>
//       <CategoryMenu>
//         {categories.map((category) => {
//           return (
//             <CategoryButton
//               key={category.id}
//               $isActiveCategory={category.id === activeCategory}
//               onClick={() => {
//                 navigate(
//                   {
//                     pathname: "/cardapio",
//                     search: `?categoria=${category.id}`,
//                   },
//                   {
//                     replace: true,
//                   }
//                 );
//                 setActiveCategory(category.id);
//               }}
//             >
//               {category.name}
//             </CategoryButton>
//           );
//         })}
//       </CategoryMenu>

//       <ProductsContainer>
//         {filteredProducts.map((product) => (
//           <CardProduct product={product} key={product.id} />
//         ))}
//       </ProductsContainer>
//     </Container>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import {
  Container,
  Banner,
  CategoryMenu,
  ProductsContainer,
  CategoryButton,
} from "./styles";

import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/CardProduct";

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const navigate = useNavigate();
  const { search } = useLocation();

  // Atualiza categoria ativa toda vez que a URL muda
  useEffect(() => {
    const params = new URLSearchParams(search);
    const categoryId = +params.get("categoria");

    setActiveCategory(categoryId || 0);
  }, [search]);

  // Carrega categorias e produtos ao montar o componente
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");
      const newCategories = [{ id: 0, name: "Todas" }, ...data];
      setCategories(newCategories);
    }

    async function loadProducts() {
      const { data } = await api.get("/products");
      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));
      setProducts(newProducts);
    }

    loadCategories();
    loadProducts();
  }, []);

  // Filtra os produtos conforme a categoria ativa
  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category_id === activeCategory
      );
      setFilteredProducts(filtered);
    }
  }, [products, activeCategory]);

  return (
    <Container>
      <Banner>
        <h1>
          O Melhor
          <br />
          Hamburguer
          <br />
          Está Aqui
          <span>Menu Mais Completo de Todos os Tempos.</span>
        </h1>
      </Banner>

      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              navigate(
                {
                  pathname: "/menu",
                  search: `?categoria=${category.id}`,
                },
                { replace: true }
              );
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>

      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  );
}
