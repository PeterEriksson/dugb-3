# 🎮 Det Heliga Gibblocket - a social media app for gamers

Full-stack web app for Call of Duty gamers. Design is inspired by Twitter. Welcome to the Holy Gibb Bible. Your other home from Caldera/Verdansk. Post your thoughts, rank your teammates, view satistics + more.

A hobby project built over a longer period of time, constantly implementing new features as I progress in my coding journey.

The project is built for educational purposes. It is only being used by a small group of users.

## Table of contents

- [Technologies](#technologies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Todo](#todo)
- [Author](#author)
- [Setup](#setup)

 

## Technologies

#### Project is created with:

- React
- Next.js
- Tailwind CSS
- Tailwind Modals
- Firebase
- Node.js (writing cloud functions)
   - For generating personal notifications when a user has posted/liked/created list. Theoratically possible to implement on client side, but after researching the topic I found that cloud functions should be used. 
- Context api (state management)
- Netlify (hosting)
- Rapid api (fetching player statistics)
- react-beautiful-dnd (listing players)
- react-flip-move
- react-twitter-embed (displaying news)
- Hero icons

## Features

- Login (email + password)
- Share and like posts
- Create lists
- Personal notifications
- View statistics
- Responsive design
- Guest mode
- View latest news

## Screenshots
#### Home page 
 ![homePage2](https://user-images.githubusercontent.com/17027312/149806666-d75845c1-04a8-4405-9bd2-ab15e731d3ab.png)
 
 #### Post liked by (when pressing information button)
 ![likedBy2](https://user-images.githubusercontent.com/17027312/149806642-3f404397-e5bc-4547-be1b-df34f7dda977.png)
 
 #### Notifications page
  ![notifications2](https://user-images.githubusercontent.com/17027312/149807459-40c1612c-024c-4b63-bd8c-0554d704ff18.png)
 
 #### Profile page 
 ![profile-benny](https://user-images.githubusercontent.com/17027312/193241554-ff57ab8f-6acb-4ace-b2ab-4abee7ef5249.png)
 
 #### Search page 
 ![search-nurrm](https://user-images.githubusercontent.com/17027312/193240518-8616f2c6-07a7-4736-8aee-ee924c9d1327.png)

 #### Lists page
 ![listFeed](https://user-images.githubusercontent.com/17027312/149803988-949211e6-cabb-4d72-8fc8-cc4f13fda5b5.png)
 
 #### List create modal
 ![listModal](https://user-images.githubusercontent.com/17027312/149804003-bfda1f3b-efe5-42a0-80de-de01a284651d.png)

#### Login/Register/Guest screen
 ![Login](https://user-images.githubusercontent.com/17027312/149804056-3cd127c9-35be-42cb-a05e-c109e54d99e1.png)


## Todo

- Come up with a nicer design for Profile page + add logic for reviewing other players (strengths/weaknesses)
- In profile page see trend for k/d. ↘ or ↗ or  ➡️. Ok ✅
- Personal notification after being reviewed by another player OR when a player has updated his ***favorite saying*** 
- Come up with a better design for lists
- Come up with what Loadouts page should be
- Automatic scroll down to the corresponding post/list when user clicks on a notification + css animation highlighting the corresponding post. Ok ✅ 
- Comments on Posts? Ok ✅
- Use grid instead of flex for parent containers(Sidebar, Feed, Widgets)? -> cleaner.
- Make the mobile screen size more user firendly
- Upgrade Firebase version so that we can install firebase-hooks in order to render loading indicator while verifying user.
- Error in the console when refreshing the site on the profile page
   - Refactor spaghetti code on profile-page and search-page
- Add feature to edit user's info. 
   - if a user is edited (for example user has updated his userImage) add cloud function that handles updating user's info in posts/lists/comments
- Dark/light mode toggle button
   - Find colour palette for dark mode
- Paginate posts data
- Add a special celebration Post when a user has a new win. Ok ✅


## Author

Created by Peter<br />
Website: [Peter resume](https://peter-portfolio-app.netlify.app/) <br />
[Instagram](https://www.instagram.com/petee_10/)<br />
[Linkedin](https://www.linkedin.com/in/peter-eriksson-13b8b1120/)

 
 
