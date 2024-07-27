interface AvatarProps {
  url: string;
}
function Avatar({ url }: AvatarProps) {
  return <img src={url} alt="Avatar" className="size-14 rounded-full" />;
}

export default Avatar;
