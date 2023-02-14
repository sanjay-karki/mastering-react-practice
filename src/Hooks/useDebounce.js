import { debounce } from "lodash";

const useDebounce = (value, delay) => {
  const debouncedValue = debounce(value, delay);
  return debouncedValue;
};

export default useDebounce;
