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

export const getUpcomingMovies = async () => {
    try {
        const response = await backend.get("/movies/upcoming");
        console.log(response)
        if(response.data.success){
            return response.data.results; 
        } 
      } catch (error) {
        console.error("getUpcomingMovies error:", error);
        return {
          success: false,
          error: error.response?.data?.message || "An error occurred during signup",
        };
      }
}


export const searchMovies = async (query) => {
    try {  
        console.log(query)
        const response = await backend.get("/movies/search", {params: {query}});
        console.log(response)
        
        if(response.data.success){
            return response.data.results; 
        } 
      } catch (error) {
        console.error("searchMovies error:", error);
        return {
          success: false,
          error: error.response?.data?.message || "An error occurred during signup",
        };
      }
}