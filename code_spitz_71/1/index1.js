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