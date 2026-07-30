import express from "express";

const router = express.Router();

router.get("/projects", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.github.com/users/manasa-tech/repos"
    );

    const repos = await response.json();

    const projects = repos.map((repo: any) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || "No description available",
      github: repo.html_url,
      live: repo.homepage || "#",
      technologies: [],
    }));

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch GitHub projects",
    });
  }
});

export default router;