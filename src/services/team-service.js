import { firebase } from '../firebase/firebase.prod';

const db = firebase.firestore().collection('teams');

class TeamService {
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

  async get() {
    const snapshot = await db.get();
    const brackets = [];
    snapshot.forEach((doc) => {
      brackets.push({ id: doc.id, ...doc.data() });
    });
    return brackets.find((bracket) => !bracket.completed);
  }

  update(bracket) {
    let doc = db.doc(bracket.id);
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

export default new TeamService();
