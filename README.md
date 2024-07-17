# Around The U.S.

### Overview

This project is an interactive page where the user can add cards to the page, edit the profile information, and change the avatar image .

**Technologies**

The technologies utilized in this project begin with HTML and CSS programing to create the elements and styling on the page. All code is organized using a Flat File BEM Structure. Within the CSS styles, properties such as grid-templates-areas help to structure the main content by reducing and expanding the amount of rows and columns contained according to the screen width utilized to access the content. There are also several media queries implented at specific breakpoints to keep the page elements from conflicting as the page shrinks in width.

Next JavaScript programming comes into play, making the page responsive to the User's interaction. First, I began by giving the user the ability to manipulate the content on the page by way of forms which passed the user's input to various functions that rendered them to the page locally. I created several classes and sub-classes to create code that was reusable in several instances from rendering things to the page to updating user profile information.

Then I began converting the code to communicate with the server. I created an API class that sent various Fetch requests to the API with methods such as: GET, POST, PATCH, and DELETE. Finally I set up several .then, .catch, and .finally blocks to interact with the responses from the server to both render or remove things from the page and update the server with desired information. The cards on the page even have functioning like buttons and delete buttons, which update the server in regards to the like status and which cards should be romoved from the page.

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

**Images**
[def]: <images/Sprint 3 Project 1 Columns Example.jpg>
[def2]: <images/Sprint 3 Project 2 Columns Example.jpg>
[def3]: <images/Sprint 3 Project 3 Columns Example.jpg>

**Overview Video Link**
https://www.loom.com/share/288338034a5f436280581694ec26fd0f?sid=57fe0c32-1d8d-42fc-bcce-2cc447099170

**Link to deployed website**

https://rob915.github.io/se_project_aroundtheus/
