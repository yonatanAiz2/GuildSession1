import { useState } from "react";

const useUpdateUserInput = () => {
  const [userId, setUserId] = useState<number>(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  const isValid = userId <= 10 && userId > 0;

  return { userId, onChange, isValid };
};

export default useUpdateUserInput;
