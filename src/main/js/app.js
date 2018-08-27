const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class Employee extends React.Component{
  
  constructor(props){
      super(props);
      this.state = { display: true };
  }
  
  handleDelete(){
    const url = this.props.employee._links.self.href;
    console.log(url);
    axios.post(url).then(res => {
        console.log(res);
        console.log(res.data);
    });
  }
  
  render() {

   /* if (this.state.display===false) return null;
    else return (*/
    return(
      <tr>
          <td>{this.props.employee.name}</td>
          <td>{this.props.employee.age}</td>
          <td>{this.props.employee.years}</td>
          <td>
            <button className="btn btn-info" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(e) } }>Delete</button>
          </td>
      </tr>
    )
    /*);*/
  }  
}
class EmployeeTable extends React.Component{
   render(){
    
    var employees = this.props.employees.map(employee =>
        <Employee key={employee._links.self.href} employee={employee}/>
    );

    return (
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Years</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>{employees}</tbody>
      </table>
    );
  }
}
export default class App extends React.Component{
   
  loadEmployeesFromServer() {
    axios.get('http://localhost:8080/api/employees').
            then(res => {
                const employees = res.data._embedded.employees;
        console.log(employees);
                this.setState({ employees });
    });
  }
  
  constructor(props){
      super(props);
      this.state = { employees: [] };
  }

  componentDidMount() {
    this.loadEmployeesFromServer();
  }

  render() {
    return ( <EmployeeTable employees={this.state.employees} /> );
  }     
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
);
