import "./App.css";
import TablePaginationGen from "./TablePaginationGen";

function App(){
  const data = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', number: 73, "Power of Love": "power" },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', number: 73, "Power of Love": "time" },
    { id: 3, name: 'John Doe', email: 'johndoe@example.com', number: 73, "Power of Love": "time" },
    { id: 4, name: 'Jane Smith', email: 'janesmith@example.com', number: 73, "Power of Love": "hope" },
    { id: 5, name: 'John Doe', email: 'johndoe@example.com', number: 73, "Power of Love": "dice" },
    { id: 6, name: 'Jane Smith', email: 'janesmith@example.com', number: 73, "Power of Love": "true" },
    { id: 7, name: 'John Doe', email: 'johndoe@example.com', number: 73, "Power of Love": "false" },
    { id: 8, name: 'Jane Smith', email: 'janesmith@example.com', number: 73, "Power of Love": false },
    { id: 9, name: 'John Doe', email: 'johndoe@example.com', number: 73, "Power of Love": "time" },
    { id: 10, name: 'Jane Smith', email: 'janesmith@example.com', number: 73, "Power of Love": true }
  ];

  const userTransactions = [
    {
        id: "BR-1212",
        branchName: "Makati Branch",
        productName: "Product 2",
        qty: 1,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1213",
        branchName: "Boracay Branch",
        productName: "Delta",
        qty: 2,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1214",
        branchName: "Makati Branch",
        productName: "Alpha",
        qty: 3,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1215",
        branchName: "Makati Branch",
        productName: "Beta",
        qty: 4,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1216",
        branchName: "Makati Branch",
        productName: "Sigma",
        qty: 5,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1217",
        branchName: "Makati Branch",
        productName: "Meta",
        qty: 5,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1218",
        branchName: "Makati Branch",
        productName: "Borges",
        qty: 6,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1219",
        branchName: "Manila Branch",
        productName: "Borges",
        qty: 6,
        status: "Complete",
        amount: 200
    },
    {
        id: "BR-1220",
        branchName: "Bulacan Branch",
        productName: "Borges",
        qty: 6,
        status: "Complete",
        amount: 200
    },
];
  
  return (
    <div>
      <TablePaginationGen data={data} pageSize={3} pagesToShow={3}/>
      <TablePaginationGen data={userTransactions} pageSize={5} pagesToShow={5}/>
    </div>
  )
}

export default App;