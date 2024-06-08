import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching todo:", error);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      break;
    case "PUT":
      try {
        const { title, detail, completed } = req.body;
        const { data, error } = await supabase
          .from("todos")
          .update({ title, detail, completed })
          .eq("id", id);
        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        console.error("Error updating todo:", error);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      break;
    case "DELETE":
      try {
        const { data, error } = await supabase
          .from("todos")
          .delete()
          .eq("id", id);
        if (error) throw error;
        res.status(204).end();
      } catch (error) {
        console.error("Error deleting todo:", error);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
