type Props = { isPending?: boolean; error: Error | null; }
export default function LoadingOrErrorCard({ isPending, error }: Props) {
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Could not load users</p>;
  return null;
}