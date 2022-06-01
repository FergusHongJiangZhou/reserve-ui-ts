import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function useToastHook() {
  const initState: any = {
    message: "",
    status: undefined
  };
  const [state, setState] = useState(initState);
  const toast = useToast();

  useEffect(() => {
    if (state?.status) {
      const { message, status } = state;
      toast({
        title: status,
        description: message,
        status: status,
        duration: 9000,
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
}
