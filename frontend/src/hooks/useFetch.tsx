import { useEffect, useReducer } from "react";
import axios from "axios";

type ReducerAction =
  | { type: "SUCCESS"; payload: any }
  | { type: "ERROR"; payload?: any }
  | { type: "INIT"; payload?: any };

interface ReducerState {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

export default function useFetch(url: string) {
  const [state, dispatch] = useReducer(
    (state: ReducerState, action: ReducerAction): ReducerState => {
      switch (action.type) {
        case "INIT":
          return { ...state, isLoading: true, isError: false };
        case "SUCCESS":
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload,
          };
        case "ERROR":
          return {
            ...state,
            isLoading: false,
            isError: true,
            data: null,
          };
      }
    },
    {
      isLoading: false,
      isError: false,
      data: null,
    }
  );

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetch = async () => {
      dispatch({ type: "INIT" });
      try {
        const result = await axios(url);
        dispatch({ type: "SUCCESS", payload: result.data });
      } catch (_) {
        dispatch({ type: "ERROR" });
      }
    };
  }, [url]);
  return state;
}
