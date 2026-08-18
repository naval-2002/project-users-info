import UserDetails, { UserDetail } from "@/app/component/userDetails";

const UsersDetailsScreen = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const user: UserDetail = await fetch(`https://dummyjson.com/users/${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return <UserDetails user={user} />;
};

export default UsersDetailsScreen;
