import realm from './realm';



const DataService = {
    getAll(sortBy) {
      if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
      return realm.objects(db_table).sorted(sortBy);
    },
  
    save(sozluk) {
      realm.write(() => {
        realm.create(db_table, sozluk);
      });
    },
  
    update(sozluk, callback) {
      if (!callback) return;
      realm.write(() => {
        realm.create(db_table, sozluk, true);
      });
    },

    delete(sozluk) {
      realm.write(() => {
        realm.delete('Sozluk', sozluk);
      });
    }
  };
  
export default DataService;
