interface HeaderProps {
  title: string;
  tag: string;
}

const Header = ({ title, tag }: HeaderProps) => {
  return (
    <div className="bg-secondary-background flex flex-none flex-nowrap relative gap-3 px-4 sm:px-6 py-4 w-full items-center justify-between h-16 border border-border rounded-3xl">
      {/* Title */}
      <div>
        <p className="text-sm sm:text-lg font-medium leading-tight text-primary-foreground">
          {title}
        </p>
      </div>
      {/* Tag */}
      <div>
        <p className="text-sm sm:text-lg font-medium leading-tight font-pixel text-secondary-foreground whitespace-nowrap">
          {tag}
        </p>
      </div>
    </div>
  );
};

export default Header;
