1. Set configs according to the environment

2. Build docker image
docker build -f Dockerfile . -t reverse-proxy-ms

3. Run docker container
docker run --name reverse-proxy-ms-container -d -p 3001:3001 reverse-proxy-ms