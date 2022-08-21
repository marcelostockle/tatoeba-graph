require('dotenv').config()
const connectDB = require('./db/connect')
const Sentence = require('./models/sentence')

const jsonTatoeba = require('../tatoeba-json/data/jsonOutput.02.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        console.log('db connection successful...')
        // await Sentence.deleteMany()
        let batch = []
        for (let i = 0; i < jsonTatoeba.length; i++) {
            batch.push(jsonTatoeba[i])
            if (i % 100 === 0) {
                await Sentence.insertMany(batch)
                batch = []
            }
        }
        if (batch.length > 0) {
            await Sentence.insertMany(batch)
        }
        console.log('db population success')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
 }
start()