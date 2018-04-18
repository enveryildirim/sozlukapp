import realm from './realm';
import U from './Utils';

const dbTable = 'Sozluk';
const DataService = {
    findAll() {
      return realm.objects(dbTable);
    },
    getAllKelimeler(sozluk) {
      return sozluk.kelimeler;
    },
    getSozluk(id) {
      return realm.objectForPrimaryKey(dbTable, id);
    },
    getKelime(id) {
      return realm.objectForPrimaryKey('Kelime', id);
    },
    newKelime(sozluk, kelime) {
      realm.write(() => {
        kelime.id = U.guid();
        sozluk.kelimeler.push(kelime);
      });
    },
    updateKelime(kelime) {
      realm.write(() => {
        alert(JSON.stringify(kelime));
        const k = realm.objectForPrimaryKey('Kelime', kelime.id);
        k.kelime = kelime.kelime;
        k.cevap = kelime.cevap;
        k.aciklama = kelime.aciklama;
      });
    },
    save(sozluk) {
      realm.write(() => {
        sozluk.id = U.guid();
        return realm.create(dbTable, sozluk);
      });
    },
    updateGosterim(kelime) {
      realm.write(() => {
        kelime.toplam += 1;
      });
    },
    updateDogru(kelime) {
      realm.write(() => {
        kelime.dogru += 1;
      });
    },
    updateYanlis(kelime) {
      realm.write(() => {
        kelime.yanlis += 1;
      });
    },
    update(sozluk) {
      realm.write(() => {
        return realm.create(dbTable, sozluk, true);
      });
    },

    delete(sozluk) {
      realm.write(() => {
        realm.delete('Sozluk', sozluk);
      });
    },
    init() {
      realm.write(() => {
        realm.deleteAll();
        const s1 = { id: U.guid(), name: 'beginner', aciklama: 'questions', lang: 'en', lang2: 'tr', kelimeler: [] };
        const k1 = { id: U.guid(), kelime: 'what', cevap: 'ne', aciklama: 'question' };
        const k2 = { id: U.guid(), kelime: 'why', cevap: 'neden', aciklama: 'question' };
        const k3 = { id: U.guid(), kelime: 'where', cevap: 'nerede', aciklama: 'question' }; 
        s1.kelimeler.push(k1);
        s1.kelimeler.push(k2);        
        s1.kelimeler.push(k3);
        const s2 = { id: U.guid(), name: 'colors', aciklama: 'colors', lang: 'en', lang2: 'tr', kelimeler: [] };
        const k21 = { id: U.guid(), kelime: 'red', cevap: 'kırmızı', aciklama: 'question' };
        const k22 = { id: U.guid(), kelime: 'black', cevap: 'siyah', aciklama: 'question' };
        const k23 = { id: U.guid(), kelime: 'blue', cevap: 'mavi', aciklama: 'question' }; 
        s2.kelimeler.push(k21);
        s2.kelimeler.push(k22);
        s2.kelimeler.push(k23);
        
        realm.create(dbTable, s1);
        realm.create(dbTable, s2);
      });
    }
  };
  
export default DataService;
