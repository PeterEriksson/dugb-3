# 🎮 Det Heliga Gibblocket - a social media app for gamers

Web app for Call of Duty gamers. Design is inspired by Twitter. Welcome to the Holy Gibb Bible. Your other home from Caldera/Verdansk. Post your thoughts, rank your teammates, view satistics + more.

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

#### List page
 ![listFeed](https://user-images.githubusercontent.com/17027312/149803988-949211e6-cabb-4d72-8fc8-cc4f13fda5b5.png)

#### List create modal
 ![listModal](https://user-images.githubusercontent.com/17027312/149804003-bfda1f3b-efe5-42a0-80de-de01a284651d.png)

#### Profile page 
 ![profilePage](https://user-images.githubusercontent.com/17027312/149804028-4db7e730-9424-4e37-a5c0-b3113b08588a.png)

#### Login
 ![Login](https://user-images.githubusercontent.com/17027312/149804056-3cd127c9-35be-42cb-a05e-c109e54d99e1.png)


## Todo

- Come up with a nicer design for Profile page + add logic for reviewing other players (strengths/weaknesses)
- Personal notification after being reviewed by another player
- Come up with a better design for lists
- Come up with what Loadouts page should be
- Automatic scroll down to the corresponding post/list when user clicks on a notification
- Dark mode
- subPost collection (answer a certain post)
- Use grid instead of flex for the parent container of sidebar+page-content+widgets
- Make the mobile screen size more user firendly
- Upgrade Firebase version so that we can install firebase-hooks in order to render loading indicator while verifying user.
- Error in the console when refreshing the site on the profile page

## Author

Created by Peter<br />
Website: [Peter resume](https://peter-portfolio-app.netlify.app/) <br />
[Instagram](https://www.instagram.com/petee_10/)<br />
[Linkedin](https://www.linkedin.com/in/peter-eriksson-13b8b1120/)

## Setup

To run this project, install it locally using npm. Then, run the development server:

```
$ npm install
$ npm run dev
```
Open http://localhost:3015 with your browser to see the result.
 
