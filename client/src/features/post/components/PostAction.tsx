import { Heart, MessageCircle, Share2, Send, Check } from "lucide-react";
import { useState } from "react";
interface PostActionProps {
  icon: React.ElementType;
  label?: string | number;
  onClick?: () => void;
  className?: string;
}

const PostAction: React.FC<PostActionProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer hover:text-primary transition-colors ${className}`}
    >
      <Icon className="w-5 h-5" strokeWidth={1.5} />
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
};

const PostActionsBar = ({ postUrl = window.location.href }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="border-t border-b border-border py-2 sm:py-3 text-muted-foreground">
      <div className="flex justify-between items-center px-2">
        <PostAction
          icon={Heart}
          label="Liked (56)"
          onClick={() => console.log("Like clicked")}
        />

        <PostAction
          icon={MessageCircle}
          label="Comments (12)"
          onClick={() => console.log("Comment clicked")}
        />

        <PostAction
          icon={isCopied ? Check : Share2}
          label={isCopied ? "Copied!" : "Share (3)"}
          onClick={handleShare}
          className={isCopied ? "text-green-500 hover:text-green-600" : ""}
        />

        <PostAction
          icon={Send}
          label="Send"
          onClick={() => console.log("Send clicked")}
        />
      </div>
    </div>
  );
};

export default PostActionsBar;
