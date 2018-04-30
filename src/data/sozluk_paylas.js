import firebase from 'firebase';
import db from './sozluk';
import { Actions } from 'react-native-router-flux';
const DataService = {
   
    findAll() {
      return [];
    },
    ekle(id, sozluk) {
        //update yapılacaak
            const { currentUser } = firebase.auth();
            if (currentUser) {
           /* firebase.database().ref(sozluk)
            .orderByChild('id')
            .equalTo(sozluk.id)
            .on('value', (snap) => {*/
            const data = { ...sozluk, userid: currentUser.uid, indirilme: 0, publish: true };
            firebase.database().ref('sozluks/')
            .push(data)
            .then(a => {
                db.update({ ...sozluk, publish: true });
            });
        /*});*/
        } else {
            alert('Login olmanız lazım');
        }
    },
    guncelle(id, sozluk) {
            const { currentUser } = firebase.auth();
            const data = { ...sozluk, userid: currentUser.uid };
            firebase.database().ref(`sozluks/${id}/`)
            .update(sozluk)
            .then(value => {
                alert('sozluk eklemesi başarılı');       
            })
            .catch((err) => {
                console.log(err);
            });
    },
    

  };
  
export default DataService;
