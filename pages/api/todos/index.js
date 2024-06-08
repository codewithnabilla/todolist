import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      break;
    case "POST":
      try {
        const { title, detail } = req.body;
        console.log("Incoming data:", { title, detail });
        const { data, error } = await supabase
          .from("todos")
          .insert([{ title, detail }]);
        if (error) throw error;
        console.log("Inserted data:", data);
        res.status(201).json(data[0]);
      } catch (error) {
        console.error("Error adding todo:", error);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
