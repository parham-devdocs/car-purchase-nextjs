

function getAllCookies(): { [key: string]: string } {
    if (typeof document === 'undefined') {
      console.log("Running on server, no cookies available");
      return {};
    }
    const cookies = document.cookie.split(';').reduce((acc: { [key: string]: string }, cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        acc[decodeURIComponent(name)] = decodeURIComponent(value);
      }
      return acc;
    }, {});
    return cookies;
  }

  export default getAllCookies