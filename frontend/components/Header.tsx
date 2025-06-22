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
    <header className="flex fixed top-0 left-0 w-full z-50 items-center justify-between md:py-5 md:px-14 py-4 px-4 bg-white shadow-sm">
      <div>
        <MainLogo />
      </div>

      <div className="flex items-center max-md:gap-2 gap-8">
        {fileName && (
          <div className="flex items-center gap-3 max-sm:ml-20">
            <FileIcon />
            <span className="text-sm text-green-500 max-sm:text-xs font-medium">
              {fileName}
            </span>
          </div>
        )}
        <button
          title="Upload PDF"
          onClick={onUploadClick}
          className="flex items-center gap-3 font-medium cursor-pointer hover:bg-black/10 transition duration-300 border-[1px] py-2 sm:px-5 px-2 rounded-lg"
        >
          <PlusIcon />
          <span className="hidden sm:inline">Upload PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
