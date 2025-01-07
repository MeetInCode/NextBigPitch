import Navbar from "@/components/navbar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    /* { children } destructures the children prop from the props object
        readonly avoids from mututaion
        children is declared as a property of the props object.
The type React.ReactNode is a TypeScript type that represents any valid React content that can be rendered, such as:
A string: "Hello"
A number: 123
JSX elements: <div>Content</div>
Fragments: <>Content</>
Arrays of nodes: [<div>1</div>, <div>2</div>]
null or undefined
    */
  return (
    <div className="font-work-sans">
      <Navbar />
      {children}
    </div>
  )
}

/*
props explained

function Greeting({ name }) { // 'name' is a prop
  return <h1>Hello, {name}!</h1>;
}

// Passing a prop from parent to child
<Greeting name="Meet" /> */



/* 
typescript version

export default function Greeting({ name }: Readonly<{ name: string }>) {
  return <h1>Hello, {name}!</h1>;
}
x
*/
