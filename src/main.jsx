// import { render, createElement, Component } from "talon";
// import { useState } from "talon/hooks";
//
// const B = ({ count }) => {
//   const [a, setA] = useState("tung");
//   return (
//     <div>
//       count: {count}
//       <div>test: {a}</div>
//     </div>
//   );
// };
//
// class Car extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { brand: "Ford" };
//     console.log(this);
//   }
//
//   count = () => {
//     console.log("count");
//     this.setState({ brand: "Toyota" });
//   };
//
//   render() {
//     return (
//       <div>
//         <h1 onClick={this.count}>My Car: {this.state?.brand}</h1>
//       </div>
//     );
//   }
// }
//
// const a = [1, 2, 3];
//
// const App = () => (
//   <div>
//     <Car />
//     <h1>Hello</h1>
//     {a.map((item) => {
//       return <B key={1} count={"count state:" + item} />;
//     })}
//   </div>
// );
//
// console.log("after createElement", <App />);
// console.log("after createElement", <Car />);
// render(<App />, document.getElementById("app"));

import { render, h } from "../nano/dist/index.module.js";
// const App = (props)=>{
//   return /* @__PURE__ */
//   h("div", null, /* @__PURE__ */
//     h("h1", null, "Hello from ", props.name, "!"), /* @__PURE__ */
//     h(Child, null));
// }

const Child = () => <div>child</div>;

const App = (props) => {
  return (
    <div>
      <h1 class="red">Hello from {props.name}!</h1>
      <Child></Child>
    </div>
  );
};
console.log(App);
console.log(<App name="Nano" />);

render(<App name="Nano" />, document.getElementById("app"));
