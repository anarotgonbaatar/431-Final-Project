# Final Project: User Profile with Login

For this project you will design and develop a simple web application that integrates the concepts of Server/Client Relationships, HTTP Requests, Database Integration, Basic User Authentication and Data Persistence. To Summarize: You need to create a web application that allows a potential user to sign up, input some profile information and then log in to view or update their profile. They should also be able to log out. Their profile details should be secured so that they can only be seen if the user is logged in. You should use some type of persistence technology such as tokens, sessions or cookies to maintain the user's logged in state and allow them to log out.

You will be graded on how well your application performs the listed capabilities and complies with the listed constraints. Points will be evenly distributed and divided by the overall number of capabilities and constraints. Some capabilities or constraints may be more complicated or difficult than others but all will be weighted equally.

## Capabilities (45% of Grade)

Your application needs to have or perform the following capabilities:

1. Allow the instructor to initialize your database by running a script or inputting relevant database information
2. Display a page with an invitation to register or log in for any new visitor who is not already logged in.
3. Display a page with profile information (listed below) for any registered user who is also logged in.
4. Allow an unregistered user to register by submitting the following profile information:
   1. Username (String) - Will be used to log in
   2. Password (String) - Will be used to log in - do not display on any page
   3. Email (String, Formatted as an Email [a@b.c] )
   4. First Name (String)
   5. Last Name (String)
   6. Birthday (Date)
   7. Biography (String)
   8. Favorite Number (Integer)
   9. Profile Picture (File/Binary Data in JPG format) [Optional for registration]
5. Allow a logged-in user to upload a Profile Picture to be stored on the server
6. Allow a registered user to log in by submitting their Username and Password
7. Allow a logged-in user to edit their profile information and permanently update it.
8. Allow a logged-in user to log out so their default view goes back to the scenario outlined in Capability #1.
9. Display an error message when a user attempts to submit invalid information, which includes:
   1. Attempts log in but enters the wrong password or a non-existent username
   2. Submits profile information that doesn't adhere to the data types or file types listed in Capability #4

## Constraints (50% of Grade)

In addition to providing the capabilities listed, your application must adhere to these specific guidelines:

1. Your web application must consist of two distinct applications: A server application and a client application
2. Your client application must be an HTML web page using CSS and JavaScript for styling and functionality.
3. Your server application must act as an API which accepts HTTP Requests

   - Acceptable server technologies include: Node.js (recommended), PHP, Python (Flask, Django or FastAPI) or Microsoft .NET (Current version)

4. You must store all profile information except profile images in a database

   - Acceptable databases include: MongoDB (recommended), MySQL, MariaDB or SQLite

5. Passwords must not be stored in the database (use a Hash of the password instead)
6. You must store profile images as .jpg files in a directory where your server application executes.
7. Logged in users should maintain their "logged in" status even if they close and re-open the browsers

   - You may use JWT (JSON Web Tokens) or Cookies to accomplish persistence
   - You mat not use localStorage() for data persistence

8. Your user interface should adhere to some basic WCAG 2.0 accessibility principles to an external site.

   - Specifically: Provide sufficient color contrast, use alt tags and titles where appropriate, avoid environment-specific language and use semantic HTML elements.

9. Your HTML, CSS and JavaScript should all be valid and follow modern standards where possible

   - I recommend using an HTML ValidatorLinks to an external site., CSS ValidatorLinks to an external site. and a JavaScript ValidatorLinks to an external site.

10. Use principles of good document design to create interfaces that are clear, concise and facilitate ease of use for your application.

## Deliverables (5% of Grade)

You will upload a .zip file containing everything required to execute your server and client applications as well as a readme file (can be .txt or .md format) that contains any specific instructions on how to set up and run your project. I will attempt to follow any instructions you provide, including on how to set up the database. You may provide scripts, queries or instructions on how to get your database properly setup to work with your server application.

DO NOT INCLUDE node_modules FOLDERS FOR NODE.JS PROJECTS. One simple way to avoid adding these is to copy your project folder to a new location and then delete the node_modules folder before compressing the parent folder to submit.
