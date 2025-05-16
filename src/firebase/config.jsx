import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA-K2GyROIcugZADMn2cX0KNDAqIAC6NKc",
  authDomain: "netflix-web-auth.firebaseapp.com",
  projectId: "netflix-web-auth",
  storageBucket: "netflix-web-auth.firebasestorage.app",
  messagingSenderId: "992419510450",
  appId: "1:992419510450:web:ac96f6ee6ee09c3d46b1ab",
  measurementId: "G-7PXQLQCD67"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    