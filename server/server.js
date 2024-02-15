require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const app = express();
const port = 5200;

app.use(cors());
app.use(express.json());

const placeholderDuck = 'https://cdn.pixabay.com/photo/2017/01/30/10/59/animal-2020580_1280.jpg';

app.post("/create-panel", async (req, res) => {
  try{

    //const panelPrompt = req.body.panelPrompt; prompt input

    console.log("loading panel");

    // working URL generation
    const panel = await openai.images.generate({model: "dall-e-3", prompt: "A cute mandarin duck!"});
    const panelURL = panel.data[0].url;
    console.log("server log panel data ---");
    console.log(panel.data[0].url);
    console.log("server log ---");


    //const panelURL = placeholderDuck;
    res.json({panelURL: panelURL});
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.status(500).send("Could not create panel.");
  }
})


app.listen(port, () => {console.log('Server started on port 5200')});