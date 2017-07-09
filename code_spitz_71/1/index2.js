
// DATA LOAD와 RENDERING분리하기
// 데이터 공급자와 렌더링이 협력하는 관계
// 값으로 들어온 것을 객체로 바꿔야한다.
// 반드시 일어나는 코드의 묶음은 트랜잭션이다.

// const Table =(_=>{
//     const Private = Symbol();
//     return class{
//         constructor(parent){}
//         async load(url){}
//         _render(){}
//     }
// });
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
            return await response.json();
        }else return this._data;
    }
};
// 특수한 테이터를 보낸다는 계약을 맺어야 한다. VALUE => OBJECT
// info를 공급하는 관계고 info는 title, header, items를 포함해야한다.
const Renderer = class{
    constructor(){}
    async render(data){
        if(!(data instanceof Data)) throw "invalid data type";
        this._info = await data.getData(); // data 시스템이 변화해도 변화하지 않는다. // this._info에 값을 넣어주어야 extends 하여 실행이 됌
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
        this._parent = parent;
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
};

// 객체지향 프로그래밍에서는 객체의 형을 판정한다. type oriented programming

// Info라는 프로토콜에 의존하기 때문에 상호 의존성이 낮아짐.

// 객체가 단일 역할을 수행하고 있는가?
// Data형이 Info 객체를 보장해야 코드가 성립한다.
// Info객체를 제공하는 의무는 Data에게 있음을 알게 되었다.
// 내부계약을 맺음으로써 강한 응집성, 약한 의존성이 구현됌.
// readable하게 만드려면 알고리즘화를 벗어나야 한다.
// 협력관계로 만들어야함.(메세지 밖에 없다.)
// arrow 연산자가 좀더 빨리 발동되길 원하면 ()연산자를 써준다.

const data = new JsonData("71_1.json");

const renderer = new TableRenderer("#data");
renderer.render(data);

// 추가 내용
// 개선점 1
// Renderer 함수를 자세히 보면 
// 규약으로 정해놓은 Info뿐만아니라 Data(DataSupplier: 비동기를 구현할 수 있게 thenable로 데이터를 받을 뿐 getData만 제공하는 역할이므로 DataSupplier이다.)에도 의존하고 있다.
// Data(DataSupplier)의 의존성을 제거하면
const Renderer2 = class{
    async render(info){ // Info를 전달받음.
        if(!(info instanceof Info)) throw "data is NOT Info type";
        this._info = info;
        this._render();
    }

    _render(){throw "render must be overriden"}
}

const TableRenderer2 = class extends Renderer2{
    constructor(parent){
        if(typeof parent != 'string' || !parent) throw "invalid param";
        super();
        this._parent = parent;
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

const infoPromise = data.getData(); // thenable로 받음
infoPromise.then(info=>{
    const renderer = new TableRenderer2("#data");
    renderer.render(info); // info를 전달한다.
});
// Info를 전달받으면서 Data(DataSupplier)에 의존하지 않고, Info에만 의존하게 되었다.

// 개선점 2
// TableRenderer에서 문제점이 하나 더 보인다.
// TableRenderer는 Info 객체의 존재를 모르는데 Info 객체를 그대로 받아온 this._info의 this._info.title 속성을 그대로 코드에서 사용하고 있다.
// 개선하려면 TableRenderer가 Info의 속성을 모르고 Renderer의 속성만 알게하면 된다.
const Renderer3 = class{
    async render(info){
        if(!(info instanceof Info)) throw "data is NOT Info type";
        this._title = info.title;
        this._header = info.header;
        this._items = info.items;
        this._render();
    }

    _render(){throw "render must be overriden"}
}

const TableRenderer3 = class extends Renderer3{
    constructor(parent){
        if(typeof parent != 'string' || !parent) throw "invalid param";
        super();
        this._parent = parent;
    }

    _render(){
        const parent = document.querySelector(this._parent);
        if(!parent) throw "invalid parent";
        parent.innerHTML = "";
        const [table,caption] = "table,caption".split(",").map(v=>document.createElement(v));
        caption.innerHTML = this._title;
        table.appendChild(caption);
        table.appendChild(
            this._header.reduce(
                (thead, data)=>(thead.appendChild(document.createElement("th")).innerHTML = data, thead),
                document.createElement("thead")
            )
        );
        parent.appendChild(
            this._items.reduce(
                (table, row)=>(table.appendChild(
                    row.reduce(
                        (tr, data)=>(tr.appendChild(document.createElement("td")).innerHTML = data, tr),
                        document.createElement("tr")
                    )
                ), table),
            table)
        );
    }
}
// 이렇게 TableRenderer는 Info객체에 대해서는 알지 못하고 부모인 Renderer의 속성만 알게된다.

const data2 = new JsonData("71_1.json");
const infoPromise2 = data2.getData();
infoPromise2.then(info=>{
    const renderer = new TableRenderer3("#data");
    renderer.render(info);
});