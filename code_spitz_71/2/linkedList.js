let a = {
    v: { v: 3 }
};
let b = a;
a.v = {v: 5};
console.log(b.v.v);
const Parent = class{
    method() {
        this._method();
    }
    _method() {
        console.log("Parent");
    }
};
const Child = class extends Parent{
    _method() {
        console.log("Child");
    }
};
(new Parent).method(); //Parent
(new Child).method(); //Child => 내적 동질성
new Child instanceof Parent;

// 자바스크립트는 프로토타입으로 부모자식 관계를 구현함.
// 내적 동질성은 