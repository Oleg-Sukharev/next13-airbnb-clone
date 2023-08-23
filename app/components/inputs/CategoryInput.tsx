import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType,
  label: string,
  selected: boolean,
  onChange: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onChange
}) => {

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label
      aria-hidden="false"
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <input
        onChange={changeHandler}
        value={label}
        checked={selected}
        name="categoryScroller"
        type="radio"
        className="
          hidden 
          absolute
          w-1 
          h-1 
          -m-1 
          border-0 
          p-0 
          whitespace-nowrap 
          clip-path-[inset(100%)] 
          clip-[rect(0 0 0 0)] 
          overflow-hidden"
      />
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </label>

  );
}

export default CategoryInput;