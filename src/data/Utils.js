const Utils = {
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, 
v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    },
    guid2() {
      return `${this.s4() + this.s4()  }-${  this.s4()  }-${  this.s4()  }-${ 
      this.s4()  }-${  this.s4()  }${this.s4()  }${this.s4()}`;
    },
    
    move(array, fromIndex, toIndex) {
      return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    },
  
    findTodo(todo, todoList) {
      return todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase());
    },
    getYuzde(deger, toplam) {
      return (deger * 100) / toplam;
    }
  };

  
  export default Utils;
  
