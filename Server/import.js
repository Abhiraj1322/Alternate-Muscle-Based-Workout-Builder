const fs=require('fs')    ///read files
const path=require('path') // Helps with file/folder paths.
const mongoose=require('mongoose')
const Exercise=require("./models/Exercise")
require("dotenv").config()
const MONGO_URI = 'mongodb+srv://Abhirajd4:HQwna2DHMKnki3oO@cluster0.5pvkr.mongodb.net/Alternate-app?retryWrites=true&w=majority&appName=Cluster0';  

  const datadir=path.join(__dirname,'exercises')  //enter to the folder

  async function importExcercise(){
    try{
        const files=fs.readdirSync(datadir) ///read the files to the folder
        for(const file of files){               //readd each file
            const filepath=path.join(datadir,file); //this will descibe the file path
            const rawData=fs.readFileSync(filepath,'utf-8') ///this will read  file we given path
            const excercise=JSON.parse(rawData)   ///this parse data to json
     const excercises=[excercise]
     for(const ex of excercises){
        const fullimageUrl=(ex.images ||[]).map(img=>`${img}`)  //in this there is  image url 
         const newExercise = new Exercise({
          name: ex.name,
          force: ex.force,
          level: ex.level,
          mechanic: ex.mechanic,
          equipment: ex.equipment,
          primaryMuscles: ex.primaryMuscles,
          secondaryMuscles: ex.secondaryMuscles,
          instructions: Array.isArray(ex.instructions) ? ex.instructions.join(' ') : '',
          category: ex.category,
          images: ex.images,
          imageUrls: fullimageUrl,
          exerciseId: ex.id,
        });
    await newExercise.save();
    console.log(`saved :${ex.name}`);
    }
     console.log('🚀 All exercises imported!');

        }

    }
    catch(err){
console.error(`Eror importing exercise:`,err)
    }
    finally{
        mongoose.disconnect()
    }    
  }
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  importExcercise(); // Only runs after successful connection
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});