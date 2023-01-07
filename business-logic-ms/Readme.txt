1. Set configs according to the environment

2. Build docker image
docker build -f Dockerfile . -t business-logic-ms

3. Run docker container
docker run --name business-logic-ms-container -d -p 3000:3000 business-logic-ms