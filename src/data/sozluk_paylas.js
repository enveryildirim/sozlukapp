import firebase from 'firebase';

const DataService = {
    init(){
        return firebase.auth().signInWithEmailAndPassword('a@mail.com', '123456');
    },
    findAll() {
      return [];
    },
    ekle(id, sozluk) {
        //update yapılacaak
        
            const { currentUser } = firebase.auth();
            if(currentUser){
            const data = { ...sozluk, userid: currentUser.uid, indirilme: 0 };
            firebase.database().ref('sozluks/')
            .push(data)
            .then(value => {
                alert('sozluk eklemesi başarılı');       
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            alert("Login olmanız lazım");
        }
    },
    guncelle(id, sozluk) {
        firebase.auth().signInWithEmailAndPassword('a@mail.com', '123456').then(a => {
            const { currentUser } = firebase.auth();
            const data = { ...sozluk, userid: currentUser.uid };
            firebase.database().ref('sozluks/' + id + '/')
            .update(sozluk)
            .then(value => {
                alert('sozluk eklemesi başarılı');       
            })
            .catch((err) => {
                console.log(err);
            });
        });
    },
    

  };
  
export default DataService;
