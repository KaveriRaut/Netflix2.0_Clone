import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwLVMIXBZvbjK2oXe9NVYVmMtEHjrywN0",
  authDomain: "final-react-netflix-clone.firebaseapp.com",
  projectId: "final-react-netflix-clone",
  storageBucket: "final-react-netflix-clone.appspot.com",
  messagingSenderId: "515342976843",
  appId: "1:515342976843:web:f52aa39bf35ac717a54ace",
  measurementId: "G-0FSQ32SZPB"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);