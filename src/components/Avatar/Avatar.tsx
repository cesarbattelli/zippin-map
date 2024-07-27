interface AvatarProps {
  url: string;
}
function Avatar({ url }: AvatarProps) {
  return <img src={url} alt="Avatar" className="h-12 w-12 rounded-full" />;
}

export default Avatar;
