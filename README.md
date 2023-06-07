# Assignment 1

## Name: L.S.A Mourya
## Roll Number: 2021101121 

1. Run 'sudo docker-compose build' and 'sudo docker-compose up' to open the website in localhost:8080.
2. Run 'sudo docker-compose down' to stop it.
3. I implemented tag filter in such a way that we enter the required tag in the search bar and not like a dropdown menu. If the search bar is empty, it'll show all the subgreddiits.
4. I displayed email of the user(as it is unique) whenever we are asked to display the user in some form.
5. Everytime we open a subgreddiit, we get a random image and not the same image. Same goes for the icons in dashboard too.
6. Whenever we login, we go into a page called dashboard which contains nothing.
7. Profile page displays user details,followers and following where the users in followers and following will be displayed once we click the button containing the number.
8. Whenever we open a subgreddiit, we go into a page called '/allsubgreddiits/:id' where :id is the id of the subgreddiit.
9. We can control a post from the saved posts too if we are the admin or member of the subgreddiit.
10. We can save,upvote,downvote,report or comment on a post only if we are a member or admin of the subgreddiit.
11. Everyone can see reports in a subgreddiit but only the admin can handle them.
12. Only the admin can see the joining requests. For others, the page will open but it is empty.
13. Everyone can see users of a subgreddiit.
14. Tags and banned keywords should be separated by a comma.
