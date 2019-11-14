# Work Orders

## Demo

![Frontend Assessment Demo](demo/demo.gif)

## About 

This project was done accordingly for an online assessment and replaced their APIs with generated pseudo-data. The project utilizes React as the frontend framework and SASS as the CSS preprocessor.  Express is used as the application framework and Node as the backend server-side scriptor.

## Install Node
```
  brew update
  brew install node
```

## Setup
```
  npm install
  npm run dev
  npm run start
```

## Listen
```
  localhost:3000
```
## On Load

The project will call on the work orders api and fetch the work orders once the client requests for the data.  Once the work orders are retrieved, unique worker id's are stored and requested on the workers api.  Once worker information is retrieved, work orders will be iterated through and include worker information that matches the id.  This will prevent it from making duplicate requests for efficiency.

## Filter Bar

The Filter Bar allows for dynamic changes to the list when entering the letters of a worker's name or id.

## Switch

The Switch feature allows for the list to be sorted by earliest or latest deadline, with earliest being the default.
