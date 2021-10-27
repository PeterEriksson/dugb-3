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
    <div className="w-full h-screen border-l border-grayish flex flex-col">
      <p className="mt-3 ml-3 font-bold text-2xl">Lists</p>
      <p className="font-light ml-3">
        Who is best at what? Customize your own lists and rank your team. Hot
        tip: it's probably not Martin. Hot tip 2: it's probably not Norman
        either. It doesn't matter. It's time for GIBB and that's what it's all
        about.
      </p>
    </div>
  );
}

export default listPage;
