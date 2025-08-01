
function decodeUrl(encodedUrl:string) {
    try {
      return decodeURIComponent(encodedUrl);
    } catch (error:any) {
      console.error("Invalid URL encoding:", error.message);
      return encodedUrl; // Return original if invalid
    }
  }

  export default decodeUrl