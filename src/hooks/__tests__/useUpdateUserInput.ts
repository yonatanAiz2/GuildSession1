import { renderHook, act } from "@testing-library/react-hooks";
import useUpdateUserInput from "../useUpdateUserInput";

describe("useUpdateUserInput", () => {
  it("Should render hook with initial state", () => {
    expect(true).toBeFalsy();
  });
});

// it("Should render hook with initial state", () => {
//   const { result } = renderHook(useUpdateUserInput);
//   expect(result.current.userId).toEqual(0);
// });
// it("Should be able to update input", () => {
//   const { result } = renderHook(useUpdateUserInput);

//   act(() => {
//     result.current.onChange({ target: { value: "2" } });
//   });

//   expect(result.current.userId).toBe(2);
//   expect(result.current.isValid).toBeTruthy();
// });

// it("Should be able to update input", () => {
//   const { result } = renderHook(useUpdateUserInput);

//   act(() => {
//     result.current.onChange({ target: { value: "-2" } });
//   });

//   expect(result.current.userId).toBe(-2);
//   expect(result.current.isValid).toBeFalsy();
// });
