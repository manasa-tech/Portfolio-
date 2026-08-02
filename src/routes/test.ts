import express from "express";
import { supabase } from "../config/supabase";

const router = express.Router();

/* ==========================================
   GET ALL PROJECTS
========================================== */
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (error) {
      console.error("GET ERROR:", error);

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.error("GET EXCEPTION:");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ==========================================
   INSERT PROJECT
========================================== */
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "title and description are required",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
        },
      ])
      .select();

    if (error) {
      console.error("SUPABASE INSERT ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        error: error.message,
        details: error,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Project inserted successfully",
      data,
    });
  } catch (err: any) {
    console.error("POST EXCEPTION:");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;