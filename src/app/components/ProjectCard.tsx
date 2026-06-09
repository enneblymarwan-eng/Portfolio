

interface Tag {
  label: string;
  highlighted?: boolean;
}

interface ProjectCardProps {
  title: string;
  tags: Tag[];
  onClick?: () => void;
}

export function ProjectCard({ title, tags, onClick }: ProjectCardProps) {
  return (
    <div className="w-full cursor-pointer h-full transition-transform duration-300 hover:scale-[1.02]" onClick={onClick}>
        <div
          className="w-full h-full backdrop-blur-sm rounded-[20px] px-5 py-4 flex items-center justify-between gap-4 text-left relative z-10 work-card"
          style={{ minHeight: '51px', color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
        >
          <p
            className="font-['Poppins',sans-serif] font-normal flex-1 min-w-0"
            style={{ fontSize: '16px', color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
          >
            {title}
          </p>

          <div className="flex gap-1 flex-shrink-0 flex-wrap justify-end">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="font-['Poppins',sans-serif] font-light text-black px-3 py-1 rounded-full whitespace-nowrap"
                style={{
                  fontSize: '10px',
                  background: tag.highlighted ? 'rgba(255,255,255,0.77)' : 'rgba(255,255,255,0.46)',
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
    </div>
  );
}
