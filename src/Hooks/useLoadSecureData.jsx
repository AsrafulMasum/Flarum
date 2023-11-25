import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLoadSecureData = (url) => {
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["secureData", url],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(url);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  return { data, refetch };
};

export default useLoadSecureData;
