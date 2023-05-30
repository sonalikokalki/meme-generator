import React, { useEffect, useState } from "react";
// import memesData from "../memesData";
export default function Meme() {
  // const [memeImage, setMemeImage] = useState(
  //                                     "https://i.imgflip.com/2gnnjh.jpg"
  //                                   );
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/2wifvo.jpg",
  });
  // const [allMemeImages, setAllMemeImages] = useState(memesData);
  // console.log(allMemeImages);
  const [allMemes, setAllMemes] = React.useState([]);

  //API call using fetch to get data from server
  //  React.useEffect(() => {
  //    fetch("https://api.imgflip.com/get_memes")
  //      .then((res) => res.json())
  //      .then((data) => setAllMemes(data.data.memes));
  //  }, []);

  //  Here is asyawait api call to make easy to understand api call
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
    return () => {
      // cleanup function
    };
  }, []);

  // get memes image
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  // prit text from input fields on to image
  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  console.log(meme);

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type="text"
          placeholder="Top Text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form--input"
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button className="get-meme-button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>

        <div className="meme">
          <img src={meme.randomImage} className="meme-image" />
          <div className="image--text">
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
