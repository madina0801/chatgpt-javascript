import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

const app = express();

// allow our server to be called from a frontend
app.use(cors());

// pass json from the frontend to the backend
app.use(express.json());

app.post('/', async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${prompt}`,
			temperature: 0,
			max_tokens: 1000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
			stop: ["\"\"\""],
		})

		res.status(200).send({
			bot: response.data.choices[0].text,
		})
	} catch (error) {
		console.log(error);
		res.status(500).send({ error });
	}
})

app.listen(3000, () => {console.log("Listening on port 3000!")});