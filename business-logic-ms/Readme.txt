1. Set configs according to the environment

2. Build docker image
docker build -f Dockerfile . -t business-logic-ms

3. Run docker container
docker run --name business-logic-ms-container -d -p 3001:3001 business-logic-ms