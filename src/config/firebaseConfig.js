import { SiteConfig } from "./siteConfig";
import { firebase } from "firebase";

var firebaseConfig = {
  apiKey: SiteConfig.firebaseAPIKey,
  authDomain: "socio-app-c551b.firebaseapp.com",
  databaseURL: "https://socio-app-c551b.firebaseio.com",
  projectId: "socio-app-c551b",
  storageBucket: "socio-app-c551b.appspot.com",
  messagingSenderId: "962545932422",
  appId: "1:962545932422:web:cacca517f5079bc62b1907",
  measurementId: "G-4WTGK7VQNL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
