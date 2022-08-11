## Setup

Requires `node`, `npm`. After `git clone`ing, do this to set the project up:

```bash
npm i
```

and this to run the project:

```bash
npm run start
```

The project now runs under http://localhost:3000/.

## Security
Warning: THis is not meant to be secure by default. You can use it securely **but you need to know what you are doing!** Therefore I tell you the most important aspects:

- Authentication is not encrypted (basic auth). When using anywhere except locally, **always use https**
  - better: only allow access to the editing interface via https
  - you need to use a reverse proxy to do that: https://caddyserver.com/
- the functions are executed directly within the node instance. **You should ever only run functions you trust completely.**
- there is currently no input validation on anything - be careful not to publish any part of the editing interface

To summarize: Run this project only by and for yourself, behind an http reverse proxy and a firewall. The only public thing should be the functions itself.