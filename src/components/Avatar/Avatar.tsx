interface AvatarProps {
  url: string;
}
function Avatar({ url }: AvatarProps) {
  return <img src={url} alt="Avatar" className="w-12 h-12 rounded-full" />;
}

export default Avatar;
