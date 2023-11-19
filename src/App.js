import "./App.css";

// API will take place from this line
const mock = [{ Transection_ID: "6322778954", Table_number: "T02", Ordered_list: "Fried Rice", Quantities: 2, Order_time: "17.55", Progress: "Done" },
{ Transection_ID: "6322778426", Table_number: "T01", Ordered_list: "Watermelon Juice", Quantities: 5, Order_time: "10.44", Progress: "In progress" }];

function App() {
  return (
    <div className="container">
      <text className="logo_text">แอปแบ้ว</text>
      <br></br>
      <text>Order in line</text>
      <br></br>

      <div>
        <table>
          <tr>
            <th>
              Transection ID
            </th>
            <th>
              Table number
            </th>
            <th>
              Ordered list
            </th>
            <th>
              Quantities
            </th>
            <th>
              Order time
            </th>
            <th>
              Progress
            </th>
          </tr>

          {mock.map((item) => (
              <tr key={item.Transection_ID}>
                <td>{item.Transection_ID}</td>
                <td>{item.Table_number}</td>
                <td>{item.Ordered_list}</td>
                <td>{item.Quantities}</td>
                <td>{item.Order_time}</td>
                <td>{item.Progress}</td>
              </tr>
            ))}
          
        </table>
      </div>
    </div>


  );
}
export default App;