import React, { Component } from "react";
import "./App.scss";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import products from "./products.json";
import categories from "./categories.json";

const initialDataState = {
  skip: 0,
  take: 10,
};

function App() {
  const [category, setCategory] = React.useState(null);
  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();

  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take = targetEvent.value === "All" ? 77 : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  const handleDropDownChange = React.useCallback((e) => {
    setCategory(e.target.value.CategoryID);
    console.log(e.target.value.CategoryID);
  });

  return (
    <div className="App">
      <h1>Hello KendoReact!</h1>
      <Calendar />
      <Grid
        data={products.slice(page.skip, page.take + page.skip)}
        skip={page.skip}
        take={page.take}
        total={products.length}
        pageable={{
          buttonCount: 4,
          pageSizes: [5, 10, 15, "All"],
          pageSizeValue: pageSizeValue,
        }}
        onPageChange={pageChange}
        style={{ height: "400px", margin: "200px 0" }}
        sortable={true}
        pageSize={5}
      >
        <GridColumn field="ProductName" title="Product Name" />
        <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
        <GridColumn field="UnitsInStock" />
        <GridColumn field="Discontinued" />
      </Grid>
      <p>
        <DropDownList
          data={categories}
          dataItemKey="CategoryID"
          textField="CategoryName"
          defaultItem={{ CategoryID: null, CategoryName: "Product categories" }}
          onChange={handleDropDownChange}
        />
        &nbsp; Selected category ID: <strong>{category}</strong>
      </p>
    </div>
  );
}

export default App;
