interface AvatarProps {
  url: string;
}
function Avatar({ url }: AvatarProps) {
  return <img src={url} alt="Avatar" className="w-10 h-10 rounded-full" />;
}

export default Avatar;
