import React, { useEffect } from "react";
import { useState } from "react";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // GET
  // POST
  // PATCH / PUT
  // DELETE

  const fetchData = async () => {
    try {
      fetch("http://localhost:3001/products", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          setProducts(response);
        })
        .catch((err) => console.log("THIS IS ERR : ", err));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      <ul>
        {products.map((_) => (
          <li>{_.productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListProducts;
