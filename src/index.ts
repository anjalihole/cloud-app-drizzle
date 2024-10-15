import * as dotenv from 'dotenv';
dotenv.config();

import { userOperations } from "./userOperations";
import { productOperations } from "./productOperations";
import { categoryOperations } from "./categoryOperations";
import { orderOperations } from "./orderOperations";

const server = Bun.serve({
  port: parseInt(process.env.PORT || "3000"),
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.split('/');

    // Helper function to parse JSON body
    const getBody = async () => {
      try {
        return await req.json();
      } catch (e) {
        return null;
      }
    };

    // Users API
    if (path[1] === "users") {
      if (req.method === "GET" && path.length === 2) {
        const users = await userOperations.list();
        return new Response(JSON.stringify(users));
      }
      if (req.method === "POST" && path.length === 2) {
        const body = await getBody();
        if (body && body.name && body.email) {
          const newUser = await userOperations.create(body.name, body.email);
          return new Response(JSON.stringify(newUser));
        }
      }
      if (req.method === "GET" && path.length === 3) {
        const user = await userOperations.read(parseInt(path[2]));
        return new Response(JSON.stringify(user));
      }
      if (req.method === "PUT" && path.length === 3) {
        const body = await getBody();
        if (body && body.name && body.email) {
          const updatedUser = await userOperations.update(parseInt(path[2]), body.name, body.email);
          return new Response(JSON.stringify(updatedUser));
        }
      }
      if (req.method === "DELETE" && path.length === 3) {
        const deletedUser = await userOperations.delete(parseInt(path[2]));
        return new Response(JSON.stringify(deletedUser));
      }
    }

    // Products API
    if (path[1] === "products") {
      if (req.method === "GET" && path.length === 2) {
        const products = await productOperations.list();
        return new Response(JSON.stringify(products));
      }
      if (req.method === "POST" && path.length === 2) {
        const body = await getBody();
        if (body && body.name && body.price && body.categoryId) {
          const newProduct = await productOperations.create(body.name, body.description, body.price, body.categoryId);
          return new Response(JSON.stringify(newProduct));
        }
      }
      if (req.method === "GET" && path.length === 3) {
        const product = await productOperations.read(parseInt(path[2]));
        return new Response(JSON.stringify(product));
      }
      if (req.method === "PUT" && path.length === 3) {
        const body = await getBody();
        if (body && body.name && body.price && body.categoryId) {
          const updatedProduct = await productOperations.update(parseInt(path[2]), body.name, body.description, body.price, body.categoryId);
          return new Response(JSON.stringify(updatedProduct));
        }
      }
      if (req.method === "DELETE" && path.length === 3) {
        const deletedProduct = await productOperations.delete(parseInt(path[2]));
        return new Response(JSON.stringify(deletedProduct));
      }
    }

    // Categories API
    if (path[1] === "categories") {
      if (req.method === "GET" && path.length === 2) {
        const categories = await categoryOperations.list();
        return new Response(JSON.stringify(categories));
      }
      if (req.method === "POST" && path.length === 2) {
        const body = await getBody();
        if (body && body.name) {
          const newCategory = await categoryOperations.create(body.name);
          return new Response(JSON.stringify(newCategory));
        }
      }
      if (req.method === "GET" && path.length === 3) {
        const category = await categoryOperations.read(parseInt(path[2]));
        return new Response(JSON.stringify(category));
      }
      if (req.method === "PUT" && path.length === 3) {
        const body = await getBody();
        if (body && body.name) {
          const updatedCategory = await categoryOperations.update(parseInt(path[2]), body.name);
          return new Response(JSON.stringify(updatedCategory));
        }
      }
      if (req.method === "DELETE" && path.length === 3) {
        const deletedCategory = await categoryOperations.delete(parseInt(path[2]));
        return new Response(JSON.stringify(deletedCategory));
      }
    }

    // Orders API
    if (path[1] === "orders") {
      if (req.method === "GET" && path.length === 2) {
        const orders = await orderOperations.list();
        return new Response(JSON.stringify(orders));
      }
      if (req.method === "POST" && path.length === 2) {
        const body = await getBody();
        if (body && body.userId && body.items) {
          const newOrder = await orderOperations.create(body.userId, body.items);
          return new Response(JSON.stringify(newOrder));
        }
      }
      if (req.method === "GET" && path.length === 3) {
        const order = await orderOperations.read(parseInt(path[2]));
        return new Response(JSON.stringify(order));
      }
      if (req.method === "PUT" && path.length === 3) {
        const body = await getBody();
        if (body && body.status) {
          const updatedOrder = await orderOperations.update(parseInt(path[2]), body.status);
          return new Response(JSON.stringify(updatedOrder));
        }
      }
      if (req.method === "DELETE" && path.length === 3) {
        const deletedOrder = await orderOperations.delete(parseInt(path[2]));
        return new Response(JSON.stringify(deletedOrder));
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);