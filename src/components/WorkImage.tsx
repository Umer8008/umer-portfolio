import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image?: string;
  alt?: string;
  video?: string;
  link?: string;
  badge?: {
    icon: string;
    tagline: string;
  };
  title?: string;
  category?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      try {
        const response = await fetch(`src/assets/${props.video}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideo(blobUrl);
      } catch {
        // silent fallback if video fails
      }
    }
  };

  const hasImage = Boolean(props.image && !imageError);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={"disable"}
        aria-label={props.title ? `View ${props.title} on GitHub` : "View repository"}
      >
        {props.link && (
          <div className="work-link" title="Open GitHub Repository">
            <MdArrowOutward />
          </div>
        )}

        {hasImage ? (
          <img
            src={props.image}
            alt={props.alt || props.title || "Project preview"}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="work-image-fallback">
            <div className="fallback-glow"></div>
            <div className="fallback-grid"></div>
            <div className="fallback-content">
              <div className="fallback-chip">
                <span className="fallback-chip-dot"></span>
                <span>{props.category || "AI / ML"}</span>
              </div>
              <div className="fallback-title">{props.title}</div>
              {props.badge && (
                <div className="fallback-tagline">{props.badge.tagline}</div>
              )}
            </div>
          </div>
        )}

        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
