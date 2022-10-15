import type { NextPage } from "next";
import useSWR from "swr";
import { Text } from "@chakra-ui/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Tags: NextPage = () => {
  const { data, error } = useSWR("http://localhost:3000/tags", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const list = [];
  for (let i in data) {
    list.push(data[i].tagName);
  }

  return <div>{list}</div>;
};

export default Tags;
