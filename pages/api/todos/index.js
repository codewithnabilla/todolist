import { Todo } from "../../../models";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
      }
      break;
    case "POST":
      try {
        const { title, detail } = req.body;
        const todo = await Todo.create({ title, detail });
        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}
