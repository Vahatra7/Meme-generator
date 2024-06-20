import React from "react";
import html2canvas from 'html2canvas';
// import memesData from "../memesData";


export default () => {
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    const [meme, setMeme] = React.useState({
        topText: "Shut up",
        bottomText: "and take my money",
        randomImage: "https://i.imgflip.com/3si4.jpg"
    })

    function handleText(event) {
        const { name, value } = event.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function updateUrl() {
        const urlIndex = Math.floor(Math.random() * allMemes.length)
        setMeme(prevState => ({
            ...prevState,
            randomImage: allMemes[urlIndex].url
        }))
    }

    const createdMeme = React.useRef()
    const downloadMeme = async () => {
        // const toDownload = document.getElementById("meme")
        const toDownload = createdMeme.current
        console.log(toDownload)
        const canvas = await html2canvas(toDownload, { allowTaint: true, useCORS: true })
        const data = canvas.toDataURL('image/png')
        const link = document.createElement('a')

        link.href = data
        link.download = 'downloaded-image.png'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    return (
        <main>
            <div className="form">
                <label className="formLabel">Top text
                    <input
                        className="formInput"
                        type="text"
                        name="topText"
                        value={meme.topText}
                        onChange={handleText}
                    />
                </label>

                <label className="formLabel">Bottom text
                    <input
                        className="formInput"
                        type="text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleText}
                    />
                </label>

                <button className="formButton" onClick={updateUrl}>Get a new meme image</button>
            </div>

            <div className="meme" ref={createdMeme}>
                <img className="memeImage" src={meme.randomImage} alt="random meme image" />
                <h2 className="topText">{meme.topText}</h2>
                <h2 className="bottomText">{meme.bottomText}</h2>
            </div>
            <button className="download" onClick={downloadMeme}>Download</button>
        </main>
    )
}