# 🎮 Heliga Gibblocket - a social media app for gamers

Full-stack web app for Call of Duty gamers. Design is inspired by Twitter. Welcome to the Holy Gibb Bible. Your other home from Caldera/Verdansk. Post your thoughts, rank your teammates, view satistics + more.

A hobby project built over a longer period of time, constantly implementing new features as I progress in my coding journey.

The project is created for educational purposes. It is only being used by a small group of users.

If you like it, please drop a star 🙂

## Table of contents

- [Technologies](#technologies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Todo](#todo)
- [Author](#author)
 

## Technologies

#### Project is created with:

- React
- Next.js
- Tailwind CSS
- Tailwind Modals
- Firebase
- Node.js (writing cloud functions)
- Context api (state management)
- Netlify (hosting)
- Rapid api (fetching player statistics)
- react-beautiful-dnd (listing players)
- react-flip-move
- react-twitter-embed (displaying news)
- Hero icons
- react-intersection-observer (highlighting Post after notification-click)

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
![home2 0](https://user-images.githubusercontent.com/17027312/196687912-c0f678fa-419e-40f4-819a-dbcbfcf6752f.png)
![home2 1](https://user-images.githubusercontent.com/17027312/196687940-32991349-15d8-4ea6-9f7e-a19509df4b41.png)
![home2 3](https://user-images.githubusercontent.com/17027312/196687958-8f38d8b3-5d52-4141-84b8-21473fa56946.png)

### Home page mobile screen
![navmob1](https://user-images.githubusercontent.com/17027312/197584779-313cc16b-22a9-47df-9a67-606df87399d1.png)
![navmob2](https://user-images.githubusercontent.com/17027312/197584797-c09c5316-6bbb-4dfd-82c8-eb8eb7c1d85c.png)

 #### Post liked by (when pressing post-information button)
 ![postLikedBy2](https://user-images.githubusercontent.com/17027312/196688375-4125d5e7-807a-4963-8605-570d220252b8.png)

 #### Notifications page
 ![notifications2 0](https://user-images.githubusercontent.com/17027312/196689717-03698d3e-9b4f-4823-992c-f3bbc5efc11a.png)

 #### Profile page 
  ![profile benny desktop](https://user-images.githubusercontent.com/17027312/198875385-30ffc922-93be-4fe4-9b5a-74dc2198cacd.png)
  ![profile desktop](https://user-images.githubusercontent.com/17027312/198875613-563e82b5-3149-46be-a44a-caadde90e17a.png)

 ### Profile mobile screen
  ![bigMStats!](https://user-images.githubusercontent.com/17027312/200541188-37e68030-7a1e-4bb0-a0dd-1fbfa5816abd.png)
 ![nurrminatorProfileMobile](https://user-images.githubusercontent.com/17027312/200541397-1d62936e-2c64-4468-9c90-67b7e54906b9.png)

 #### Search page 
 ![search-nurrm](https://user-images.githubusercontent.com/17027312/193240518-8616f2c6-07a7-4736-8aee-ee924c9d1327.png)

 #### Lists page
 ![listFeed](https://user-images.githubusercontent.com/17027312/149803988-949211e6-cabb-4d72-8fc8-cc4f13fda5b5.png)
 
 #### List create modal
 ![listModal](https://user-images.githubusercontent.com/17027312/149804003-bfda1f3b-efe5-42a0-80de-de01a284651d.png)

#### Login screen
![login2](https://user-images.githubusercontent.com/17027312/196694811-fd299e19-6fe7-48d0-b6b2-e53681b93ce4.png)


## Todo

- Come up with a nicer design for Profile page + add logic for reviewing other players (strengths/weaknesses)
- In profile page see trend for k/d. ↘ or ↗ or  ➡️. Ok ✅
- Personal notification after being reviewed by another player OR when a player has updated his ***favorite saying*** 
- Come up with a better design for lists
- Come up with what Loadouts page should be
- Automatic scroll down to the corresponding post/list when user clicks on a notification + css animation highlighting the corresponding post. Ok ✅ 
- Comments on Posts? Ok ✅
- Use grid instead of flex for parent containers(Sidebar, Feed, Widgets)? -> cleaner.
- Make the mobile screen size more user firendly. Ok ✅
- Upgrade Firebase version so that we can install firebase-hooks in order to render loading indicator while verifying user.
- Error in the console when refreshing the site on the profile page
   - Refactor spaghetti code on profile-page (ok✅) and search-page.
- Add feature to edit user's info. 
   - if a user is edited (for example user has updated his userImage) add cloud function that handles updating user's info in posts/lists/comments
- Dark/light mode toggle button
   - Find colour palette for dark mode
- Paginate posts data
- Add a special celebration Post when a user has a new win. Ok ✅
   - Implement same feature but when user has increased(significantly) his k/d
- Database sanitation (delete nested data using cloud functions)


## Author

Created by Peter<br />
Website: [Peter resume](https://peter-portfolio-app.netlify.app/) <br />
[Instagram](https://www.instagram.com/petee_10/)<br />
[Linkedin](https://www.linkedin.com/in/peter-eriksson-13b8b1120/)

 
 
