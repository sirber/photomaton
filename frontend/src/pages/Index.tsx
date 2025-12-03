import { useUser } from "@/repositories/userRepository";

export default function Index() {
  const { data, error, isLoading } = useUser();
  
  return (
    <>
      <p>Hello 1</p>
      <p>Hello 2</p>
      <p>Hello 3</p>
      <p>Hello 4</p>
      <p>Hello 5</p>
      <p>Hello 6</p>
    </>
  );
}