import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnSortingProps<TData = any> {
  table: Table<TData>;
}

const ColumnSorting = <TData,>({ table }: ColumnSortingProps<TData>) => {
  return (
    <div className="max-sm:hidden flex items-center gap-6">
      <span>|</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-black text-sm">Columns</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {table
            ?.getAllColumns()
            ?.filter((column) => column?.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column?.id}
                  className="capitalize"
                  checked={column?.getIsVisible()}
                  onCheckedChange={(value) => column?.toggleVisibility(!!value)}
                >
                  {column?.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnSorting;
