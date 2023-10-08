class IPEditor {
    getInfo() {
      return {
        id: 'ipeditor',
        name: 'IP Editing',
        color1: "#64bcff",
        blocks: [
          {
            opcode: 'getIPAddress',
            blockType: Scratch.BlockType.REPORTER,
            text: 'internet protocol',
          },
          {
            opcode: 'getUserAgent',
            blockType: Scratch.BlockType.REPORTER,
            text: 'user agent header',
          },
        ],
      };
    }
  
    async getIPAddress() {
      // Create the fetch options with the User-Agent header
      const fetchOptions = {
        method: 'GET',
        headers: {
          'User-Agent': navigator.userAgent,
        },
      };
  
      // Make a request to api.ipify.org to get your IP address with custom headers
      const response = await fetch('https://api.ipify.org?format=json', fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch IP address: ${response.statusText}`);
      }
  
      const data = await response.json();
      const ipAddress = data.ip;
  
      return ipAddress;
    }
  
    getUserAgent() {
      // Return the User-Agent string from the browser
      return navigator.userAgent;
    }
  }
  
  Scratch.extensions.register(new IPEditor());
  
