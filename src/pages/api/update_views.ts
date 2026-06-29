import { initSupabaseClient } from "@/lib/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { enabled, supabaseClient } = initSupabaseClient();

  try {
    if (!enabled) {
      res.status(400).json({ message: "Supabase is not initialized" });
    } else {
      if (req.method === "POST") {
        const { page_slug } = req.body;
        /* @ts-ignore sorry I was trying to finish up:( */
        const { data, error } = await supabaseClient.rpc("page_view_counter", {
          page_slug,
        });
        if (error) {
          res.status(500).json({ error });
        } else {
          res.status(200).json({ views_count: data });
        }
      }
    }
  } catch (e) {
    console.log(e, "error");
    res.status(500).json({ message: "Unknown error" });
  }
}
