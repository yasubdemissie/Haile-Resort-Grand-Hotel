import { useState } from "react";
import Filter from "./Filter";
import TableOperations from "./TableOperations";
import SortBy from "./SortBy";

function CabinTableOprations() {
  const filterOption = useState(() => [
    { value: "all", label: "All" },
    { value: "with-discount", label: "With Discount" },
    { value: "no-discount", label: `No Discount` },
  ]);
  const sortOption = useState(() => [
    { value: "name-asc", label: "Sort by name[A-Z]" },
    { value: "name-desc", label: "Sort by name[Z-A]" },
    { value: "regularPrice-asc", label: "Sort by Price[increasing]" },
    { value: "regularPrice-desc", label: "Sort by Price[decreasing]" },
    { value: "maxCapacity-desc", label: "Sort by capacity[decreasing]" },
  ]);
  return (
    <TableOperations>
      <Filter filterField="discount" option={filterOption[0]} />
      <SortBy
        filterField="sort-by"
        option={sortOption[0]}
      />
    </TableOperations>
  );
}

export default CabinTableOprations;
