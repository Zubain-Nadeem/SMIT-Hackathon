// src/Utils/firebaseService.js
import { db } from "../Config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// Save a pitch
export const savePitch = async (userId, pitch) => {
  try {
    const docRef = await addDoc(collection(db, "pitches"), {
      userId,
      ...pitch,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving pitch:", error);
    return null;
  }
};

// Get all pitches for the current user
export const getUserPitches = async (userId) => {
  try {
    if (!userId) return [];

    const q = query(
      collection(db, "pitches"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user pitches:", error);
    return [];
  }
};
