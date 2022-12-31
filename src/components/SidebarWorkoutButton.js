import { HiPencilAlt, HiTrash } from "react-icons/hi";

export default function SidebarWorkoutButton({
  children,
  onClick,
  onEdit,
  onDelete,
}) {
  return (
    // container for button
    <div className="relative group sidebar-colors">
      {/*button itself */}
      <button
        onClick={onClick}
        className="w-full rounded-lg text-left sidebar-padding"
      >
        {children}
      </button>
      {/*container for edit and delete buttons*/}
      <div className="absolute top-0 right-0 mt-2.5 mr-2">
        <button
          onClick={onEdit}
          className="mr-1 text-transparent transition-colors duration-300 transform group-hover:text-gray-800"
        >
          <HiPencilAlt />
        </button>
        <button
          onClick={onDelete}
          className="text-transparent transition-colors duration-300 transform group-hover:text-gray-800"
        >
          <HiTrash />
        </button>
      </div>
    </div>
  );
}
