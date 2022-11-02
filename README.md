# Giphy Search and Favorites

A Giphy searching and favoriting application allows users to save images and sort them into categories. This project utilizes React, Redux, Redux-Saga and integrates them with a 3rd party API.

## Create Database and Tables

See the `database.sql` file for database setup and details. It offers some of the SQL to get you started but you'll need to set up your tables and the relationships between them.

## Development Setup Instructions

* Run `npm install`
* Run `npm run server` to start the server
* Run `npm run client` to start the client
* Navigate to `localhost:3000`

### Search View

- [x] Allow a user to enter a search string and submit a search request.
- [x] Query the `Giphy API Search Endpoint` with the given search string **FROM THE SERVER**.
- [x] Display the results on the DOM.
- [x] Allow a user to Favorite any of the resulting images. 

### Favorites View

- [x] Allow a user to see all of the Giphy images they have Favorited. The actual images need to appear on the DOM.
- [x] Allow a user to set a category for a favorite image.
    - Each favorite image can only have 1 category at a time.
    - The category needs to be one of the categories in the database.
- [x] Allow a user to delete a favorited image

## Existing Routes

You are given two router modules on the server with stubs for the routes you may need.

- [x] `GET /api/category` (complete)
    - Returns a list of all categories from the table ordered by name. You may test it if your server is running: [http://localhost:5000/api/category](http://localhost:5000/api/category)

- [x] `POST /api/favorite` (incomplete)
    - For adding a new favorite image. You'll need to think about what is needed. Does it need a category?

- [x] `PUT /api/favorite` (incomplete)
    - For setting a category on an image. It expects both a query parameter and a data body. Feel free to change it as needed.
