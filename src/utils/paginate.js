import _ from "lodash";

//named export
export function paginate(items, pageNumber, itemsPerPage) {
  //find the starting index of an item in a given pageNumber
  const startIndex = (pageNumber - 1) * itemsPerPage;

  //slice the array from the start index
  //const newArray = _.slice(items, startIndex)

  //pick items for the current page
  //_.take(newArray, itemsPerPage);

  //we can call above methods in a lodash chain
  //if we need to call these methods in a lodash chain, we need to convert the regular array to a lodash wrapper
  return _(items)
    .slice(startIndex)
    .take(itemsPerPage)
    .value();
  // _(items) convert to a lodash wrapper object
  // .value() revert to a regular array
}
