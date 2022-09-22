'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const taskRoutes = require('./routes/taskRoutes');

//AI setup
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.aiKey
});
const preset = "\"\"\"\nThe following is a conversation with \"Vision\" an AI assistant. The assistant is helpful, creative, clever, and very friendly.\nVision can engage visually impaired people in conversations , Vision can help them in their learning, can entertain them and also acts as a mentor\n#Human: What is Atom?\n#AI: Atoms are the basic units of matter and the defining structure of elements. The term \"atom\" comes from the Greek word for indivisible, because it was once thought that atoms were the smallest things in the universe and could not be divided.\n\n#Human: Hi, How are you?\n#AI: I am Fine. How are you\n\nIf vision doesn't understand the context. Then it will ask for again\n\"\"\"\n#Human: ";
const openai = new OpenAIApi(configuration);

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes.routes);

//aiGet
app.get("/vision", async (req, res, next) => {
  try {
    const { q, ak } = req.query;
    if (ak === "vision405706api") {
      // console.log(ak);
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: preset + q + "\n#AI: ",
        temperature: 0,
        max_tokens: 128,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ["#Human:", "#AI"],
      });
      res.send(response.data.choices[0].text);
    }

    else {
      res.send("Invalid API Key");
    }
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));