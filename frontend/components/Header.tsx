import FileIcon from "@/svg/FileIcon";
import MainLogo from "@/svg/MainLogo";
import PlusIcon from "@/svg/PlusIcon";
import React from "react";

interface HeaderProps {
  fileName?: string;
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ fileName, onUploadClick }) => {
  return (
    <header className="flex items-center justify-between py-5 px-14">
      <div>
        <MainLogo />
      </div>

      <div className="flex items-center gap-8">
        {fileName && (
          <div className="flex items-center gap-3">
            <FileIcon />
            <span className="text-sm text-green-500 font-medium">
              {fileName}
            </span>
          </div>
        )}
        <button
          title="Upload PDF"
          onClick={onUploadClick}
          className="flex items-center gap-3 font-medium cursor-pointer hover:bg-black/10 transition duration-300 border-[1px] py-2 px-5 rounded-lg"
        >
          <PlusIcon />
          Upload PDF
        </button>
      </div>
    </header>
  );
};

export default Header;
