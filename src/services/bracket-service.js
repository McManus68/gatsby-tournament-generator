import { firebase } from '../firebase/firebase.prod';

const db = firebase.firestore().collection('brackets');

class BracketService {
  async getAll() {
    const snapshot = await db.get();
    const brackets = [];
    snapshot.forEach((doc) => {
      brackets.push({ id: doc.id, ...doc.data() });
    });
    return brackets;
  }

  create(bracket) {
    let doc = db.doc();
    return doc.set(bracket).then(() => {
      return { ...bracket, id: doc.id };
    });
  }

  update(key, bracket) {
    let doc = db.doc(key);
    return doc.set(bracket);
  }

  delete(key) {
    return db.doc(key).delete();
  }

  deleteAll() {
    this.getAll().then((brackets) => {
      brackets.map((bracket) => {
        this.delete(bracket.id);
      });
    });
  }
}

export default new BracketService();
