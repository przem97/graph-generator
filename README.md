# graph-solver
A simple project for graph generation and playground for different graph algorithms.


# How to run

## Starting the backend

Before running the aplication make sure you have installed necessary packages by runnning:
```bash
npm install
```

Simply run in the terminal:
```bash
npm run watch
```
which starts the deamon monitoring the application source code and doing a live reloading.

The other way to run the backend is to build the Docker image and then starting the container.

Build the image:
```bash
docker build -t graph-solver-backend .
```
Run the container:

```bash
docker run -d -p 3000:3080 graph-solver-backend
```

You can configure default application port in the <em>.env</em> file.

Important! latest changes are always on <em>backend/graphServices</em> branch so make sure to checkout.


## Starting the frontend

Go to the <em>./app</em> directory and run:
```bash
npm install
npm run watch
```

Important! latest changes are always on <em>frontend</em> branch so make sure to checkout.

# How to run the tests

Likewike running the application in the development mode, make sure to install the dependencies:
```bash
npm install
```
Then just run:
```bash
npm run test
```