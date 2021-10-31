import Post from "./Post";
import Tweetbox from "./Tweetbox";

/* text area max w 576 px xl ...?*/

function Feed() {
  const posts = [
    {
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
      fullName: "Peter Eriksson",
      userName: "schmetir",
      postText:
        "Ny lista av undertecknad publicerad. Ni bör ha fått notis. In o kolla. Håller du med? Inte? Ge dig in i matchen, gör din egna och börja svinga!",
      postImg: "",
    },

    {
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
      fullName: "Andreas Norman",
      userName: "nurrminator",
      postText: "När droppar vi igen kamrater?",
      postImg:
        "https://i.pinimg.com/236x/56/fa/af/56faaf2b6e15bde373ed05d1bd00d7d1.jpg",
    },

    {
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
      fullName: "Peter Eriksson",
      userName: "schmetir",
      postText: "Vill inte nämna några namn men Norman vad håller du på med?",
      postImg: "",
    },

    {
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
      fullName: "Andreas Norman",
      userName: "nurrminator",
      postText: "Jag med.",
      postImg: "https://media.giphy.com/media/OKz0chgzax6tr6zDMv/giphy.gif",
    },

    {
      img: "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
      fullName: "Martin Eriksson",
      userName: "BigMme930",
      postText: "Jag hatar gulag",
      postImg:
        "https://i.pinimg.com/236x/3c/77/f1/3c77f15815aaa71cb85f376dbc2d5c72.jpg",
    },
  ];
  return (
    <div className="flex flex-col  ">
      {posts.map((item, i) => (
        <Post item={item} key={i} />
      ))}
    </div>
  );
}

export default Feed;
