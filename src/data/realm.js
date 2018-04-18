////////////////////////////////////////////////////////////////////////////
//
// Copyright 2016 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
//
// Copyright 2016 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////


import Realm from 'realm';
import Utils from './Utils';

export class Kelime extends Realm.Object {
}
Kelime.schema = {
    name: 'Kelime',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', default: Utils.guid2() },
        kelime: 'string',
        cevap: 'string',
        aciklama: 'string?',
        toplam: { type: 'int', default: 0 },
        dogru: { type: 'int', default: 0 },
        yanlis: { type: 'int', default: 0 }
    },
};

class Sozluk extends Realm.Object {
}
Sozluk.schema = {
    name: 'Sozluk',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', default: Utils.guid2() },
        name: 'string',
        aciklama: 'string?',
        lang: 'string',
        lang2: 'string',
        publish: { type: 'bool', default: false },
        kelimeler: { type: 'list', objectType: 'Kelime', default: [] },
    },
};

export default new Realm({ schema: [Sozluk, Kelime], deleteRealmIfMigrationNeeded: true });

