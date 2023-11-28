import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useLoadPublicData = (url) => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch } = useQuery({
    queryKey: ["PublicData", url],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get(url);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  return { data, refetch };
};

export default useLoadPublicData;
