"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  count?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, count }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-between items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
      {count ? (
        <div className="bg-red-400 text-white h-5 w-5 rounded-full flex justify-center items-center">
          <span className="text-white text-sm">
            {count > 9 ? `${9}+` : count}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default MenuItem;
