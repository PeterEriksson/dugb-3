function listPage() {
  const profiles = [
    {
      userName: "nurrminator",
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
    },
    {
      userName: "BigMme930",
      img: "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
    },
    {
      userName: "schmetir",
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <p className="mt-3 font-bold text-2xl">Lists</p>
      <p className="font-light">
        Who is best at what? Customize your own lists and rank your team
      </p>
    </div>
  );
}

export default listPage;
