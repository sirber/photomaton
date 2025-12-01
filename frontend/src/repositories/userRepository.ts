import { API_URL } from "@/constants";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function userRepository() {
    return useSWR(API_URL + "/auth/me", fetcher);
}