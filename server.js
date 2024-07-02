import app from "./src/app.js";
import connectToMongodb from "./src/db/connectMongodb.js";
import processEnvVar from "./src/utils/processEnvVar.js";


const PORT = processEnvVar.PORT || 5000;

app.listen(PORT, () => {
    connectToMongodb()
    console.log(`Server is listening on: http://localhost:${PORT}`);
})