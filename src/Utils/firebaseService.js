// src/Utils/firebaseService.js
import { db } from '../Config/firebase';
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore';

// Save pitch
export const savePitch = async (userId, pitch) => {
  try {
    const docRef = await addDoc(collection(db, 'pitches'), {
      userId,
      ...pitch,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving pitch:', err);
    return null;
  }
};

// Get pitches by user
export const getUserPitches = async (userId) => {
  try {
    // Only fetch pitches for this user
    const q = query(
      collection(db, 'pitches'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const pitches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return pitches;
  } catch (err) {
    console.error('Error fetching pitches:', err);
    return [];
  }
};
