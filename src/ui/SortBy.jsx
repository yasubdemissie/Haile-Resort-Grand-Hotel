import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({option}) {

    const [searchParams, setSearchParams] = useSearchParams();
    let value = searchParams.get("sort-by");
    function handleClick(e) {
        // console.log(e.target.value);
        searchParams.set("sort-by", e.target.value);
        setSearchParams(searchParams);
    }

  return <Select option={option} value={value} onChange={handleClick} type='white'/>;
}

export default SortBy;
