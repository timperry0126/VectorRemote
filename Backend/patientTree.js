class Node {
     constructor() {
          this.keys = {};
          this.entries = [];
     }

     addEntry = (entry) => {
          this.entries.push(entry);
     }
}

class Tree {
     constructor() {
          this.tree = new Node();
          this.head = this.tree;
     }

     addNode(name, value) {
          const charList = name.split('');
          let curPtr = this.head;

          for (const char of charList) {
               if(curPtr.keys[char]) {
                    curPtr = curPtr.keys[char];
               } else {
                    curPtr.keys[char] = new Node();
                    curPtr = curPtr.keys[char];
               }
          }

          curPtr.addEntry(value);
     }

     getAllEntriesUnder(prefix) {
          const charList = prefix.split('');
          let curPtr = this.head;
  
          for (const char of charList) {
              if (!curPtr.keys[char]) {
                  return [];
              }
              curPtr = curPtr.keys[char];
          }
  
          const result = [];
          this._collectEntries(curPtr, result);
          return result;
      }

      getAllEntries() {
          const result = [];
          this._collectEntries(this.head, result);
          return result;
      }
  
      _collectEntries(node, result) {
          result.push(...node.entries);
  
          for (const key in node.keys) {
              this._collectEntries(node.keys[key], result);
          }
      }
}

module.exports = Tree;