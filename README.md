# Rent&You Project - Deployment

You can deploy the project using Docker Compose in a remote server.

It expects you to have a Traefik proxy handling communication to the outside world and HTTPS certificates.

And you can use CI (continuous integration) systems to deploy automatically.

But you have to configure a couple things first.

## Preparation

* Have a remote server ready and available.
* Configure the DNS records of your domain to point to the IP of the server you just created.
* For example in local development, you could add an entry to your `/etc/hosts` file, e.g.:
```bash
echo "127.0.0.1 rentandyou.com" | sudo tee -a /etc/hosts
```

* Install and configure [Docker](https://docs.docker.com/engine/install/).
* Create a remote directory to store your code, for example:

```bash
mkdir -p /root/code/rent-and-you/
```

## Public Traefik

We need a Traefik proxy to handle incoming connections and HTTPS certificates.

### Traefik Docker Compose

Copy the Traefik Docker Compose file to your server, to your code directory. You could do it with `rsync`:

```bash
rsync -a docker-compose.traefik.yml root@your-server.example.com:/root/code/rent-and-you/
```

### Traefik Public Network

This Traefik will expect a Docker "public network" named `traefik-public` to communicate with your stack(s).

This way, there will be a single public Traefik proxy that handles the communication (HTTP and HTTPS) with the outside world, and then behind that, you could have one or more stacks.

To create a Docker "public network" named `traefik-public` run:

```bash
docker network create traefik-public
```

### Traefik Environment Variables

The Traefik Docker Compose file expects some environment variables to be set. Must be located in .env file.

### Start the Traefik Docker Compose

Now with the environment variables set and the `docker-compose.traefik.yml` in place, you can start the Traefik Docker Compose:

```bash
docker compose -f docker-compose.traefik.yml up -d
```

## Deploy the Project

Now that you have Traefik in place you can deploy the project with Docker Compose.

You could configure the variables in the `.env` file to match your domain, or you could override them before running the `docker compose` command.

For example:

```bash
export DOMAIN=rentandyou.com
```

And then deploy with Docker Compose:

```bash
docker compose -f docker-compose.yml up -d
```

For production you wouldn't want to have the overrides in `docker-compose.override.yml`, so you would need to explicitly specify the file to use, `docker-compose.yml`.

## URLs

Frontend: https://rentandyou.com

Backend API docs: https://rentandyou.com/docs

Automatic Interactive Docs (Swagger UI): https://rentandyou.com/docs

Automatic Alternative Docs (ReDoc): https://rentandyou.com/redoc

Backend API base URL: https://rentandyou.com/api

PGAdmin: https://pgadmin.rentandyou.com

Traefik UI: https://traefik.rentandyou.com

## References

* [FastAPI](https://fastapi.tiangolo.com)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://docs.docker.com/)
* [Docker Hub](https://hub.docker.com/)
* [Traefik](https://doc.traefik.io/traefik/)
* [Let's Encrypt](https://letsencrypt.org/)
* [PGAdmin](https://www.pgadmin.org/)
* [GitHub Actions](https://docs.github.com/en/actions)
* [FastAPI Template](https://github.com/tiangolo/full-stack-fastapi-template)
* [DDD Python](https://github.com/pgorecki/python-ddd)
