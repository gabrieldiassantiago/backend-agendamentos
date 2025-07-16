import admin from "firebase-admin";
import { readFileSync } from 'fs';

const service = JSON.parse(readFileSync('src/config/key.json', 'utf8'));


admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: "https://nupotato-426aa-default-rtdb.firebaseio.com" 
});

export const bucket = admin.storage().bucket("gs://nupotato-426aa.appspot.com");