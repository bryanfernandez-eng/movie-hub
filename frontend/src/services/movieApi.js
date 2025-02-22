import { backend } from "./backend";


export const getTrendingMovies = async () => {
  try {
    const response = await backend.get("/movies/trending");
    console.log(response)
    if(response.data.success){
        return response.data.results; 
    } 
  } catch (error) {
    console.error("getTrendingMovies error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "An error occurred during signup",
    };
  }
};
