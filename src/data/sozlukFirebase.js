import firebase from 'firebase';

const DataService = {
guncelle(item) {
    firebase.database().ref('sozluks')
    .orderByChild('id')
    .equalTo(item.id)
    .on('value', (snap) => {
      snap.forEach((value) => {
        const tmp = {};
        const { name, aciklama, lang, lang2, kelimeler } = item;
        const a = value.val();
        a.name = name;
        a.aciklama = aciklama;
        a.lang = lang;
        a.lang2 = lang2;
        a.kelimeler = kelimeler;
        tmp[value.key] = a;
        firebase.database().ref('sozluks/').update(tmp);
        //alert(`Güncellemeee++++${JSON.stringify(tmp)}`);
      });
    });
}

};
  
export default DataService;
