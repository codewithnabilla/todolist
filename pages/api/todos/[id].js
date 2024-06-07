import { Todo } from "../../../models";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PUT":
      try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
          return res.status(404).json({ error: "Todo not found" });
        }
        const { completed } = req.body;
        await todo.update({ completed });
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
      }
      break;
    case "DELETE":
      try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
          return res.status(404).json({ error: "Todo not found" });
        }
        await todo.destroy();
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}
