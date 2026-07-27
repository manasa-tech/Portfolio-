import { supabase } from "../config/supabase";

export async function getPortfolioData() {
  try {
    const [
      profile,
      skills,
      education,
      projects,
      experience,
      socialLinks,
    ] = await Promise.all([
      supabase.from("profile").select("*"),
      supabase.from("skills").select("*"),
      supabase.from("education").select("*"),
      supabase.from("projects").select("*"),
      supabase.from("experience").select("*"),
      supabase.from("social_links").select("*"),
    ]);

    return {
      profile: profile.data || [],
      skills: skills.data || [],
      education: education.data || [],
      projects: projects.data || [],
      experience: experience.data || [],
      socialLinks: socialLinks.data || [],
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    throw error;
  }
}