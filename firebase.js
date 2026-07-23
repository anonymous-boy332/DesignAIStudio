// Firebase Setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";


const firebaseConfig = {

apiKey: "AIzaSyBD-I5z-_ZIziYoZAFM0aVBux9pTAbNRMc",
authDomain: "ai-design-studio-3b3f8.firebaseapp.com",
projectId: "ai-design-studio-3b3f8",
storageBucket: "ai-design-studio-3b3f8.firebasestorage.app",
messagingSenderId: "502800956636",
appId: "1:502800956636:web:1ab85dbe1feb65ab41c819",
measurementId: "G-4F2XLKK801"

};


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

export { app, db };