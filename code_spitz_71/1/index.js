const Table =(_=>{
    const Private = Symbol(), render = Symbol();

    return class{
        constructor(parent){
            if(typeof parent != 'string' || !parent) throw "invalid param";
            this[Private] = {parent};
        }
        // load(url){
        //     fetch(url).then(response=>{ //fetch는 ajax를 대체하여 만들어짐. promise를 반환
        //         return response.json();
        //     }).then(json=>{
        //         this._render(); //this가 유지되는 이유는 arrow 함수기 때문에 this를 새로 만들지 않는다.
        //     });
        // } 아래 코드로 대체. 직렬 코드로 바뀜
        async load(url){
            const response = await fetch(url);
            if(!response.ok) throw "invalid response";
            const json = await response.json();
            const {title, header, items} = json;
            if(!items.length) throw "no items";
            Object.assign(this[Private], {title, header, items});
            this._render();
        }
        _render(){
            //알고리즘을 짤때 의사코드를 먼저 구성한다.
            //부모, 데이터 체크
            //table 생성
            //캡션을 title로
            //header를 thead로
            //items를 tr로
            //부모에 table삽입

            const fields = this[Private], parent = document.querySelector(fields.parent);
            if(!parent) throw "invalid parent";
            if(!fields.items || !fields.items.length){
                parent.innerHTML = "no data";
                return;
            }else parent.innerHTML = "";
            const table = document.createElement("table");
            const caption = document.createElement("caption");
            caption.innerHTML = fields.title;
            table.appendChild(caption);
            table.appendChild(
                fields.header.reduce((thead, data)=>{
                    const th = document.createElement("th");
                    th.innerHTML = data;
                    thead.appendChild(th);
                    return thead;
                }, document.createElement("thead"))
            );
            parent.appendChild(
                fields.items.reduce((table, row)=>{
                    table.appendChild(
                        row.reduce((tr,data)=>{
                            const td = document.createElement("td");
                            td.innerHTML = data;
                            tr.appendChild(td);
                            return tr;
                        }, document.createElement("tr"))
                    );
                    return table;
                }, table)
            );
        }
    };
})();



const table = new Table("#data");
table.load("71_1.json");

// DATA LOAD와 RENDERING분리하기
// 데이터 공급자와 렌더링이 협력하는 관계
// 값으로 들어온 것을 객체로 바꿔야한다.
// 반드시 일어나는 코드의 묶음은 트랜잭션이다.
// const data = new JsonData("71_1.json");

// const renderer = new Renderer();
// renderer.render(data); // 비동기 코드를 동기 코드에서 돌리려면 thenable해야한다.

const Info = class{
    constructor(json){
        const {title, header, items} = json;
        if(typeof title != 'string' || !title) throw "invalid title";
        if(!Array.isArray(header) || !header.length) throw "invalid header";
        if(!Array.isArray(items) || !items.length) throw "invalid items";
        items.forEach((v, idx) => {
            if(!Array.isArray(v) || v.length != header.length){
                throw "invalid items: " + idx;
            }
        });
        this._private = {title, header, items};
    }
    get title(){return this._private.title;}
    get header(){return this._private.header;}
    get items(){return this._private.items;}
}

const Data = class{
    async getData(){ // 외부계약(컴파일 타임에 일어난다.)
        const json = await this._getData(); // _getData에게 위임
        return new Info(json);
    }
    async _getData(){throw "_getData must override";} // 내부계약(런타임에 일어난다.)
};

const JsonData = class extends Data{
    constructor(data){
        super();
        this._data = data;
    }
    async _getData(){
        let json;
        if(typeof this._data == 'string'){
            const response = await fetch(this._data);
            json = await response.json();
        }else return this._data;
    }
}
// 특수한 테이터를 보낸다는 계약을 맺어야 한다. VALUE => OBJECT
// info를 공급하는 관계고 info는 title, header, items를 포함해야한다.
const Renderer = class{
    constructor(){}
    async render(data){
        if(!(data instanceof Data)) throw "invalid data type";
        const _info = await data.getData(); // data 시스템이 변화해도 변화하지 않는다.
        this._render();
    }
    _render(){
        throw "_render must override";
    }
}

const TableRenderer = class extends Renderer{
    constructor(parent){
        if(typeof parent != 'string' || !parent) throw "invalid param";
        super();
        this._render();
    }
    _render(){
        const parent = document.querySelector(this._parent);
        if(!parent) throw "invalid parent";
        parent.innerHTML = "";
        const [table, caption] = "table,caption".split(",").map((v=>document.createElement(v)));
        caption.innerHTML = this._info.title;
        table.appendChild(caption);
        table.appendChild(
            this._info.header.reduce(
                (thead, data)=>(thead.appendChild(document.createElement("th")).innerHTML = data, thead),
                document.createElement("thead"))
        );
        parent.appendChild(
            this._info.items.reduce(
                (table, row)=>(table.appendChild(
                    row.reduce(
                        (tr, data)=>(tr.appendChild(document.createElement("td")).innerHTML = data, tr),
                        document.createElement("tr"))
                ), table),
            table)
        );
    }
}

// 객체지향 프로그래밍에서는 객체의 형을 판정한다. type oriented programming

// Info라는 프로토콜에 의존하기 때문에 상호 의존성이 낮아짐.

// 객체가 단일 역할을 수행하고 있는가?
// Data형이 Info 객체를 보장해야 코드가 성립한다.
// Info객체를 제공하는 의무는 Data에게 있음을 알게 되었다.
// 내부계약을 맺음으로써 강한 응집성, 약한 의존성이 구현됌.
// readable하게 만드려면 알고리즘화를 벗어나야 한다.
// 협력관계로 만들어야함.(메세지 밖에 없다.)
// arrow 연산자가 좀더 빨리 발동되길 원하면 ()연산자를 써준다.