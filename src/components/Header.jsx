import React from "react";
import pic from "/src/images/troll-face.png"

export default () => {
    return (
        <section className="header">
            <img className="headerImg" src={pic} alt="Troll face" />
            <h2 className="headerTitle">Meme Generator</h2>
            <p className="headerText">React - Project 2</p>
        </section>
    )
}