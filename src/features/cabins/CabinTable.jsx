// import styled from "styled-components";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { data, isLoading, error } = useCabin();
  const [searchParams] = useSearchParams();

  const filteredValue = searchParams.get("discount") || "all";

  if (error)
    return (
      <div>There is an error fetching the data check if your are offline</div>
    );
  if (isLoading) return <Spinner />;

  // Filter out
  let filteredData;

  if (filteredValue === "all") filteredData = data;
  else if (filteredValue === "with-discount") {
    filteredData = data.filter((cabin) => cabin.discount > 0);
  } else if (filteredValue === "no-discount") {
    filteredData = data.filter((cabin) => cabin.discount === 0);
  }

  // Sort the data
  const sortValue = searchParams.get("sort-by") || "";
  const [field, direction] = sortValue.split("-");

  let sortedData;

  if (sortValue === "") sortedData = filteredData;
  const modifier = direction === "desc" ? 1 : -1;
  sortedData = filteredData.sort((a, b) => (b[field] - a[field]) * modifier);

  return (
    <div>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedData}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </div>
  );
}

export default CabinTable;
