import { userOperations } from "./src/userOperations";

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/users" && req.method === "GET") {
      const users = await userOperations.list();
      return new Response(JSON.stringify(users));
    }

    if (url.pathname === "/users" && req.method === "POST") {
      const { name, email } = await req.json();
      const newUser = await userOperations.create(name, email);
      return new Response(JSON.stringify(newUser));
    }

    if (url.pathname.startsWith("/users/") && req.method === "GET") {
      const id = parseInt(url.pathname.split("/")[2]);
      const user = await userOperations.read(id);
      return new Response(JSON.stringify(user));
    }

    if (url.pathname.startsWith("/users/") && req.method === "PUT") {
      const id = parseInt(url.pathname.split("/")[2]);
      const { name, email } = await req.json();
      const updatedUser = await userOperations.update(id, name, email);
      return new Response(JSON.stringify(updatedUser));
    }

    if (url.pathname.startsWith("/users/") && req.method === "DELETE") {
      const id = parseInt(url.pathname.split("/")[2]);
      const deletedUser = await userOperations.delete(id);
      return new Response(JSON.stringify(deletedUser));
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);